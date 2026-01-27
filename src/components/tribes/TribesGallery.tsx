import { Crown } from "lucide-react";

// Import all tribal banners
import judahBanner from "@/assets/tribes/judah.jpeg";
import reubenBanner from "@/assets/tribes/reuben.jpeg";
import simeonBanner from "@/assets/tribes/simeon.jpeg";
import leviBanner from "@/assets/tribes/levi.jpeg";
import judahSecondary from "@/assets/tribes/judah.jpeg"; // Placeholder for missing
import zebulunBanner from "@/assets/tribes/zebulun.jpeg";
import issacharBanner from "@/assets/tribes/issachar.jpeg";
import danBanner from "@/assets/tribes/dan.jpeg";
import gadBanner from "@/assets/tribes/gad.jpeg";
import asherBanner from "@/assets/tribes/asher.jpeg";
import naphtaliBanner from "@/assets/tribes/naphtali.jpeg";
import josephBanner from "@/assets/tribes/joseph.jpeg";
import benjaminBanner from "@/assets/tribes/benjamin.jpeg";

interface TribeData {
  name: string;
  hebrewName: string;
  banner: string;
  blessing: string;
}

const tribes: TribeData[] = [
  { name: "Judah", hebrewName: "יְהוּדָה", banner: judahBanner, blessing: "The Lion's Portion" },
  { name: "Reuben", hebrewName: "רְאוּבֵן", banner: reubenBanner, blessing: "Firstborn Strength" },
  { name: "Simeon", hebrewName: "שִׁמְעוֹן", banner: simeonBanner, blessing: "Heard by YAH" },
  { name: "Levi", hebrewName: "לֵוִי", banner: leviBanner, blessing: "Set Apart" },
  { name: "Zebulun", hebrewName: "זְבוּלֻן", banner: zebulunBanner, blessing: "Haven of Ships" },
  { name: "Issachar", hebrewName: "יִשָּׂשכָר", banner: issacharBanner, blessing: "Strong Donkey" },
  { name: "Dan", hebrewName: "דָּן", banner: danBanner, blessing: "Judge of Israel" },
  { name: "Gad", hebrewName: "גָּד", banner: gadBanner, blessing: "Troop Overcomer" },
  { name: "Asher", hebrewName: "אָשֵׁר", banner: asherBanner, blessing: "Royal Dainties" },
  { name: "Naphtali", hebrewName: "נַפְתָּלִי", banner: naphtaliBanner, blessing: "Goodly Words" },
  { name: "Joseph", hebrewName: "יוֹסֵף", banner: josephBanner, blessing: "Fruitful Bough" },
  { name: "Benjamin", hebrewName: "בִּנְיָמִין", banner: benjaminBanner, blessing: "Wolf of Victory" },
];

export const TribesGallery = () => {
  return (
    <div className="space-y-6">
      {/* Gallery Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-sanctuary-text/30" />
          <Crown className="w-6 h-6 text-sanctuary-gold" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-sanctuary-text/30" />
        </div>
        
        <h2 className="font-display text-2xl text-sanctuary-primary font-bold tracking-wider">
          THE TWELVE TRIBES
        </h2>
        
        <p className="font-terminal text-xs text-sanctuary-muted">
          CAMP OF ISRAEL • BANNER REGISTRY
        </p>
      </div>

      {/* Tribes Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {tribes.map((tribe) => (
          <div
            key={tribe.name}
            className="group relative overflow-hidden rounded border border-sanctuary-primary/20 bg-white/50 hover:border-sanctuary-gold/50 transition-all duration-300"
          >
            {/* Banner Image */}
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={tribe.banner}
                alt={`${tribe.name} tribal banner`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-sanctuary-primary/90 via-sanctuary-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2">
              <p className="font-ceremonial text-lg text-white font-bold text-center">
                {tribe.hebrewName}
              </p>
              <p className="font-terminal text-[10px] text-sanctuary-gold text-center">
                {tribe.blessing}
              </p>
            </div>
            
            {/* Tribe Name */}
            <div className="p-2 text-center border-t border-sanctuary-primary/10">
              <p className="font-display text-xs text-sanctuary-primary font-bold tracking-wider">
                {tribe.name.toUpperCase()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center pt-4 border-t border-sanctuary-text/10">
        <p className="font-terminal text-xs text-sanctuary-muted">
          GENESIS 49 • DEUTERONOMY 33 • THE CAMP FORMATION
        </p>
      </div>
    </div>
  );
};
