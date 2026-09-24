import React from 'react';

interface IndigenousLogoProps {
  variant?: 'hero-bars' | 'hero-dots' | 'navbar-logo';
  barColor?: string;
  className?: string;
}

export const IndigenousLogo: React.FC<IndigenousLogoProps> = ({
  variant = 'navbar-logo',
  barColor = 'bg-black',
  className = '',
}) => {
  if (variant === 'hero-bars') {
    // 3 barras pretas verticais no canto superior esquerdo (comprimento calibrado para todas as resoluções)
    return (
      <div
        className={`flex items-start gap-1.5 sm:gap-2.5 md:gap-3 ${className}`}
        aria-hidden="true"
      >
        <div className={`w-2.5 sm:w-4 md:w-5 lg:w-7 h-14 sm:h-20 md:h-28 lg:h-36 ${barColor} shadow-lg`} />
        <div className={`w-2.5 sm:w-4 md:w-5 lg:w-7 h-14 sm:h-20 md:h-28 lg:h-36 ${barColor} shadow-lg`} />
        <div className={`w-2.5 sm:w-4 md:w-5 lg:w-7 h-14 sm:h-20 md:h-28 lg:h-36 ${barColor} shadow-lg`} />
      </div>
    );
  }

  if (variant === 'hero-dots') {
    // 3 círculos vermelhos verticais com proporção calibrada e metade projetada para fora da borda direita
    return (
      <div
        className={`flex flex-col items-center gap-2 sm:gap-3.5 md:gap-4.5 lg:gap-6 ${className}`}
        aria-hidden="true"
      >
        <div className="w-10 h-10 sm:w-16 sm:h-16 md:w-22 md:h-22 lg:w-28 lg:h-28 rounded-full bg-[#E51E2B] shadow-2xl transition-transform hover:scale-105" />
        <div className="w-10 h-10 sm:w-16 sm:h-16 md:w-22 md:h-22 lg:w-28 lg:h-28 rounded-full bg-[#E51E2B] shadow-2xl transition-transform hover:scale-105" />
        <div className="w-10 h-10 sm:w-16 sm:h-16 md:w-22 md:h-22 lg:w-28 lg:h-28 rounded-full bg-[#E51E2B] shadow-2xl transition-transform hover:scale-105" />
      </div>
    );
  }

  // Logo horizontal para Navbar e Footer: 3 barras verticais + 3 pontos vermelhos
  return (
    <div
      className={`inline-flex items-center gap-2 sm:gap-2.5 select-none ${className}`}
      aria-label="Símbolo Memórias Vivas"
    >
      {/* 3 Vertical Bars */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        <div className={`w-1.5 sm:w-2 h-5 sm:h-6 ${barColor}`} />
        <div className={`w-1.5 sm:w-2 h-5 sm:h-6 ${barColor}`} />
        <div className={`w-1.5 sm:w-2 h-5 sm:h-6 ${barColor}`} />
      </div>

      {/* 3 Red Circles */}
      <div className="flex items-center gap-1 sm:gap-1.5 ml-0.5">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#E51E2B]" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#E51E2B]" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#E51E2B]" />
      </div>
    </div>
  );
};
