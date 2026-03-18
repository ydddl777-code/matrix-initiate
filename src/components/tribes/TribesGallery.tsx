import { useState } from "react";
import { Crown, Download, ChevronDown, ChevronUp, BookOpen } from "lucide-react";

// Import all tribal banners
import judahBanner from "@/assets/tribes/judah.jpeg";
import reubenBanner from "@/assets/tribes/reuben.jpeg";
import simeonBanner from "@/assets/tribes/simeon.jpeg";
import leviBanner from "@/assets/tribes/levi.jpeg";
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
  symbol: string;
  jacobBlessing: string;
  identity: string;
  notableFigures: string;
  endTimes: string;
}

const tribes: TribeData[] = [
  {
    name: "Reuben", hebrewName: "רְאוּבֵן", banner: reubenBanner, blessing: "Firstborn Strength",
    symbol: "Mandrakes",
    jacobBlessing: "Reuben, you are my firstborn, my might, and the firstfruits of my strength, the excellency of dignity and the excellency of power. Unstable as water, you shall not excel. — Genesis 49:3-4",
    identity: "The firstborn of Israel, Reuben carried the birthright in name only — stripped due to his sin. His tribe settled east of the Jordan, choosing comfort over calling. Yet he tried to spare Joseph from death.",
    notableFigures: "No kings or major judges arose from Reuben. His legacy is a warning — the firstborn who lost his inheritance through moral failure.",
    endTimes: "Reuben is listed first among the 144,000 in Revelation 7:5 — 12,000 sealed. Despite his failures, mercy restores him."
  },
  {
    name: "Simeon", hebrewName: "שִׁמְעוֹן", banner: simeonBanner, blessing: "Heard by YAH",
    symbol: "Sword / City Gate",
    jacobBlessing: "Simeon and Levi are brothers; instruments of cruelty are in their habitations... Cursed be their anger, for it was fierce. I will divide them in Jacob. — Genesis 49:5-7",
    identity: "Simeon was scattered as Jacob prophesied — absorbed within Judah's territory. By David's census, Simeon was among the smallest tribes.",
    notableFigures: "Simeon of the New Testament (Luke 2:25-35) blessed the infant Messiah in the Temple — a prophetic echo of redemption.",
    endTimes: "Simeon appears in Revelation 7:7 among the 144,000 — 12,000 sealed. The scattered tribe is gathered."
  },
  {
    name: "Levi", hebrewName: "לֵוִי", banner: leviBanner, blessing: "Set Apart",
    symbol: "Breastplate of the High Priest / Urim and Thummim",
    jacobBlessing: "Let your Thummim and your Urim belong to your faithful servant... He watched over your word and guarded your covenant. — Deuteronomy 33:8-9",
    identity: "Levi began under a curse and ended as the tribe of the priesthood. No inheritance of land — the Most High Himself was their inheritance. Scattered across 48 cities, their scattering became a blessing.",
    notableFigures: "Moses, Aaron, Miriam, Phinehas, Ezra, John the Baptist. The Prophet Gad worked alongside Levitical musicians to establish temple worship.",
    endTimes: "In Revelation 7, Levi replaces Dan among the 144,000 — 12,000 sealed. The priestly tribe stands where the serpent's path once stood."
  },
  {
    name: "Judah", hebrewName: "יְהוּדָה", banner: judahBanner, blessing: "The Lion's Portion",
    symbol: "Lion",
    jacobBlessing: "Judah is a lion's whelp... The scepter shall not depart from Judah, nor a lawgiver from between his feet, until Shiloh come. — Genesis 49:9-10",
    identity: "The royal tribe. Judah led the march in the wilderness. The largest tribe. The southern kingdom bore Judah's name after the division.",
    notableFigures: "Caleb, David, Solomon, Hezekiah, Josiah. The Messiah Himself came through Judah — the Lion of the tribe of Judah (Revelation 5:5).",
    endTimes: "Judah is listed first in Revelation 7:5 — not Reuben the firstborn, but Judah the royal tribe. 12,000 sealed."
  },
  {
    name: "Dan", hebrewName: "דָּן", banner: danBanner, blessing: "Judge of Israel",
    symbol: "Serpent / Eagle",
    jacobBlessing: "Dan shall judge his people... Dan shall be a serpent by the way, an adder in the path... I have waited for your salvation, O Lord. — Genesis 49:16-18",
    identity: "Dan judged Israel — Samson was a Danite judge. The Danites were the first tribe to fall into systematic idolatry, setting up Micah's idol.",
    notableFigures: "Samson — great gifting, compromised by the flesh. Oholiab, craftsman of the Tabernacle (Exodus 31:6).",
    endTimes: "Dan is absent from the 144,000 in Revelation 7 — replaced by Manasseh. A solemn warning: persistent apostasy forfeits your place."
  },
  {
    name: "Naphtali", hebrewName: "נַפְתָּלִי", banner: naphtaliBanner, blessing: "Goodly Words",
    symbol: "Doe / Swift Deer",
    jacobBlessing: "Naphtali is a doe let loose; he gives beautiful words. — Genesis 49:21",
    identity: "Naphtali's territory around the Sea of Galilee fulfilled Isaiah's prophecy — the Messiah made His base of ministry in this land. Swift, eloquent, free-spirited.",
    notableFigures: "Barak the general who defeated Sisera (Judges 4:6). The land of Naphtali became the cradle of the Galilean ministry.",
    endTimes: "Naphtali appears in Revelation 7:6 — 12,000 sealed. The doe let loose runs into eternity."
  },
  {
    name: "Gad", hebrewName: "גָּד", banner: gadBanner, blessing: "Troop Overcomer",
    symbol: "Lion / Armed Warrior / Encampment",
    jacobBlessing: "Gad, a troop shall overcome him, but he shall overcome at the last. — Genesis 49:19. Moses adds: Gad lives there like a lion, tearing at arm or head. — Deuteronomy 33:20-21",
    identity: "The Gadites were among the fiercest warriors in all Israel. They settled in Gilead east of the Jordan but honored their covenant to fight alongside their brothers until the conquest was complete.",
    notableFigures: "The Prophet Gad — David's seer (1 Samuel 22:5, 2 Samuel 24). He confronted David, delivered judgment, wrote chronicles, and organized temple worship. Elijah the Tishbite came from Gilead — Gad's territory.",
    endTimes: "Gad appears in Revelation 7:5 — 12,000 sealed. The troop that overcomes at the last. The warrior-prophet tribe sealed for the final conflict."
  },
  {
    name: "Asher", hebrewName: "אָשֵׁר", banner: asherBanner, blessing: "Royal Dainties",
    symbol: "Olive Tree / Cup of Oil",
    jacobBlessing: "Out of Asher his bread shall be fat, and he shall yield royal dainties... let him dip his foot in oil. — Genesis 49:20, Deuteronomy 33:24-25",
    identity: "Asher was the tribe of abundance, oil, and royal provision. Their Mediterranean coastal territory was among the most fertile. 'As your days, so shall your strength be.'",
    notableFigures: "Anna the prophetess recognized the infant Messiah in the Temple (Luke 2:36-38). A woman from the most abundant tribe announced the Bread of Life.",
    endTimes: "Asher appears in Revelation 7:6 — 12,000 sealed. The tribe of royal dainties serves at the table of the eternal kingdom."
  },
  {
    name: "Issachar", hebrewName: "יִשָּׂשכָר", banner: issacharBanner, blessing: "Strong Donkey",
    symbol: "Donkey / Sun and Moon",
    jacobBlessing: "Issachar is a strong donkey, crouching between the sheepfolds. He saw that a resting place was good... so he bowed his shoulder to bear. — Genesis 49:14-15",
    identity: "The sons of Issachar were 'men who had understanding of the times, to know what Israel ought to do' (1 Chronicles 12:32) — 200 chiefs of discernment.",
    notableFigures: "Tola, judge of Israel (Judges 10:1). The 200 chiefs who understood the times — Issachar's greatest prophetic contribution.",
    endTimes: "Issachar appears in Revelation 7:7 — 12,000 sealed. The tribe that knew the times is sealed for the final hour."
  },
  {
    name: "Zebulun", hebrewName: "זְבוּלֻן", banner: zebulunBanner, blessing: "Haven of Ships",
    symbol: "Ship / Anchor",
    jacobBlessing: "Zebulun shall dwell at the shore of the sea; he shall become a haven for ships, and his border shall be at Sidon. — Genesis 49:13",
    identity: "Zebulun controlled key trade routes. Warriors of unusual courage — 'a people that jeopardized their lives to the death in the high places of the field' (Judges 5:18).",
    notableFigures: "Elon the judge (Judges 12:11-12). Zebulun's territory produced the context for the calling of the first disciples on the Sea of Galilee.",
    endTimes: "Zebulun appears in Revelation 7:8 — 12,000 sealed. The haven tribe, sealed to shelter the remnant."
  },
  {
    name: "Joseph", hebrewName: "יוֹסֵף", banner: josephBanner, blessing: "Fruitful Bough",
    symbol: "Fruitful Vine / Two Bundles of Grain / Bull",
    jacobBlessing: "Joseph is a fruitful bough, a fruitful bough by a spring; his branches run over the wall... by the Almighty who will bless you with blessings of heaven above. — Genesis 49:22-25",
    identity: "Joseph received the double portion — Ephraim and Manasseh each became a full tribe. Joseph's life is the most complete type of the Messiah: beloved, rejected, sold, imprisoned, raised to the throne.",
    notableFigures: "Joshua from Ephraim led Israel into the Promised Land. Gideon from Manasseh (Judges 6:15).",
    endTimes: "Manasseh appears in Revelation 7 with 12,000 sealed. Joseph is listed separately with 12,000. Ephraim is absent."
  },
  {
    name: "Benjamin", hebrewName: "בִּנְיָמִין", banner: benjaminBanner, blessing: "Wolf of Victory",
    symbol: "Wolf / Arrow",
    jacobBlessing: "Benjamin is a ravenous wolf; in the morning he devours the prey, and at evening he divides the spoil. — Genesis 49:27",
    identity: "The last born and most fiercely loved — Rachel died giving him birth. Benjamin's warriors were elite left-handed slingers. Nearly destroyed in the civil war of Gibeah, then miraculously restored.",
    notableFigures: "King Saul — Israel's first king. The Apostle Paul — 'of the tribe of Benjamin' (Philippians 3:5). Mordecai and Esther — deliverers in Persia.",
    endTimes: "Benjamin appears last in Revelation 7:8 — 12,000 sealed. The last born, nearly destroyed, miraculously preserved."
  },
];

