import breastplateSeal from '@/assets/breastplate-seal.png';

export const BreastplateSeal = () => (
  <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
    <div className="relative">
      <img
        src={breastplateSeal}
        alt="12-Gemstone Breastplate Seal — Certified"
        className="w-16 h-16 md:w-20 md:h-20 opacity-70 drop-shadow-[0_0_10px_hsl(45,90%,50%,0.3)]"
      />
      <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 font-terminal text-[7px] text-sanctuary-gold/50 uppercase tracking-widest whitespace-nowrap">
        CERTIFIED
      </span>
    </div>
  </div>
);
