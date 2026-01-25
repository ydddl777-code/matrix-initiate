export const BackgroundEffects = () => {
  return (
    <>
      {/* Base clinical gradient - bright white/silver */}
      <div 
        className="fixed inset-0 -z-30"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, hsl(45 80% 95%) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, hsl(270 30% 95%) 0%, transparent 50%),
            linear-gradient(180deg, hsl(240 20% 98%) 0%, hsl(240 15% 96%) 50%, hsl(240 20% 98%) 100%)
          `,
        }}
      />
      
      {/* Subtle light overlay */}
      <div 
        className="fixed inset-0 -z-20 light-overlay opacity-60"
      />
      
      {/* Grid pattern - royal purple lines */}
      <div 
        className="fixed inset-0 -z-10 clinical-grid"
      />
      
      {/* Soft radial highlight - center illumination */}
      <div 
        className="fixed inset-0 -z-5 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(0 0% 100% / 0.6) 0%, transparent 70%)',
        }}
      />
      
      {/* Ambient light particles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 
                ? 'hsl(45 90% 60% / 0.3)' 
                : 'hsl(270 70% 60% / 0.2)',
              animation: `float ${8 + Math.random() * 12}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-30px) translateX(15px);
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  );
};
