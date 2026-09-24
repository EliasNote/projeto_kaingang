import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndigenousLogo } from '../ui/IndigenousLogo';
import { NAVIGATION_ITEMS } from '../../data/content';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onSelectNav: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onSelectNav }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle Escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onSelectNav(id);
  };

  return (
    <>
      {/* Sticky Main Navigation Header */}
      <header className="sticky top-0 z-40 w-full bg-[#8B0000] shadow-[0_4px_25px_rgba(0,0,0,0.35)] border-b border-[#730000]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Left Brand: 3 Black Bars + 3 Red Dots */}
            <a
              href="#inicio"
              onClick={(e) => handleNavClick('inicio', e)}
              className="flex items-center py-1 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer rounded-lg"
              aria-label="Página Inicial - Memórias da Escola"
            >
              <IndigenousLogo variant="navbar-logo" />
            </a>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden xl:flex items-center gap-2 2xl:gap-3"
              aria-label="Navegação Principal"
            >
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(item.id, e)}
                    className={`px-3.5 py-1.5 rounded-full text-[13px] 2xl:text-[14px] font-medium transition-all relative whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer ${
                      isActive
                        ? 'bg-black/30 text-white font-bold shadow-inner'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-1 left-3 right-3 h-[2px] bg-white rounded-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Medium screen navigation (Tablets) */}
            <nav
              className="hidden lg:flex xl:hidden items-center gap-1.5 text-xs font-medium"
              aria-label="Navegação Tablet"
            >
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(item.id, e)}
                    className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-black/30 text-white font-bold'
                        : 'text-white/85 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Mobile Traditional Hamburger Button */}
            <div className="flex lg:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg text-white hover:bg-white/10 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all cursor-pointer"
                aria-expanded={mobileMenuOpen}
                aria-label="Abrir menu de navegação"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] w-full h-[100dvh] bg-[#8B0000] text-white flex flex-col justify-between overflow-y-auto lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de Navegação Principal"
          >
            {/* Top Bar */}
            <div className="shrink-0 max-w-[1440px] w-full mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between h-14 sm:h-16 border-b border-white/10">
                <a
                  href="#inicio"
                  onClick={(e) => handleNavClick('inicio', e)}
                  className="flex items-center py-1 cursor-pointer"
                  aria-label="Página Inicial"
                >
                  <IndigenousLogo variant="navbar-logo" />
                </a>

                {/* Close Button com Hover Suave */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-white hover:bg-white/10 hover:rotate-90 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all duration-200 cursor-pointer"
                  aria-label="Fechar menu"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Menu Links Body (Simples com Animação Fluida no Hover) */}
            <div className="flex-1 max-w-sm w-full mx-auto px-6 py-8 flex flex-col justify-center">
              <nav className="flex flex-col gap-2.5" aria-label="Links do Menu Mobile">
                {NAVIGATION_ITEMS.map((item, index) => {
                  const isActive = activeSection === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.03 + index * 0.03,
                        duration: 0.25,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <button
                        type="button"
                        onClick={(e) => handleNavClick(item.id, e)}
                        className={`group relative w-full text-left px-4 py-3.5 rounded-xl text-lg font-medium transition-all duration-200 ease-out cursor-pointer flex items-center justify-between overflow-hidden ${
                          isActive
                            ? 'bg-black/35 text-white font-bold pl-5 shadow-sm'
                            : 'text-white/85 hover:text-white hover:bg-white/10 hover:pl-5 hover:translate-x-1 active:scale-[0.98]'
                        }`}
                      >
                        {/* Linha indicadora lateral animada no Hover */}
                        <span
                          className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full transition-all duration-200 ${
                            isActive
                              ? 'bg-white opacity-100 scale-y-100'
                              : 'bg-white/80 opacity-0 group-hover:opacity-100 group-hover:scale-y-100 scale-y-50'
                          }`}
                        />

                        {/* Texto do Link */}
                        <span className="tracking-tight transition-transform duration-200 group-hover:translate-x-0.5">
                          {item.label}
                        </span>

                        {/* Seta suave revelada no Hover / Item Ativo */}
                        <div className="shrink-0 flex items-center">
                          {isActive ? (
                            <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
                          ) : (
                            <ArrowRight className="w-4 h-4 text-white/40 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white transition-all duration-200 ease-out" />
                          )}
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom space */}
            <div className="shrink-0 p-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
