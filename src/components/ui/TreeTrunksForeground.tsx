import React from "react";
import { motion, MotionValue } from "framer-motion";

interface TreeTrunksForegroundProps {
  xLeft: MotionValue<string> | MotionValue<number>;
  xRight: MotionValue<string> | MotionValue<number>;
  yLeft: MotionValue<number>;
  yRight: MotionValue<number>;
  scaleLeft: MotionValue<number>;
  scaleRight: MotionValue<number>;
}

export const TreeTrunksForeground: React.FC<TreeTrunksForegroundProps> = ({
  xLeft,
  xRight,
  yLeft,
  yRight,
  scaleLeft,
  scaleRight,
}) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 
        Tronco da Esquerda:
        - Abaixo de 640px: -left-32 (mantém proporção ideal mobile).
        - Entre 640px e 1024px: -left-60 a -left-72 (projetado para fora da tela p/ não cobrir o centro em tablets).
        - Acima de 1024px: lg:-left-12 xl:left-0 (mantém proporção ideal desktop).
      */}
      <motion.div
        className="absolute -top-[8%] -left-32 sm:-left-60 md:-left-72 lg:-left-12 xl:left-0 h-[116%] w-auto pointer-events-none will-change-transform origin-left"
        style={{
          x: xLeft,
          y: yLeft,
          scale: scaleLeft,
        }}
      >
        <img
          src="/images/tronco_2.png"
          alt=""
          className="h-full w-auto max-w-none object-contain pointer-events-none filter drop-shadow-[14px_0_25px_rgba(0,0,0,0.65)] contrast-105 brightness-95 select-none"
          referrerPolicy="no-referrer"
          loading="eager"
        />
      </motion.div>

      {/* 
        Tronco da Direita:
        - Abaixo de 640px: -right-32 (mantém proporção ideal mobile).
        - Entre 640px e 1024px: -right-60 a -right-72 (projetado para fora da tela p/ não cobrir o centro em tablets).
        - Acima de 1024px: lg:-right-12 xl:right-0 (mantém proporção ideal desktop).
      */}
      <motion.div
        className="absolute -top-[8%] -right-32 sm:-right-60 md:-right-72 lg:-right-12 xl:right-0 h-[116%] w-auto pointer-events-none will-change-transform origin-right"
        style={{
          x: xRight,
          y: yRight,
          scale: scaleRight,
        }}
      >
        <img
          src="/images/tronco_1.png"
          alt=""
          className="h-full w-auto max-w-none object-contain pointer-events-none filter drop-shadow-[-14px_0_25px_rgba(0,0,0,0.65)] contrast-105 brightness-95 select-none"
          referrerPolicy="no-referrer"
          loading="eager"
        />
      </motion.div>
    </div>
  );
};
