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

// --- INTERFACE DEFINITIONS ---
interface ProductsFilterProps {
  activeFilters: {
    category: string
    colors: string[]
    sizes: string[]
  }
  onFilterChange: (filters: {
    category: string
    colors: string[]
    sizes: string[]
  }) => void
}

interface SubCategory {
  name: string;
  href: string;
}

interface FilterOption {
  value: string;
  label: string;
  checked: boolean;
}

interface FilterSection {
  id: string;
  name: string;
  options: FilterOption[];
}

// --- MOCK DATA ---
const subCategories: SubCategory[] = [
  { name: "All Products", href: "" },
  { name: "Bags", href: "Handbags" },
  { name: "Leather Belts", href: "Belts" },
  { name: "Mini Leather Goods", href: "Wallets" },
  { name: "Phone Cases", href: "Phone Cases" },
];

const filters: FilterSection[] = [
 
  {
    id: "category",
    name: "Price",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
];


export default function ProductsFilter({
  activeFilters,
  onFilterChange,
}: ProductsFilterProps) {
  // keep local UI state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const handleCategorySelect = (categoryName: string) => {
    onFilterChange({ ...activeFilters, category: categoryName })
  }

  
  const [selectedCategory, setSelectedCategory] = useState<string>(subCategories[0].href);

 

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
            <p className="px-4 pt-4 text-xl font-medium text-gray-900">Browse by</p>
            <hr className="my-2 border-gray-200" />
            <form className="mt-4 border-t border-gray-200">
              
              {/* MOBILE SUB-CATEGORIES LIST (Updated) */}
              <ul role="list" className="px-2 py-3 text-lg text-gray-900">
                {subCategories.map((category) => (
                  <li key={category.name}>
                    <a
                      href={category.href}
                      // Apply bold and primary color if selected
                      className={`block px-2 py-3 cursor-pointer transition-all ${
                        selectedCategory === category.href
                          ? "font-bold text-indigo-600"
                          : "hover:font-semibold"
                      }`}
                      onClick={(e) => {
                        e.preventDefault(); // Stop page refresh
                        handleCategorySelect(category.href);
                      }}
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Mobile Filter Sections */}
              {filters.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
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
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <input
                                defaultValue={option.value}
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                defaultChecked={option.checked}
                                className="h-4 w-4 rounded-sm border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop filter sidebar */}
      <aside className="hidden w-64 border-r border-gray-200 p-4 lg:block">
        <p className="text-xl font-medium text-gray-900 mb-4">Browse by</p>
        <form>
          {/* DESKTOP SUB-CATEGORIES LIST (Updated) */}
          <ul
            role="list"
            className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
          >
            {subCategories.map((category) => (
              <li
                key={category.name}
                // Apply bold and primary color to the li/a combo if selected
                className={`transition-all ${
                  selectedCategory === category.name
                    ? "font-bold"
                    : "hover:font-semibold  hover:underline"
                }`}
              >
                <a
                  href={category.href}
                  className="cursor-pointer block" // Added 'block' for better click target
                  onClick={(e) => {
                    e.preventDefault(); // Stop page refresh
                    handleCategorySelect(category.href);
                  }}
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Filter Sections */}
          {filters.map((section) => (
            <Disclosure
              key={section.id}
              as="div"
              className="border-b border-gray-200 py-6"
            >
              {({ open }) => (
                <>
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        {section.name}
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
                    <div className="space-y-4">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex gap-3">
                          <input
                            defaultValue={option.value}
                            defaultChecked={option.checked}
                            id={`filter-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            type="checkbox"
                            className="h-4 w-4 rounded-sm border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-${section.id}-${optionIdx}`}
                            className="text-sm text-gray-600"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </form>
      </aside>

      
    </div>
  );
}
