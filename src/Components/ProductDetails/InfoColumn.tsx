import React from 'react';

// 1. Define the type for a single info item
interface InfoItem {
  id: number;
  title: string;
  content: string;
}

// 2. Define the data source as a list of InfoItem objects
const siteInfoData: InfoItem[] = [
  {
    id: 1,
    title: "PRODUCT INFO",
    content: "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
  },
  {
    id: 2,
    title: "RETURN & REFUND POLICY",
    content: "I'm a Return and Refund policy. I'm a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
  },
  {
    id: 3,
    title: "SHIPPING INFO",
    content: "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
  },
];

// Sub-component for a single column
const PolicyColumn: React.FC<InfoItem> = ({ title, content }) => (
  // Column styling remains the same: full width on mobile, 1/3 on desktop
  <div className="w-full md:w-1/3 p-4">
    <h3 className="text-lg font-semibold uppercase mb-2" style={{ color: '#cc6633' }}>
      {title}
    </h3>
    <p className="text-gray-700 leading-relaxed text-sm">
      {content}
    </p>
  </div>
);

// Main component, now mapping over the data
const InfoContainer: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 lg:p-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        
        {/* 3. The data is mapped to render the PolicyColumn for each item */}
        {siteInfoData.map(item => (
          <PolicyColumn 
            key={item.id} // Use a unique key for list items
            id={item.id}
            title={item.title}
            content={item.content}
          />
        ))}

      </div>
    </div>
  );
};

export default InfoContainer;