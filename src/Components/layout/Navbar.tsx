import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, X } from "lucide-react";

import AdalenaLogo from "../Logo/Logo";
import { Button } from "../Common/Button";

export const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>

      <nav className="bg-white border-gray-200 shadow-sm">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

          <AdalenaLogo className="hover:opacity-80 transition-opacity cursor-pointer" />

       
          <div className="flex items-center gap-3 md:order-2">

            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-orange-800"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-800 focus:border-orange-800"
              />
            </div>

            <div className="flex items-center gap-4 text-gray-700">
              <Link to="/login" className="flex items-center gap-1 hover:text-orange-800">
                <User className="w-5 h-5" />
                <span className="hidden md:inline">Login</span>
              </Link>

         
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center hover:text-orange-800 relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-orange-800 text-white text-xs rounded-full px-1.5">
                  2
                </span>
              </button>
            </div>
            <button
              data-collapse-toggle="navbar-search"
              type="button"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-orange-800 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border md:space-x-8 md:flex-row md:mt-0 md:border-0">
              <Link to="/shop-all"><li className="hover:text-orange-800">Shop All</li></Link>
              <Link to="/story"><li className="hover:text-orange-800">Our Story</li></Link>
              <Link to="/craft"><li className="hover:text-orange-800">Our Craft</li></Link>
              <Link to="/gift"><li className="hover:text-orange-800">Gift Card</li></Link>
              <Link to="/contact"><li className="hover:text-orange-800">Contact</li></Link>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-orange-800">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)}>
            <X className="w-6 h-6 text-gray-600 hover:text-orange-800" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <span>Men T-Shirt</span>
            <span className="font-medium">$29.99</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span>Women Dress</span>
            <span className="font-medium">$49.99</span>
          </div>
        </div>
        <div className="p-4 border-t">
          < Button text="Show cart details" className="w-full"/>
          </div>
      </div>
    </>
  );
};
