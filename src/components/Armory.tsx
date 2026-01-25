import { useState } from "react";
import { Music, BookOpen, AlertTriangle, Plus, Check } from "lucide-react";

interface Product {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  upsell?: {
    title: string;
    price: number;
  };
  badge?: string;
}

interface ArmoryProps {
  onPurchase?: (productId: string, withUpsell?: boolean) => void;
}

export const Armory = ({ onPurchase }: ArmoryProps) => {
  const [selectedUpsells, setSelectedUpsells] = useState<Set<string>>(new Set());

  const products: Product[] = [
    {
      id: "unsealed-book",
      category: "THE ANTHEMS",
      title: "The Unsealed Book",
      subtitle: "Dub/Steppers Mix",
      description: "5-Minute Warning Signal. Roots Reggae/Dub. Bass frequencies calibrated for spiritual warfare.",
      price: 5.00,
      icon: <Music className="w-8 h-8" />,
      upsell: {
        title: "The Decoded Intel (Lyrical Breakdown Podcast)",
        price: 5.00,
      },
      badge: "SIGNAL",
    },
    {
      id: "field-manual",
      category: "THE FIELD MANUAL",
      title: "No False Wisdom for the Israelites",
      description: "Survival Guide for the Remnant. Debt, Education, and Labor. Tactical doctrine for economic warfare.",
      price: 15.00,
      icon: (
        <div className="relative">
          <BookOpen className="w-8 h-8" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-3 h-3 text-white" />
          </div>
        </div>
      ),
      badge: "INTEL",
    },
  ];

  const toggleUpsell = (productId: string) => {
    setSelectedUpsells(prev => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const getTotal = (product: Product) => {
    let total = product.price;
    if (product.upsell && selectedUpsells.has(product.id)) {
      total += product.upsell.price;
    }
    return total;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-display text-2xl text-sanctuary-primary font-bold tracking-wider">
          THE ARMORY
        </h2>
        <p className="font-terminal text-xs text-sanctuary-muted mt-2">
          TACTICAL SUPPLY • REMNANT EXCLUSIVE
        </p>
        <div className="flex items-center justify-center gap-4 mt-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-sanctuary-primary/30" />
          <span className="font-terminal text-xs text-sanctuary-gold">ENCRYPTED DELIVERY</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-sanctuary-primary/30" />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-white border-2 border-sanctuary-primary/20 hover:border-sanctuary-primary/40 transition-all group"
          >
            {/* Badge */}
            {product.badge && (
              <div className="absolute -top-3 left-4 px-3 py-1 bg-sanctuary-primary text-white font-terminal text-xs tracking-wider">
                {product.badge}
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {/* Category */}
              <p className="font-terminal text-xs text-sanctuary-gold tracking-widest mb-3">
                {product.category}
              </p>

              {/* Icon and Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-sanctuary-primary/5 border border-sanctuary-primary/20 text-sanctuary-primary">
                  {product.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg text-sanctuary-text font-bold leading-tight">
                    {product.title}
                  </h3>
                  {product.subtitle && (
                    <p className="font-terminal text-xs text-sanctuary-muted mt-1">
                      {product.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="font-terminal text-sm text-sanctuary-muted leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Upsell Option */}
              {product.upsell && (
                <button
                  onClick={() => toggleUpsell(product.id)}
                  className={`w-full p-3 border-2 border-dashed flex items-center gap-3 transition-all mb-4 ${
                    selectedUpsells.has(product.id)
                      ? "border-sanctuary-gold bg-sanctuary-gold/10"
                      : "border-sanctuary-primary/20 hover:border-sanctuary-primary/40"
                  }`}
                >
                  <div className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${
                    selectedUpsells.has(product.id)
                      ? "border-sanctuary-gold bg-sanctuary-gold"
                      : "border-sanctuary-primary/30"
                  }`}>
                    {selectedUpsells.has(product.id) ? (
                      <Check className="w-3 h-3 text-white" />
                    ) : (
                      <Plus className="w-3 h-3 text-sanctuary-primary/50" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-terminal text-xs text-sanctuary-text">
                      {product.upsell.title}
                    </p>
                  </div>
                  <span className="font-display text-sm text-sanctuary-gold font-bold">
                    +${product.upsell.price.toFixed(2)}
                  </span>
                </button>
              )}

              {/* Price and CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-sanctuary-primary/10">
                <div>
                  <span className="font-terminal text-xs text-sanctuary-muted">TOTAL</span>
                  <p className="font-display text-2xl text-sanctuary-primary font-bold">
                    ${getTotal(product).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => onPurchase?.(product.id, selectedUpsells.has(product.id))}
                  className="px-6 py-3 bg-sanctuary-primary text-white font-display text-sm uppercase tracking-widest hover:bg-sanctuary-primary/90 transition-all"
                >
                  ACQUIRE
                </button>
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-sanctuary-primary/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-sanctuary-primary/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-sanctuary-primary/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-sanctuary-primary/40" />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center pt-4">
        <p className="font-terminal text-xs text-sanctuary-muted">
          ALL TRANSACTIONS ENCRYPTED • REMNANT VERIFIED
        </p>
      </div>
    </div>
  );
};
