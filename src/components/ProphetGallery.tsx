import pgaiWarrior from "@/assets/pgai-warrior.jpg";
import pgaiSuit from "@/assets/pgai-suit.jpg";
import pgaiBreastplate from "@/assets/pgai-breastplate.png";

export const ProphetGallery = () => {
  const images = [
    {
      src: pgaiWarrior,
      alt: "Prophet Gad - Warrior of Israel with Spear",
      caption: "THE WARRIOR",
    },
    {
      src: pgaiSuit,
      alt: "Prophet Gad - The Commander",
      caption: "THE COMMANDER",
    },
    {
      src: pgaiBreastplate,
      alt: "Prophet Gad - Breastplate of Judgment",
      caption: "THE BREASTPLATE",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg text-sanctuary-gold font-bold italic tracking-wider text-center">
        ⚔ THE PROPHET'S ARSENAL ⚔
      </h3>
      
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 border-2 border-sanctuary-gold/60" />
            <div className="absolute inset-1 border border-sanctuary-primary/40" />
            
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-sanctuary-gold" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-sanctuary-gold" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-sanctuary-gold" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-sanctuary-gold" />
            
            <div className="p-2">
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-56 object-cover object-top grayscale-[20%] contrast-110 brightness-105 
                    transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  style={{
                    filter: 'drop-shadow(0 0 10px hsl(45 80% 45% / 0.3))',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sanctuary-primary/30 via-transparent to-transparent" />
              </div>
              
              <div className="mt-2 text-center">
                <p className="font-terminal text-xs text-sanctuary-gold font-bold tracking-widest">
                  {image.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center gap-3 pt-2">
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-sanctuary-gold to-transparent" />
        <span className="font-terminal text-[10px] text-sanctuary-muted tracking-widest">
          ARMED FOR DOCTRINE
        </span>
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-sanctuary-gold to-transparent" />
      </div>
    </div>
  );
};
