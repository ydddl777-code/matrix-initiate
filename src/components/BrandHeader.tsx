import lionLogo from "@/assets/lion-logo.png";
import breastplateLogo from "@/assets/breastplate-logo.png";

export const BrandHeader = () => {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[42] pointer-events-none flex items-center justify-between w-[calc(100%-2rem)] max-w-7xl px-2">
      <img
        src={lionLogo}
        alt="Lion of Judah"
        className="w-12 h-12 md:w-16 md:h-16 rounded-full opacity-80"
        style={{ boxShadow: '0 0 20px hsl(45 80% 50% / 0.3)' }}
      />
      <img
        src={breastplateLogo}
        alt="12-Gemstone Breastplate"
        className="w-12 h-12 md:w-16 md:h-16 rounded-full opacity-80"
        style={{ boxShadow: '0 0 20px hsl(45 80% 50% / 0.3)' }}
      />
    </div>
  );
};
