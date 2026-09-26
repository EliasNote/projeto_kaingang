import React from "react";
import { motion, MotionValue } from "framer-motion";

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
        className="absolute left-0 w-28 sm:w-40 md:w-56 lg:w-72 xl:w-88 2xl:w-[420px] h-full will-change-transform origin-left"
        style={{
          x: xLeft,
          y: yLeft,
          scale: scaleLeft,
        }}
      >
        <img
          src="/images/tronco_2.png"
          alt=""
          className="w-full h-full object-cover object-left filter drop-shadow-[12px_0_25px_rgba(0,0,0,0.55)] contrast-105 brightness-95"
          referrerPolicy="no-referrer"
          loading="eager"
        />
      </motion.div>

      {/* Tronco da Direita Real (Abertura / Portal para a direita com Framer Motion) */}
      <motion.div
        className="absolute right-0 w-28 sm:w-40 md:w-56 lg:w-72 xl:w-88 2xl:w-[420px] h-full will-change-transform origin-right"
        style={{
          x: xRight,
          y: yRight,
          scale: scaleRight,
        }}
      >
        <img
          src="/images/tronco_1.png"
          alt=""
          className="w-full h-full object-cover object-right filter drop-shadow-[-12px_0_25px_rgba(0,0,0,0.55)] contrast-105 brightness-95"
          referrerPolicy="no-referrer"
          loading="eager"
        />
      </motion.div>
    </div>
  );
};
