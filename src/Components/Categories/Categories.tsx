
import { ShoppingBag, Minus, Smartphone, Package } from 'lucide-react';

export default function Categories() {
  const categories = [
    {
      id: 1,
      name: 'Bag',
      icon: ShoppingBag,
      description: 'Stylish bags crafted for everyday elegance and practical storage solutions.'
    },
    {
      id: 2,
      name: 'Belt',
      icon: Minus,
      description: 'Premium leather belts designed to complete your look with sophistication.'
    },
    {
      id: 3,
      name: 'Mini Bag',
      icon: Package,
      description: 'Compact mini bags perfect for essentials while maintaining chic style.'
    },
    {
      id: 4,
      name: 'Phone Case',
      icon: Smartphone,
      description: 'Protect your device with elegant cases that blend style and durability.'
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-center text-amber-950 mb-16">
          Browse Our Category
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="bg-white rounded-2xl border border-amber-200 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-amber-400 cursor-pointer group"
              >
                <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-amber-200">
                  <IconComponent className="w-12 h-12 text-amber-700" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-2xl font-serif text-amber-950 mb-3">
                  {category.name}
                </h3>
                
                <p className="text-amber-800 text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}