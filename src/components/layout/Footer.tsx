import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { IndigenousLogo } from '../ui/IndigenousLogo';
import { NAVIGATION_ITEMS } from '../../data/content';

interface FooterProps {
  onSelectNav: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectNav }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#000000] text-neutral-300 border-t border-neutral-900" aria-label="Rodapé">
      {/* Upper Footer com Revelação Suave ao Scroll */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-14 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12"
        >
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <IndigenousLogo variant="navbar-logo" barColor="bg-white" />
              <span className="text-white font-bold text-base tracking-tight">
                Memórias da Escola Indígena
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              Espaço comunitário de documentação da história escolar indígena, salvaguarda dos saberes ancestrais, catalogação etnobotânica e memórias vivas da comunidade.
            </p>
            <div className="pt-2 text-xs text-neutral-400 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E51E2B] shrink-0" />
              <span>Terra Indígena · Educação Escolar Diferenciada</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-white">
              Navegação do Site
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelectNav(item.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 -ml-3 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all text-left cursor-pointer rounded-[3px]"
                  >
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Saberes & Salvaguarda */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-white">
              Acervo Comunitário
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectNav('visitas')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 -ml-3 hover:text-white hover:bg-neutral-900 transition-all cursor-pointer text-left rounded-[3px]"
                >
                  Visitas Pedagógicas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectNav('historias')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 -ml-3 hover:text-white hover:bg-neutral-900 transition-all cursor-pointer text-left rounded-[3px]"
                >
                  Tradição Oral
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectNav('manual')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 -ml-3 hover:text-white hover:bg-neutral-900 transition-all cursor-pointer text-left rounded-[3px]"
                >
                  Manual de Conduta
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectNav('sobre')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 -ml-3 hover:text-white hover:bg-neutral-900 transition-all cursor-pointer text-left rounded-[3px]"
                >
                  Projeto de Extensão
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter / Canal Direto */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-white">
              Atualizações do Projeto
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Receba informes sobre novas publicações, relatos dos anciãos e atividades culturais.
            </p>

            {subscribed ? (
              <div className="p-3.5 bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 text-xs flex items-center gap-2 rounded-[3px]">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Obrigado! Seu e-mail foi cadastrado.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu e-mail institucional"
                    className="w-full pl-4 pr-12 py-2.5 text-xs bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] transition-colors rounded-[3px]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 w-8 h-8 bg-[#8B0000] hover:bg-[#a50000] active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm rounded-[3px]"
                    title="Inscrever-se"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="border-t border-neutral-900 bg-[#080808] py-5 px-4 sm:px-8 text-[11px] text-neutral-500">
        <div className="max-w-[1380px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Memórias da Escola Indígena. Todos os direitos reservados à comunidade.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectNav('manual')}
              className="px-3 py-1 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer rounded-[3px]"
            >
              Manual de Conduta
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => onSelectNav('sobre')}
              className="px-3 py-1 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer rounded-[3px]"
            >
              Sobre o Projeto
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
