import { useState } from "react";
import { Crown, Download, ChevronDown, X, BookOpen, Shield } from "lucide-react";

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
  symbol: string;
  symbolMeaning: string;
  jacobBlessing: string;
  identity: string;
  notableFigures: string;
  endTimes: string;
}

const tribes: TribeData[] = [
  {
    name: "Reuben", hebrewName: "רְאוּבֵן", banner: reubenBanner,
    symbol: "Mandrakes",
    symbolMeaning: "Fertility and love — potential without follow-through",
    jacobBlessing: "Reuben, you are my firstborn, my might, and the firstfruits of my strength, the excellency of dignity and the excellency of power. Unstable as water, you shall not excel. — Genesis 49:3-4",
    identity: "The firstborn of Israel, Reuben carried the birthright in name only — stripped due to his sin against his father. His tribe settled east of the Jordan, choosing comfort over calling. Yet he tried to spare Joseph from death, saying 'Shed no blood.'",
    notableFigures: "No kings or major judges arose from Reuben. His legacy is a warning — the firstborn who lost his inheritance through moral failure.",
    endTimes: "Listed first among the 144,000 in Revelation 7:5 — 12,000 sealed. Despite his failures, mercy restores him."
  },
  {
    name: "Simeon", hebrewName: "שִׁמְעוֹן", banner: simeonBanner,
    symbol: "Sword / City Gate",
    symbolMeaning: "Zeal for honor — passion without wisdom becomes cruelty",
    jacobBlessing: "Simeon and Levi are brothers; instruments of cruelty are in their habitations... Cursed be their anger, for it was fierce; and their wrath, for it was cruel: I will divide them in Jacob, and scatter them in Israel. — Genesis 49:5-7",
    identity: "Simeon was scattered as Jacob prophesied — absorbed within Judah's territory with no contiguous land of their own. By David's census, Simeon was among the smallest tribes.",
    notableFigures: "Simeon of the New Testament (Luke 2:25-35) blessed the infant Messiah in the Temple — a prophetic echo of the tribe's need for redemption.",
    endTimes: "Appears in Revelation 7:7 among the 144,000 — 12,000 sealed. The scattered tribe is gathered. The curse is absorbed into covenant mercy."
  },
  {
    name: "Levi", hebrewName: "לֵוִי", banner: leviBanner,
    symbol: "Breastplate / Urim and Thummim",
    symbolMeaning: "The instrument of divine communication — cruelty transformed into holy inquiry",
    jacobBlessing: "Let your Thummim and your Urim belong to your faithful servant... He watched over your word and guarded your covenant. — Deuteronomy 33:8-9",
    identity: "Levi began under a curse and ended as the tribe of the priesthood. No inheritance of land — the Most High Himself was their inheritance. The Levites were scattered across 48 cities but their scattering became a blessing — teachers, priests, musicians, and gatekeepers throughout all Israel.",
    notableFigures: "Moses, Aaron, Miriam, Phinehas, Ezra, John the Baptist. The Prophet Gad worked alongside Levitical musicians to establish temple worship (2 Chronicles 29:25).",
    endTimes: "In Revelation 7, Levi replaces Dan among the 144,000 — 12,000 sealed. The priestly tribe stands where the serpent's path once stood."
  },
  {
    name: "Judah", hebrewName: "יְהוּדָה", banner: judahBanner,
    symbol: "Lion",
    symbolMeaning: "Sovereignty, courage, and the authority to rule — the scepter belongs to Judah alone",
    jacobBlessing: "Judah is a lion's whelp... The scepter shall not depart from Judah, nor a lawgiver from between his feet, until Shiloh come; and unto him shall the gathering of the people be. — Genesis 49:9-10",
    identity: "The royal tribe. Judah led the march in the wilderness. Judah was the largest tribe. The southern kingdom bore Judah's name after the division.",
    notableFigures: "Caleb, David, Solomon, Hezekiah, Josiah. The Messiah Himself came through the tribe of Judah — the Lion of the tribe of Judah (Revelation 5:5).",
    endTimes: "Listed first in Revelation 7:5 — not Reuben the firstborn, but Judah the royal tribe. 12,000 sealed. The Lion leads the remnant."
  },
  {
    name: "Dan", hebrewName: "דָּן", banner: danBanner,
    symbol: "Serpent / Eagle",
    symbolMeaning: "Discernment twisted into guile — the tension between gifting used for good or ill",
    jacobBlessing: "Dan shall judge his people, as one of the tribes of Israel. Dan shall be a serpent by the way, an adder in the path... I have waited for your salvation, O Lord. — Genesis 49:16-18",
    identity: "Dan judged Israel — Samson was a Danite judge. The Danites were the first tribe to fall into systematic idolatry, setting up Micah's idol and establishing a false priesthood (Judges 18).",
    notableFigures: "Samson — great gifting, compromised by the flesh. Oholiab, craftsman of the Tabernacle (Exodus 31:6).",
    endTimes: "Absent from the 144,000 in Revelation 7 — replaced by Manasseh. A solemn warning: persistent apostasy forfeits your place in the remnant."
  },
  {
    name: "Naphtali", hebrewName: "נַפְתָּלִי", banner: naphtaliBanner,
    symbol: "Doe / Swift Deer",
    symbolMeaning: "Freedom, eloquence, and swiftness — a tribe that could not be contained",
    jacobBlessing: "Naphtali is a doe let loose; he gives beautiful words. — Genesis 49:21",
    identity: "Naphtali's territory around the Sea of Galilee fulfilled Isaiah's prophecy — the Messiah made His base of ministry in this land. Swift, eloquent, free-spirited, yet fierce fighters when called upon.",
    notableFigures: "Barak the general who defeated Sisera (Judges 4:6). The land of Naphtali became the cradle of the Galilean ministry of the Messiah.",
    endTimes: "Appears in Revelation 7:6 — 12,000 sealed. The doe let loose runs into eternity."
  },
  {
    name: "Gad", hebrewName: "גָּד", banner: gadBanner,
    symbol: "Lion / Armed Warrior",
    symbolMeaning: "A field lion and war lion — ferocity combined with covenant honor",
    jacobBlessing: "Gad, a troop shall overcome him, but he shall overcome at the last. — Genesis 49:19. Moses adds: Gad lives there like a lion, tearing at arm or head... He executed the justice of the Lord. — Deuteronomy 33:20-21",
    identity: "The Gadites were among the fiercest warriors in all Israel. They settled in Gilead east of the Jordan — choosing the best land — but honored their covenant to fight alongside their brothers until the conquest was complete.",
    notableFigures: "The Prophet Gad — David's seer (1 Samuel 22:5, 2 Samuel 24, 1 Chronicles 29:29). He confronted David, delivered judgment, wrote chronicles, and organized temple worship. Elijah the Tishbite came from Gilead — Gad's territory.",
    endTimes: "Appears in Revelation 7:5 — 12,000 sealed. The troop that overcomes at the last. The warrior-prophet tribe sealed for the final conflict."
  },
  {
    name: "Asher", hebrewName: "אָשֵׁר", banner: asherBanner,
    symbol: "Olive Tree / Cup of Oil",
    symbolMeaning: "Anointing, abundance, and healing — the tribe of more than enough",
    jacobBlessing: "Out of Asher his bread shall be fat, and he shall yield royal dainties... let him dip his foot in oil. Your bars shall be iron and bronze, and as your days, so shall your strength be. — Genesis 49:20, Deuteronomy 33:24-25",
    identity: "Asher was the tribe of abundance, oil, and royal provision. Their Mediterranean coastal territory was among the most fertile in the land. Strength proportional to the demand.",
    notableFigures: "Anna the prophetess from Asher recognized the infant Messiah in the Temple (Luke 2:36-38). A woman from the most abundant tribe announced the arrival of the Bread of Life.",
    endTimes: "Appears in Revelation 7:6 — 12,000 sealed. The tribe of royal dainties serves at the table of the eternal kingdom."
  },
  {
    name: "Issachar", hebrewName: "יִשָּׂשכָר", banner: issacharBanner,
    symbol: "Donkey / Sun and Moon",
    symbolMeaning: "Patience, burden-bearing, and understanding of times and seasons",
    jacobBlessing: "Issachar is a strong donkey, crouching between the sheepfolds. He saw that a resting place was good... so he bowed his shoulder to bear, and became a servant at forced labor. — Genesis 49:14-15",
    identity: "The sons of Issachar were 'men who had understanding of the times, to know what Israel ought to do' (1 Chronicles 12:32) — 200 chiefs of discernment. The tribe that bore burdens also bore understanding.",
    notableFigures: "Tola, judge of Israel (Judges 10:1). The 200 chiefs who understood the times — Issachar's greatest prophetic contribution.",
    endTimes: "Appears in Revelation 7:7 — 12,000 sealed. The tribe that knew the times is sealed for the final hour."
  },
  {
    name: "Zebulun", hebrewName: "זְבוּלֻן", banner: zebulunBanner,
    symbol: "Ship / Anchor",
    symbolMeaning: "Commerce, navigation, and the courage to venture into deep waters",
    jacobBlessing: "Zebulun shall dwell at the shore of the sea; he shall become a haven for ships, and his border shall be at Sidon. — Genesis 49:13",
    identity: "Zebulun controlled key trade routes. Warriors of unusual courage — 'a people that jeopardized their lives to the death in the high places of the field' (Judges 5:18). A bridge tribe essential to both land and sea.",
    notableFigures: "Elon the judge (Judges 12:11-12). Zebulun's territory produced the context for the calling of the first disciples on the Sea of Galilee.",
    endTimes: "Appears in Revelation 7:8 — 12,000 sealed. The haven tribe, sealed to shelter the remnant."
  },
  {
    name: "Joseph", hebrewName: "יוֹסֵף", banner: josephBanner,
    symbol: "Fruitful Vine / Bull",
    symbolMeaning: "A vine that cannot be contained — strength and fruitfulness combined",
    jacobBlessing: "Joseph is a fruitful bough, a fruitful bough by a spring; his branches run over the wall... by the God of your father who will help you, by the Almighty who will bless you with blessings of heaven above. — Genesis 49:22-25",
    identity: "Joseph received the double portion — Ephraim and Manasseh each became a full tribe. Joseph's life is the most complete type of the Messiah in Scripture: beloved, rejected, sold, imprisoned, raised to the throne, and the savior of those who betrayed him.",
    notableFigures: "Joshua from Ephraim led Israel into the Promised Land. Gideon from Manasseh (Judges 6:15). Jeroboam who divided the kingdom was an Ephraimite.",
    endTimes: "Manasseh appears in Revelation 7 with 12,000 sealed. Joseph is listed separately with 12,000. Ephraim is absent — associated with golden calf worship."
  },
  {
    name: "Benjamin", hebrewName: "בִּנְיָמִין", banner: benjaminBanner,
    symbol: "Wolf / Arrow",
    symbolMeaning: "Fierce loyalty, precision, and resilience — nearly destroyed yet restored",
    jacobBlessing: "Benjamin is a ravenous wolf; in the morning he devours the prey, and at evening he divides the spoil. — Genesis 49:27",
    identity: "The last born and most fiercely loved — Rachel died giving him birth. Benjamin's warriors were elite left-handed slingers who could hit a hair's breadth target without missing. Nearly annihilated in the civil war of Gibeah, then miraculously restored.",
    notableFigures: "King Saul — Israel's first king (1 Samuel 9:1-2). The Apostle Paul — 'of the tribe of Benjamin' (Philippians 3:5). Mordecai and Esther — deliverers of the Jewish people in Persia.",
    endTimes: "Appears last in Revelation 7:8 — 12,000 sealed. The last born, nearly destroyed, miraculously preserved — sealed among the firstfruits of the final harvest."
  },
];

