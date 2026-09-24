import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndigenousLogo } from '../ui/IndigenousLogo';

export interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  title: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'children-seeds',
    src: '/images/hero.jpg',
    alt: 'Crianças indígenas reunidas na grama ao redor de peneira tradicional com sementes nativas',
    title: 'Saberes Ancestrais & Infância',
  },
  {
    id: 'school-classroom',
    src: '/images/hero_school_class.jpg',
    alt: 'Educador e estudantes indígenas em sala de aula ao ar livre integrada à floresta amazônica',
    title: 'Educação Escolar Indígena Diferenciada',
  },
  {
    id: 'youth-learning',
    src: '/images/hero_youth_learning.jpg',
    alt: 'Jovens indígenas aprendendo artesanato tradicional e catalogação etnobotânica de sementes',
    title: 'Salvaguarda Cultural & Tradição Viva',
  },
  {
    id: 'culture-tradition',
    src: '/images/cultura-tradicao.jpg',
    alt: 'Crianças e jovens indígenas em trajes tradicionais e celebração cultural comunitária',
    title: 'Memórias Vivas & Celebração Comunitária',
  },
];

export const HeroSection: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Troca 100% automática e contínua entre as imagens do background a cada 5.5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <section
      id="inicio"
      className="relative w-full flex flex-col justify-between bg-black select-none overflow-hidden h-[calc(100svh-3.5rem)] md:h-[calc(100svh-4rem)] min-h-[460px] max-h-[1140px]"
      aria-label="Apresentação Principal"
    >
      {/* 
        Hero Image Container:
        Ocupa todo o espaço vertical da tela inicial até a barra de navegação,
        garantindo que Hero + Navbar formem exatamente 100svh no primeiro impacto visual.
      */}
      <div className="relative w-full h-full overflow-hidden bg-neutral-950">
        {/* Slideshow 100% Automático com Transição Crossfade e Efeito Ken Burns Suave */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeSlide.src}
              alt={activeSlide.alt}
              className="w-full h-full object-cover object-center select-none"
              referrerPolicy="no-referrer"
              loading="eager"
            />
            {/* Vinheta sutil e gradiente de iluminação natural para profundidade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Top-Left: 3 Barras Pretas Verticais (Frame 17 exato, com proporção harmoniosa em mobile e desktop) */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-3 sm:left-6 md:left-10 lg:left-14 xl:left-16 z-20 pointer-events-none"
        >
          <IndigenousLogo variant="hero-bars" />
        </motion.div>

        {/* Right-Side: 3 Círculos Vermelhos (Exatamente 50% projetados para fora da borda direita) */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 z-20 pointer-events-none"
        >
          <IndigenousLogo variant="hero-dots" />
        </motion.div>
      </div>
    </section>
  );
};
