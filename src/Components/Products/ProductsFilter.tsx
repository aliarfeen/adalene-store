import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import useProducts from "../../hooks/useProducts";





interface ProductsFilterProps {
  activeFilters: {
    category: string;
    price: number;
  };
  onFilterChange: (filters: { category: string; price: number }) => void;
}

interface SubCategory {
  name: string;
  href: string;
}


const subCategories: SubCategory[] = [
  { name: "All Products", href: "" },
  { name: "Bags", href: "Handbags" },
  { name: "Leather Belts", href: "Belts" },
  { name: "Mini Leather Goods", href: "Wallets" },
  { name: "Phone Cases", href: "Phone Cases" },
];

export default function ProductsFilter({
  activeFilters,
  onFilterChange,
}: ProductsFilterProps) {
  const {products} = useProducts()

const prices = products.map(product => product.price);
const maxPrice = Math.max(...prices);
const minPrice = Math.min(...prices);
  // keep local UI state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Local state for the Price Range input value
  const [localPriceRange, setLocalPriceRange] = useState(
    activeFilters.price.toString()
  );

  const handleCategorySelect = (categoryName: string) => {
    // Also reset the local category state for visual selection 
    setSelectedCategory(categoryName); 
    onFilterChange({ ...activeFilters, category: categoryName });
  };
  
  // Handler for Price Range change
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const priceValue = event.target.value;
    setLocalPriceRange(priceValue);
    
    const newPrice = parseInt(priceValue, 10);
    // Only call onFilterChange if the value is a valid number
    if (!isNaN(newPrice)) {
      onFilterChange({ ...activeFilters, price: newPrice });
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<string>(
    subCategories[0].href
  );

  const priceFilterSection = {
    id: "price",
    name: "Price",
  };

  return (
    <div className="bg-white min-h-screen flex">
      {/* Mobile filter dialog */}
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative ml-auto flex h-full max-w-xs flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Filters */}
            <p className="px-4 pt-4 text-xl font-medium text-gray-900">
              Browse by
            </p>
            <hr className="my-2 border-gray-200" />
            <form className="mt-4 border-t border-gray-200">
              {/* MOBILE SUB-CATEGORIES LIST (Category Filter) */}
              <ul role="list" className="px-2 py-3 text-lg text-gray-900">
                {subCategories.map((category) => (
                  <li key={category.name}>
                    <a
                      href={category.href}
                      className={`block px-2 py-3 cursor-pointer transition-all ${
                        selectedCategory === category.href
                          ? "font-bold text-orange-800"
                          : "hover:font-semibold"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategorySelect(category.href);
                      }}
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Mobile Price Range Filter */}
              <Disclosure
                key={priceFilterSection.id}
                as="div"
                className="border-t border-gray-200 px-4 py-6"
                defaultOpen={true} // Keep price open by default for visibility
              >
                {({ open }) => (
                  <>
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {priceFilterSection.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusIcon
                              aria-hidden="true"
                              className="size-5"
                            />
                          ) : (
                            <PlusIcon aria-hidden="true" className="size-5" />
                          )}
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        <label
                          htmlFor="price-range-mobile"
                          className="text-sm font-medium text-gray-700 block mb-2"
                        >
                          Max Price: ${localPriceRange}
                        </label>
                        <input
                          id="price-range-mobile"
                          name="price-range"
                          type="range"
                          min= {minPrice.toString()}
                          max= {maxPrice.toString()} // Example Max Price
                          step="1" // Ensure integer steps
                          value={localPriceRange}
                          onChange={handlePriceChange}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{minPrice} LE</span>
                          <span>{maxPrice} LE</span> {/* Match example Max Price */}
                        </div>
                      </div>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="lg:block">
        {/* Desktop filter sidebar */}
        <aside className="hidden w-64 border-r border-gray-200 p-4 lg:block">
          <p className="text-xl font-medium text-gray-900 mb-4">Browse by</p>
          <form>
            {/* DESKTOP SUB-CATEGORIES LIST (Category Filter) */}
            <ul
              role="list"
              className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
            >
              {subCategories.map((category) => (
                <li
                  key={category.name}
                  className={`transition-all ${
                    selectedCategory === category.href
                      ? "font-bold text-orange-800" // Added orange-800 for consistency
                      : "hover:font-semibold hover:text-orange-800"
                  }`}
                >
                  <a
                    href={category.href}
                    className="cursor-pointer block"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategorySelect(category.href);
                    }}
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop Price Range Filter */}
            <Disclosure
              key={priceFilterSection.id}
              as="div"
              className="border-b border-gray-200 py-6"
              defaultOpen={true}
            >
              {({ open }) => (
                <>
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        {priceFilterSection.name}
                      </span>
                      <span className="ml-6 flex items-center">
                        {open ? (
                          <MinusIcon aria-hidden="true" className="size-5" />
                        ) : (
                          <PlusIcon aria-hidden="true" className="size-5" />
                        )}
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-4">
                      <label
                        htmlFor="price-range-desktop"
                        className="text-sm font-medium text-gray-700 block mb-2"
                      >
                        Max Price: {localPriceRange} EGP
                      </label>
                      <input
                        id="price-range-desktop"
                        name="price-range"
                        type="range"
                        min={minPrice.toString()}
                        max={maxPrice.toString()} 
                        step="1" // Ensure integer steps
                        value={localPriceRange}
                        onChange={handlePriceChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{minPrice} EGP</span>
                          <span>{maxPrice} EGP</span> 
                      </div>
                    </div>
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </form>
        </aside>
      </div>
    </div>
  );
}