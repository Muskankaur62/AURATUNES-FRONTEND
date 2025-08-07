export default function CommunityHero() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-6 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Subtle floating music notes */}
      <div className="absolute inset-0 opacity-10">
        {['♪', '♫', '♩', '♬'].map((note, i) => (
          <div 
            key={i}
            className="absolute text-cyan-400 animate-float"
            style={{
              fontSize: `${Math.random() * 24 + 16}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {note}
          </div>
        ))}
      </div>

      {/* Content container with dark background box */}
      <div className="max-w-5xl text-center relative z-10">
        <div className="bg-black/40 border border-gray-700 rounded-xl p-10">
          <h1 className="text-5xl font-bold text-cyan-400 mb-6">
            Welcome to the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Aura Tunes
            </span>{' '}
            Community
          </h1>
          <p className="text-xl text-gray-200 mb-4 max-w-3xl mx-auto leading-relaxed">
            Aura Tunes is a place where music syncs with your emotions, feelings and thoughts.
            Join our vibrant music community! Connect with artists, share your tracks,
            and collaborate with fellow music creators.   
          </p>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float { animation: float linear infinite; }
      `}</style>
    </section>
  );
}