export const TribesGallery = () => {
  const [expandedTribe, setExpandedTribe] = useState<string | null>(null);

  const toggleTribe = (name: string) => {
    setExpandedTribe(expandedTribe === name ? null : name);
  };

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
          CAMP OF ISRAEL • BANNER REGISTRY • A PROPHETIC DOSSIER
        </p>
      </div>

      {/* Free Ebook Download */}
      <div className="flex justify-center">
        <a
          href="/downloads/twelve-tribes-of-israel.pdf"
          download="The_Twelve_Tribes_of_Israel_-_Prophet_Gad.pdf"
          className="group flex items-center gap-3 px-6 py-3 rounded border border-sanctuary-gold/40 bg-sanctuary-gold/5 hover:bg-sanctuary-gold/15 hover:border-sanctuary-gold/70 transition-all duration-300"
        >
          <Download className="w-5 h-5 text-sanctuary-gold group-hover:animate-bounce" />
          <div className="text-left">
            <p className="font-display text-sm text-sanctuary-gold font-bold tracking-wider">
              FREE EBOOK — THE TWELVE TRIBES OF ISRAEL
            </p>
            <p className="font-terminal text-[10px] text-sanctuary-muted">
              A Prophetic Dossier by Prophet Gad • From Jacob's Deathbed to Revelation 7
            </p>
          </div>
          <BookOpen className="w-4 h-4 text-sanctuary-gold/60" />
        </a>
      </div>

      {/* Tribes Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {tribes.map((tribe) => (
          <div
            key={tribe.name}
            className="group relative overflow-hidden rounded border border-sanctuary-primary/20 bg-white/50 hover:border-sanctuary-gold/50 transition-all duration-300 cursor-pointer"
            onClick={() => toggleTribe(tribe.name)}
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
                {tribe.symbol}
              </p>
            </div>
            
            {/* Tribe Name + Expand indicator */}
            <div className="p-2 text-center border-t border-sanctuary-primary/10 flex items-center justify-center gap-1">
              <p className="font-display text-xs text-sanctuary-primary font-bold tracking-wider">
                {tribe.name.toUpperCase()}
              </p>
              {expandedTribe === tribe.name ? (
                <ChevronUp className="w-3 h-3 text-sanctuary-gold" />
              ) : (
                <ChevronDown className="w-3 h-3 text-sanctuary-muted" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Tribe Detail */}
      {expandedTribe && (() => {
        const tribe = tribes.find(t => t.name === expandedTribe);
        if (!tribe) return null;
        return (
          <div className="border border-sanctuary-gold/30 rounded-lg bg-sanctuary-gold/5 p-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={tribe.banner}
                  alt={tribe.name}
                  className="w-16 h-20 object-cover rounded border border-sanctuary-gold/40"
                />
                <div>
                  <h3 className="font-display text-xl text-sanctuary-primary font-bold tracking-wider">
                    {tribe.name.toUpperCase()}
                  </h3>
                  <p className="font-ceremonial text-lg text-sanctuary-gold">{tribe.hebrewName}</p>
                  <p className="font-terminal text-[10px] text-sanctuary-muted tracking-wider">
                    SYMBOL: {tribe.symbol.toUpperCase()}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setExpandedTribe(null); }}
                className="text-sanctuary-muted hover:text-sanctuary-primary transition-colors"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="font-display text-xs text-sanctuary-gold font-bold tracking-wider mb-1">JACOB'S BLESSING</p>
                <p className="font-serif text-sanctuary-text italic leading-relaxed">{tribe.jacobBlessing}</p>
              </div>
              <div>
                <p className="font-display text-xs text-sanctuary-gold font-bold tracking-wider mb-1">TRIBAL IDENTITY</p>
                <p className="font-serif text-sanctuary-text leading-relaxed">{tribe.identity}</p>
              </div>
              <div>
                <p className="font-display text-xs text-sanctuary-gold font-bold tracking-wider mb-1">NOTABLE FIGURES</p>
                <p className="font-serif text-sanctuary-text leading-relaxed">{tribe.notableFigures}</p>
              </div>
              <div>
                <p className="font-display text-xs text-sanctuary-gold font-bold tracking-wider mb-1">END-TIMES SIGNIFICANCE</p>
                <p className="font-serif text-sanctuary-text leading-relaxed">{tribe.endTimes}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Footer */}
      <div className="text-center pt-4 border-t border-sanctuary-text/10">
        <p className="font-terminal text-xs text-sanctuary-muted">
          GENESIS 49 • DEUTERONOMY 33 • THE CAMP FORMATION
        </p>
      </div>
    </div>
  );
};