export const TribesGallery = () => {
  const [expandedTribe, setExpandedTribe] = useState<string | null>(null);

  const toggleTribe = (name: string) => {
    setExpandedTribe(expandedTribe === name ? null : name);
  };

  return (
    <div className="space-y-8">
      {/* Gallery Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-sanctuary-gold/40" />
          <Crown className="w-6 h-6 text-sanctuary-gold" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-sanctuary-gold/40" />
        </div>
        
        <h2 className="font-display text-2xl text-sanctuary-gold font-bold tracking-[0.2em]">
          THE TWELVE TRIBES OF ISRAEL
        </h2>
        
        <p className="font-terminal text-xs text-white/50 tracking-widest">
          A PROPHETIC DOSSIER • FROM JACOB'S DEATHBED TO REVELATION 7
        </p>
      </div>

      {/* Free Ebook Download */}
      <div className="flex justify-center">
        <a
          href="/downloads/twelve-tribes-of-israel.pdf"
          download="The_Twelve_Tribes_of_Israel_-_Prophet_Gad.pdf"
          className="group flex items-center gap-3 px-6 py-3 rounded border border-sanctuary-gold/30 bg-sanctuary-gold/5 hover:bg-sanctuary-gold/10 hover:border-sanctuary-gold/60 transition-all duration-300"
        >
          <Download className="w-5 h-5 text-sanctuary-gold group-hover:animate-bounce" />
          <div className="text-left">
            <p className="font-display text-sm text-sanctuary-gold font-bold tracking-wider">
              FREE EBOOK DOWNLOAD
            </p>
            <p className="font-terminal text-[10px] text-white/40">
              Prophet Gad · Thread Bear Music · Remnant Seed LLC
            </p>
          </div>
          <BookOpen className="w-4 h-4 text-sanctuary-gold/50" />
        </a>
      </div>

      {/* Tribes Grid — Dark Intelligence Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {tribes.map((tribe) => {
          const isExpanded = expandedTribe === tribe.name;
          return (
            <button
              key={tribe.name}
              onClick={() => toggleTribe(tribe.name)}
              className={`group relative overflow-hidden rounded border text-left transition-all duration-300 ${
                isExpanded
                  ? "border-sanctuary-gold/60 ring-1 ring-sanctuary-gold/30"
                  : "border-white/10 hover:border-sanctuary-gold/40"
              }`}
              style={{ background: "hsl(270 30% 6%)" }}
            >
              {/* Banner Image */}
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={tribe.banner}
                  alt={`${tribe.name} tribal banner`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ filter: "brightness(0.7) contrast(1.1) saturate(0.9)" }}
                />
                {/* Dark vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
                
                {/* Tribe name overlay */}
                <div className="absolute bottom-0 inset-x-0 p-2 text-center">
                  <p className="font-ceremonial text-base text-white/80 font-bold">
                    {tribe.hebrewName}
                  </p>
                </div>
              </div>
              
              {/* Card Footer */}
              <div className="p-2 text-center border-t border-white/5 flex items-center justify-center gap-1.5"
                style={{ background: "hsl(270 30% 8%)" }}
              >
                <p className="font-display text-[11px] text-sanctuary-gold font-bold tracking-[0.15em]">
                  {tribe.name.toUpperCase()}
                </p>
                <ChevronDown className={`w-3 h-3 text-sanctuary-gold/50 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded Dossier Panel */}
      {expandedTribe && (() => {
        const tribe = tribes.find(t => t.name === expandedTribe);
        if (!tribe) return null;
        return (
          <div
            className="rounded-lg border border-sanctuary-gold/20 overflow-hidden"
            style={{ background: "linear-gradient(180deg, hsl(270 30% 7%) 0%, hsl(270 20% 5%) 100%)" }}
          >
            {/* Dossier Header */}
            <div className="flex items-start gap-4 p-5 border-b border-white/5"
              style={{ background: "linear-gradient(135deg, hsl(270 30% 8%) 0%, hsl(0 0% 0% / 0.3) 100%)" }}
            >
              <img
                src={tribe.banner}
                alt={tribe.name}
                className="w-20 h-28 object-cover rounded border border-sanctuary-gold/30 flex-shrink-0"
                style={{ filter: "brightness(0.85) contrast(1.1)" }}
              />
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(0 70% 50%)" }} />
                  <p className="font-terminal text-[10px] tracking-[0.3em] uppercase" style={{ color: "hsl(0 70% 50%)" }}>
                    TRIBAL DOSSIER
                  </p>
                </div>
                <h3 className="font-display text-2xl text-sanctuary-gold font-bold tracking-[0.15em]">
                  {tribe.name.toUpperCase()}
                </h3>
                <p className="font-ceremonial text-xl text-white/60">{tribe.hebrewName}</p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="font-terminal text-[10px] tracking-widest uppercase" style={{ color: "hsl(0 70% 50%)" }}>
                    SYMBOL:
                  </span>
                  <span className="font-terminal text-xs text-white/70 tracking-wider">
                    {tribe.symbol}
                  </span>
                </div>
                <p className="font-terminal text-[10px] text-white/30 italic">
                  {tribe.symbolMeaning}
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setExpandedTribe(null); }}
                className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-sanctuary-gold/40 transition-colors"
              >
                <X className="w-4 h-4 text-white/40" />
              </button>
            </div>

            {/* Dossier Body — 4 Sections */}
            <div className="p-5 space-y-5">
              {/* Jacob's Blessing */}
              <div className="space-y-2">
                <p className="font-display text-[11px] tracking-[0.25em] font-bold" style={{ color: "hsl(0 70% 50%)" }}>
                  JACOB'S BLESSING
                </p>
                <div className="pl-3 border-l-2 border-sanctuary-gold/30">
                  <p className="font-serif text-sm text-sanctuary-gold italic leading-relaxed">
                    {tribe.jacobBlessing}
                  </p>
                </div>
              </div>

              {/* Who They Were */}
              <div className="space-y-2">
                <p className="font-display text-[11px] tracking-[0.25em] font-bold" style={{ color: "hsl(0 70% 50%)" }}>
                  WHO THEY WERE
                </p>
                <p className="font-serif text-sm text-white/75 leading-relaxed">
                  {tribe.identity}
                </p>
              </div>

              {/* Notable Figures */}
              <div className="space-y-2">
                <p className="font-display text-[11px] tracking-[0.25em] font-bold" style={{ color: "hsl(0 70% 50%)" }}>
                  NOTABLE FIGURES
                </p>
                <p className="font-serif text-sm text-white/75 leading-relaxed">
                  {tribe.notableFigures}
                </p>
              </div>

              {/* Sealed in Revelation 7 */}
              <div className="space-y-2">
                <p className="font-display text-[11px] tracking-[0.25em] font-bold" style={{ color: "hsl(0 70% 50%)" }}>
                  SEALED IN REVELATION 7
                </p>
                <p className="font-serif text-sm text-white/75 leading-relaxed">
                  {tribe.endTimes}
                </p>
              </div>
            </div>

            {/* Dossier Footer */}
            <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between"
              style={{ background: "hsl(270 30% 5%)" }}
            >
              <p className="font-terminal text-[9px] text-white/20 tracking-widest">
                PROPHETIC INTELLIGENCE FILE — {tribe.name.toUpperCase()}
              </p>
              <p className="font-terminal text-[9px] text-sanctuary-gold/30 tracking-widest">
                CLASSIFIED
              </p>
            </div>
          </div>
        );
      })()}

      {/* Footer */}
      <div className="text-center pt-4 border-t border-white/5">
        <p className="font-terminal text-[10px] text-white/30 tracking-widest">
          GENESIS 49 • DEUTERONOMY 33 • REVELATION 7 • THE CAMP FORMATION
        </p>
      </div>
    </div>
  );
};
