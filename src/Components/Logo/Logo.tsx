import { useState } from "react";


const AdalenaLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`flex items-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span 
        className="text-3xl font-serif italic text-orange-800 transition-all duration-500 cursor-pointer inline-block"
        style={{ 
          fontFamily: 'Georgia, Garamond, serif',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          letterSpacing: isHovered ? '0.05em' : '0'
        }}
      >
        {['a', 'd', 'a', 'l', 'e', 'n', 'e', '.'].map((letter, index) => (
          <span
            key={index}
            className="inline-block transition-all duration-300"
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              transitionDelay: `${index * 0.05}s`
            }}
          >
            {letter}
          </span>
        ))}
      </span>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
    //   <AdalenaLogo className="hover:opacity-80 transition-opacity cursor-pointer" /> (When you want to use it in any part of the site)

export default AdalenaLogo;