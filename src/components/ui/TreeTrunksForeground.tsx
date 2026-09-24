import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface TreeTrunksForegroundProps {
  xLeft: MotionValue<number>;
  xRight: MotionValue<number>;
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
      {/* Tronco da Esquerda Real (Abertura / Portal para a esquerda com Framer Motion) */}
      <motion.div
        className="absolute -top-[12%] -bottom-[12%] left-0 w-20 sm:w-32 md:w-48 lg:w-64 xl:w-80 2xl:w-92 h-[124%] will-change-transform origin-left"
        style={{
          x: xLeft,
          y: yLeft,
          scale: scaleLeft,
        }}
      >
        <img
          src="/images/trunk_left.png"
          alt=""
          className="w-full h-full object-cover object-left filter drop-shadow-[12px_0_25px_rgba(0,0,0,0.55)] contrast-105 brightness-95"
          referrerPolicy="no-referrer"
          loading="eager"
        />
      </motion.div>

      {/* Tronco da Direita Real (Abertura / Portal para a direita com Framer Motion) */}
      <motion.div
        className="absolute -top-[12%] -bottom-[12%] right-0 w-20 sm:w-32 md:w-48 lg:w-64 xl:w-80 2xl:w-92 h-[124%] will-change-transform origin-right"
        style={{
          x: xRight,
          y: yRight,
          scale: scaleRight,
        }}
      >
        <img
          src="/images/trunk_right.png"
          alt=""
          className="w-full h-full object-cover object-right filter drop-shadow-[-12px_0_25px_rgba(0,0,0,0.55)] contrast-105 brightness-95"
          referrerPolicy="no-referrer"
          loading="eager"
        />
      </motion.div>
    </div>
  );
};
