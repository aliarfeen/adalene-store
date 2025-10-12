import{ useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFound() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Static buttons scattered around */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + Math.sin(i * 2) * 35}%`,
            }}
          >
            <div className="w-8 h-8 rounded-full border-4 border-amber-400 relative">
              <div className="absolute w-1 h-1 bg-amber-500 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute w-1 h-1 bg-amber-500 rounded-full top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute w-1 h-1 bg-amber-500 rounded-full bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2"></div>
            </div>
          </div>
        ))}
      </div>

      <div className={`max-w-3xl w-full text-center space-y-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} relative z-10`}>
        {/* Thread Spool - Static */}
        <div className="relative flex justify-center items-center">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {/* Thread Spool */}
            <g>
              {/* Spool body */}
              <ellipse cx="100" cy="80" rx="35" ry="8" fill="#92400e" />
              <rect x="65" y="80" width="70" height="40" fill="#78350f" />
              <ellipse cx="100" cy="120" rx="35" ry="8" fill="#92400e" />
              
              {/* Thread wrapped around */}
              <ellipse cx="100" cy="85" rx="30" ry="6" fill="#d97706" opacity="0.8" />
              <ellipse cx="100" cy="90" rx="30" ry="6" fill="#d97706" opacity="0.8" />
              <ellipse cx="100" cy="95" rx="30" ry="6" fill="#d97706" opacity="0.8" />
              <ellipse cx="100" cy="100" rx="30" ry="6" fill="#d97706" opacity="0.8" />
              <ellipse cx="100" cy="105" rx="30" ry="6" fill="#d97706" opacity="0.8" />
              <ellipse cx="100" cy="110" rx="30" ry="6" fill="#d97706" opacity="0.8" />
              <ellipse cx="100" cy="115" rx="30" ry="6" fill="#d97706" opacity="0.8" />
            </g>
            
            {/* Loose thread coming out */}
            <path
              d="M 130 100 Q 150 110, 170 100 T 190 120"
              stroke="#d97706"
              strokeWidth="3"
              fill="none"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* 404 Text with Fabric Texture */}
        <div className="space-y-6">
          <div className="relative inline-block">
            <h1 className="text-9xl font-black text-amber-900 drop-shadow-lg relative">
              404
            </h1>
          </div>
          
          <h2 className="text-3xl font-bold text-amber-800">
           Not Found Page
          </h2>
          <p className="text-lg text-amber-700 max-w-md mx-auto">
           The page you're looking for seems to have unraveled.
          </p>
        </div>

        {/* Back to Home Button */}
        <div className="pt-4">
          <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-700 to-amber-900 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 relative overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            <Home className="w-6 h-6 group-hover:rotate-12 transition-transform relative z-10" />
          <Link to="/">  <span className="relative z-10">Back to Home</span></Link>
          </button>
        </div>

        {/* Decorative button row */}
        <div className="flex justify-center gap-6 items-center opacity-50">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="relative"
            >
              <div className="w-10 h-10 rounded-full border-4 border-amber-600 relative">
                <div className="absolute w-1.5 h-1.5 bg-amber-700 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute w-1.5 h-1.5 bg-amber-700 rounded-full top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute w-1.5 h-1.5 bg-amber-700 rounded-full bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute w-1.5 h-1.5 bg-amber-700 rounded-full top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}