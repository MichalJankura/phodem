import React, { useState, useEffect, memo } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const NavbarComponent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Handle scroll effect with throttle to prevent forced reflow
  useEffect(() => {
    let lastKnownScrollY = window.scrollY;
    let ticking = false;
    
    const handleScroll = () => {
      lastKnownScrollY = window.scrollY;
      
      if (!ticking) {
        // Use requestAnimationFrame to optimize scroll handling
        window.requestAnimationFrame(() => {
          setIsScrolled(lastKnownScrollY > 20);
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown && !(event.target as Element).closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Domov', href: '#home' },
    { name: 'O nás', href: '#about' },
    { name: 'Služby', href: '#services' },
    { 
      name: 'Menu', 
      dropdown: true,
      items: [
        { name: 'Hlavné menu', href: '/phodem_menu.pdf', external: true },
        { name: 'Denné menu', href: '/denne_menu.pdf', external: true },
      ]
    },
    { name: 'Kontakt', href: '#contact' },
  ];

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // Smooth scroll function
  const smoothScrollTo = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  // Handle navigation click
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      smoothScrollTo(href);
      setIsMenuOpen(false);
      setOpenDropdown(null);
    }
  };
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black backdrop-blur-md shadow-sm border-b border-black'
          : 'bg-black backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="text-2xl font-open-sans font-bold text-white hover:text-gray-300 transition-colors duration-200"
            >
              PHỞ ĐÊM
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative dropdown-container">
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="text-white hover:text-gray-300 px-3 py-2 text-sm font-sans font-bold transition-colors duration-200 relative group flex items-center"
                      >
                        {item.name}
                        <svg
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                            openDropdown === item.name ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                      </button>
                      {openDropdown === item.name && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-black border border-black rounded-md shadow-lg z-50">
                          {item.items?.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              target={subItem.external ? '_blank' : undefined}
                              rel={subItem.external ? 'noopener noreferrer' : undefined}
                              className="block px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-gray-200 font-open-sans transition-colors duration-200"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {subItem.name}
                              {subItem.external && (
                                <svg className="inline ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              )}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => item.href && handleNavClick(e, item.href)}
                      className="text-white hover:text-gray-300 px-3 py-2 text-sm font-sans font-bold transition-colors duration-200 relative group"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-white hover:text-gray-300 hover:bg-gray-800 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? 'max-h-96 opacity-100 visible'
              : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <div className="px-2 pt-2 pb-6 space-y-1 bg-black backdrop-blur-md rounded-b-lg border-x border-b border-black mt-2">
            {navItems.map((item) => (
              <div key={item.name} className="dropdown-container">
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center justify-between w-full text-white hover:text-gray-300 hover:bg-gray-800 px-3 py-3 text-base font-sans font-bold transition-all duration-200 rounded-sm"
                    >
                      {item.name}
                      <svg
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openDropdown === item.name ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openDropdown === item.name && (
                      <div className="ml-4 space-y-1">
                        {item.items?.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            target={subItem.external ? '_blank' : undefined}
                            rel={subItem.external ? 'noopener noreferrer' : undefined}
                            className="flex items-center text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 text-sm font-open-sans transition-all duration-200 rounded-sm"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setOpenDropdown(null);
                            }}
                          >
                            {subItem.name}
                            {subItem.external && (
                              <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => item.href && handleNavClick(e, item.href)}
                    className="block text-white hover:text-gray-300 hover:bg-gray-800 px-3 py-3 text-base font-sans font-bold transition-all duration-200 rounded-sm"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Use React memo to prevent unnecessary re-renders
const Navbar = memo(NavbarComponent);
export default Navbar;
