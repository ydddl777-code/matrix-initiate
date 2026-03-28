import { ShoppingCart, Music } from "lucide-react";
import { extendedPlaySongs } from "./songData";

export const ExtendedPlayList = () => {
  return (
    <section className="py-10">
      <div className="mb-2">
        <p
          className="font-terminal text-xs tracking-widest uppercase"
          style={{ color: "hsl(45 60% 50% / 0.7)" }}
        >
          New Releases
        </p>
      </div>
      <h2
        className="font-ceremonial text-2xl md:text-3xl tracking-wider mb-6"
        style={{ color: "hsl(0 70% 50%)" }}
      >
        Extended Play
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {extendedPlaySongs.map((song) => (
          <div
            key={song.id}
            className="flex items-center gap-4 p-3 rounded-lg border transition-all duration-300 hover:border-red-700/50 hover:shadow-[0_0_12px_hsl(0,70%,50%,0.15)]"
            style={{
              background: "hsl(20 12% 14%)",
              borderColor: "hsl(0 50% 35% / 0.2)",
            }}
          >
            {/* Cover Art or Music Icon */}
            <div
              className="w-14 h-14 md:w-16 md:h-16 rounded overflow-hidden flex-shrink-0 flex items-center justify-center"
              style={{
                background: "hsl(0 30% 18%)",
              }}
            >
              {song.coverUrl ? (
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Music className="w-6 h-6" style={{ color: "hsl(0 70% 50% / 0.4)" }} />
              )}
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <h3
                className="font-ceremonial text-sm md:text-base truncate"
                style={{ color: "hsl(45 80% 60%)" }}
              >
                {song.title}
              </h3>
              <p
                className="font-terminal text-[10px] tracking-wider"
                style={{ color: "hsl(30 20% 55%)" }}
              >
                {song.artist}
              </p>
            </div>

            {/* Buy Button */}
            <a
              href={song.squareCheckoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded font-terminal text-[10px] uppercase tracking-wider transition-all duration-300 hover:brightness-125 flex-shrink-0"
              style={{
                background: "hsl(0 70% 40%)",
                color: "hsl(0 0% 95%)",
              }}
            >
              <ShoppingCart className="w-3 h-3" />
              Buy Full Song
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
