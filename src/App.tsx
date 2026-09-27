import React, { useState } from 'react';
import { ImageProvider } from './context/ImageContext';
import { HeroSection } from './components/sections/HeroSection';
import { Navbar } from './components/layout/Navbar';
import { NatureSection } from './components/sections/NatureSection';
import { CultureSection } from './components/sections/CultureSection';
import { Footer } from './components/layout/Footer';
import { ContentMode } from './types';

function MainApp() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [contentMode] = useState<ContentMode>('figma_exact');

  const handleNavSelect = (id: string) => {
    setActiveSection(id);
    if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'visitas' || id === 'visitas-info') {
      const el = document.getElementById('visitas');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'memorias-escola' || id === 'escola') {
      const el = document.getElementById('memorias-escola');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-900 flex flex-col font-sans selection:bg-[#8B0000] selection:text-white">
      {/* Main Page Layout (Exact Frame 17 Flow) */}
      <main className="flex-1">
        {/* 1. Hero com Slideshow Automático de Imagens + Barras + Círculos */}
        <HeroSection />

        {/* 2. Barra de Navegação Vermelha Sticky (Acompanha a rolagem da página e mantém o menu hamburguer acessível) */}
        <Navbar
          activeSection={activeSection}
          onSelectNav={handleNavSelect}
        />

        {/* 3. Seção Floresta: Fundo Floresta + Parallax de Abertura/Portal dos Troncos + Card Branco + Foto da Árvore */}
        <NatureSection
          mode={contentMode}
          onSelectNav={handleNavSelect}
        />

        {/* 4. Seção Cultura: Fundo Vermelho Sólido + Card Branco + Foto Cerimonial */}
        <CultureSection
          mode={contentMode}
          onSelectNav={handleNavSelect}
        />
      </main>

      {/* 5. Rodapé Preto Puro com Acervo Comunitário e Navegação */}
      <Footer onSelectNav={handleNavSelect} />
    </div>
  );
}

export default function App() {
  return (
    <ImageProvider>
      <MainApp />
    </ImageProvider>
  );
}
