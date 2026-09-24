import React, { useState } from 'react';
import { ImageProvider } from './context/ImageContext';
import { HeroSection } from './components/sections/HeroSection';
import { Navbar } from './components/layout/Navbar';
import { NatureSection } from './components/sections/NatureSection';
import { CultureSection } from './components/sections/CultureSection';
import { Footer } from './components/layout/Footer';
import { Modal } from './components/ui/Modal';
import { ContentMode } from './types';
import {
  Compass,
  BookOpen,
  Headphones,
  ShieldAlert,
  Mail,
  Info,
  Send,
  CheckCircle2,
} from 'lucide-react';

function MainApp() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [contentMode] = useState<ContentMode>('figma_exact');
  const [modalType, setModalType] = useState<string | null>(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const handleNavSelect = (id: string) => {
    setActiveSection(id);
    if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'visitas') {
      const el = document.getElementById('visitas');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'memorias-escola' || id === 'escola') {
      const el = document.getElementById('memorias-escola');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setModalType(id);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setContactSent(true);
      setTimeout(() => {
        setContactSent(false);
        setModalType(null);
        setContactName('');
        setContactEmail('');
        setContactSubject('');
        setContactMessage('');
      }, 2000);
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

      {/* 4. Rodapé Preto Puro com Acervo Comunitário e Navegação */}
      <Footer onSelectNav={handleNavSelect} />

      {/* Interactive Information Modals for Navbar Items */}
      <Modal
        isOpen={modalType === 'visitas-info'}
        onClose={() => setModalType(null)}
        title="Visitas Virtuais Pedagógicas"
        subtitle="Explore o território e os espaços de aprendizagem viva"
      >
        <div className="space-y-4">
          <p>
            Conheça os espaços onde a educação tradicional e a preservação ambiental se unem no dia a dia da comunidade escolar.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="border border-neutral-200 rounded-lg p-3 hover:border-[#8B0000] transition-colors">
              <div className="flex items-center gap-2 text-[#8B0000] font-bold text-xs uppercase mb-1">
                <Compass className="w-4 h-4" />
                <span>Trilha das Ervas Medicinais</span>
              </div>
              <p className="text-xs text-neutral-600">
                Passeio guiado pelas espécies catalogadas pelas mulheres e anciãs da aldeia.
              </p>
            </div>
            <div className="border border-neutral-200 rounded-lg p-3 hover:border-[#8B0000] transition-colors">
              <div className="flex items-center gap-2 text-[#8B0000] font-bold text-xs uppercase mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Casa de Saberes &amp; Cânticos</span>
              </div>
              <p className="text-xs text-neutral-600">
                Centro cerimonial e de contação de histórias com acervo sonoro comunitário.
              </p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalType === 'historias'}
        onClose={() => setModalType(null)}
        title="Tradição Oral &amp; Relatos dos Anciãos"
        subtitle="Vozes vivas guardiãs da memória comunitária"
      >
        <div className="space-y-4">
          <p>
            A tradição oral é a base da nossa transmissão de conhecimento, preservando o valor do respeito à floresta, às águas e aos ancestrais.
          </p>
          <div className="space-y-2">
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-start gap-3">
              <Headphones className="w-5 h-5 text-[#8B0000] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-neutral-900">O Canto das Sementes Nativas</h4>
                <p className="text-xs text-neutral-600">Áudio registrado na colheita das sementes da sumaúma e açaí.</p>
              </div>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-start gap-3">
              <Headphones className="w-5 h-5 text-[#8B0000] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-neutral-900">A Criação do Rio e das Matas</h4>
                <p className="text-xs text-neutral-600">Narrativa mítica contada pelos mestres anciãos em língua materna e português.</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalType === 'manual'}
        onClose={() => setModalType(null)}
        title="Manual de Conduta e Ética Comunitária"
        subtitle="Diretrizes de respeito ao território e aos saberes tradicionais"
      >
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">
            <ShieldAlert className="w-5 h-5 shrink-0 text-amber-700 mt-0.5" />
            <p className="text-xs">
              Todo o conteúdo visual e oral deste acervo pertence coletivamente à comunidade indígena e segue o protocolo de consulta prévia, livre e informada.
            </p>
          </div>
          <ul className="text-xs space-y-2 text-neutral-700 list-disc list-inside pt-2">
            <li>É proibida a reprodução comercial de cantos, imagens ou fórmulas medicinais sem autorização.</li>
            <li>O uso educacional em escolas públicas é incentivado, mediante citação da fonte.</li>
            <li>Respeito integral ao consentimento individual e coletivo dos guardiões de saberes.</li>
          </ul>
        </div>
      </Modal>

      <Modal
        isOpen={modalType === 'fale-conosco'}
        onClose={() => setModalType(null)}
        title="Fale com a Equipe Escolar"
        subtitle="Canal institucional para parcerias pedagógicas e intercâmbios"
      >
        {contactSent ? (
          <div className="p-6 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-neutral-900 text-base">Mensagem Enviada com Sucesso!</h4>
            <p className="text-xs text-neutral-600">
              Agradecemos o contato. A coordenação pedagógica responderá em breve.
            </p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Nome Completo / Instituição
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Ex: Escola Municipal / Prof. Ana Silva"
                className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                E-mail para Contato
              </label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="seu.email@instituicao.org"
                className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Assunto
              </label>
              <input
                type="text"
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                placeholder="Visita pedagógica, intercâmbio, etc."
                className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Mensagem
              </label>
              <textarea
                required
                rows={3}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Descreva seu interesse de contato..."
                className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] resize-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-5 bg-[#8B0000] hover:bg-[#a50000] active:scale-95 text-white font-bold text-xs rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg mt-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar Mensagem</span>
            </button>
          </form>
        )}
      </Modal>

      <Modal
        isOpen={modalType === 'sobre'}
        onClose={() => setModalType(null)}
        title="Sobre o Projeto Memórias Vivas"
        subtitle="Documentação digital da educação escolar diferenciada"
      >
        <div className="space-y-3">
          <p>
            O portal <strong>Memórias da Escola Indígena</strong> é um ambiente digital concebido para documentar, celebrar e salvaguardar a história, as práticas pedagógicas e os saberes ancestrais da nossa comunidade escolar.
          </p>
          <div className="border-t border-neutral-200 pt-3 space-y-2 text-xs text-neutral-600">
            <div className="flex items-center gap-2 text-neutral-900 font-semibold">
              <Info className="w-4 h-4 text-[#8B0000]" />
              <span>Objetivos Principais:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Dar visibilidade à pedagogia viva e intercultural indígena.</li>
              <li>Preservar acervos fotográficos, botânicos e narrativas dos anciãos.</li>
              <li>Servir de ferramenta pedagógica para estudantes e pesquisadores.</li>
            </ul>
          </div>
        </div>
      </Modal>
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
