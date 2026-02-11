import { Menu } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#" },
    { label: "Rooms", href: "/not-found" },
    { label: "Amenities", href: "/not-found" },
    { label: "Events", href: "/not-found" },
  ];
  // fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-blue-900/90 via-teal-900/80 to-emerald-900/90 backdrop-blur-md shadow-xl

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-blue-900/90 via-teal-900/80 to-emerald-900/90 backdrop-blur-md shadow-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Resort Name */}
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold-500 shadow-lg">
              {/* Replace with your actual logo */}
              <div className="w-full h-full bg-linear-to-br from-blue-400 to-teal-300 flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  <Image
                    src="/images/brooke.png"
                    width={50}
                    height={50}
                    alt="log"
                  />
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-['Style_Script'] text-yellow-300 text-3xl font-semibold tracking-widest">
                HiddenBrooke
              </h1>
              {/* <p className="text-xs text-blue-100 font-light tracking-widest">
                RESORT
              </p> */}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-blue-100 hover:text-white font-medium transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-blue-300 to-teal-300 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <button className="px-6 py-2 bg-linear-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
              Under Development
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-blue-100 hover:text-white font-medium py-2 px-4 hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button className="px-6 py-3 bg-linear-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-full hover:shadow-lg transition-all">
                Under Development
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
