export const BackgroundEffects = () => {
  return (
    <>
      {/* Base gradient */}
      <div 
        className="fixed inset-0 -z-30"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, hsl(280 60% 8%) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, hsl(260 50% 6%) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsl(270 40% 5%) 0%, hsl(270 50% 3%) 100%)
          `,
        }}
      />
      
      {/* Fog overlay */}
      <div 
        className="fixed inset-0 -z-20 fog-overlay opacity-60"
      />
      
      {/* Grid pattern */}
      <div 
        className="fixed inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Vignette */}
      <div 
        className="fixed inset-0 -z-5 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(270 50% 3% / 0.8) 100%)',
        }}
      />
      
      {/* Ambient particles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
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
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }
      `}</style>
    </>
  );
};
