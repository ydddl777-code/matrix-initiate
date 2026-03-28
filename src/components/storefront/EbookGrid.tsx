import { ShoppingCart, Download } from "lucide-react";
import { ebooks } from "./ebookData";

export const EbookGrid = () => {
  return (
    <section className="py-10">
      <div className="mb-6">
        <h2
          className="font-ceremonial text-2xl md:text-3xl tracking-wider"
          style={{ color: "hsl(0 70% 50%)" }}
        >
          Remnant Warning E-Books
        </h2>
        <p
          className="font-terminal text-xs tracking-widest mt-1 uppercase"
          style={{ color: "hsl(45 60% 50% / 0.7)" }}
        >
          Instant Download
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {ebooks.map((book) => (
          <div
            key={book.id}
            className="group relative rounded-lg overflow-hidden border transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_hsl(0,70%,50%,0.2)]"
            style={{
              background: "linear-gradient(180deg, hsl(20 15% 16%) 0%, hsl(15 10% 10%) 100%)",
              borderColor: "hsl(0 50% 35% / 0.3)",
            }}
          >
            {/* Price Badge */}
            <div
              className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded font-terminal text-xs font-bold"
              style={{
                background: book.isFree
                  ? "hsl(120 60% 35%)"
                  : "hsl(0 70% 45%)",
                color: "hsl(0 0% 95%)",
              }}
            >
              {book.price}
            </div>

            {/* Cover Image Area */}
            <div
              className="aspect-[3/4] flex flex-col items-center justify-center p-3 text-center"
              style={{
                background: "linear-gradient(135deg, hsl(0 40% 20%) 0%, hsl(15 20% 12%) 100%)",
              }}
            >
              <p
                className="font-terminal text-[9px] tracking-widest uppercase mb-1"
                style={{ color: "hsl(45 60% 55% / 0.6)" }}
              >
                {book.series}
              </p>
              <p
                className="font-terminal text-[8px] tracking-wider uppercase mb-2"
                style={{ color: "hsl(0 50% 50% / 0.7)" }}
              >
                {book.volume}
              </p>
              <h3
                className="font-ceremonial text-sm md:text-base leading-tight mb-1"
                style={{ color: "hsl(45 80% 60%)" }}
              >
                {book.subtitle}
              </h3>
              {book.badge && (
                <span
                  className="inline-block mt-2 px-2 py-0.5 rounded font-terminal text-[8px] tracking-wider uppercase"
                  style={{
                    background: "hsl(0 70% 45% / 0.2)",
                    color: "hsl(0 70% 55%)",
                    border: "1px solid hsl(0 70% 45% / 0.3)",
                  }}
                >
                  {book.badge}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="p-3">
              <p
                className="font-terminal text-[10px] tracking-wider mb-2 line-clamp-2"
                style={{ color: "hsl(30 20% 60%)" }}
              >
                {book.description}
              </p>

              <a
                href={book.squareCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 w-full py-2 rounded font-terminal text-[10px] uppercase tracking-wider transition-all duration-300 hover:brightness-125"
                style={{
                  background: book.isFree
                    ? "hsl(120 50% 30%)"
                    : "hsl(0 70% 40%)",
                  color: "hsl(0 0% 95%)",
                }}
              >
                {book.isFree ? (
                  <>
                    <Download className="w-3 h-3" />
                    Free Download
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-3 h-3" />
                    Buy Now
                  </>
                )}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
