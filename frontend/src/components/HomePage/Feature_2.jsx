import { motion } from "framer-motion";
import { Brain, Music, Headphones, Users, Sparkles, HeartPulse, Disc3 } from "lucide-react";

const Feature_2 = () => {
  const reasons = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Emotion-AI Engine",
      description: "Analyze facial expressions to understand and adapt to your emotions in real-time."
    },
    {
      icon: <Music className="h-8 w-8" />,
      title: "Mood-Based Music",
      description: "Get song recommendations that resonate with your current mood and vibe."
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Personalized Listening",
      description: "Curated tracks tailored uniquely for each user based on mood history."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Vibes",
      description: "Join thousands of users sharing emotional playlists and discovering together."
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "AI-Powered Discovery",
      description: "Explore new genres and artists through intelligent emotional mapping."
    },
    {
      icon: <HeartPulse className="h-8 w-8" />,
      title: "Wellness & Music",
      description: "Boost your mental well-being with carefully tuned sonic therapy sessions."
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900">
      {/* Animated Bubbles */}
      <div className="absolute inset-0 z-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 0.9, 0.4],
              x: Math.random() * 80 - 40,
              y: Math.random() * 80 - 40
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 bg-cyan-500/10 px-6 py-2.5 rounded-xl border border-cyan-500/30 mb-8">
            <Disc3 className="h-5 w-5 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400">
              Aura Tunes AI
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-5">
            Why Aura Tunes is Different?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            An intelligent platform that reads emotions and plays music to uplift, relax, and inspire.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 shadow-lg"
            >
              {/* Water Ripple Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <motion.div
                  className="mb-5 text-cyan-400 p-3.5 bg-cyan-500/10 rounded-xl w-max"
                  whileHover={{ rotate: 15 }}
                >
                  {reason.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {reason.description}
                </p>
              </div>

              {/* Animated Water Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-cyan-500/20 pointer-events-none"
                animate={{
                  borderColor: [
                    'rgba(34,211,238,0.2)',
                    'rgba(20,184,166,0.2)',
                    'rgba(34,211,238,0.2)'
                  ],
                  boxShadow: [
                    '0 0 15px rgba(34,211,238,0.05)',
                    '0 0 25px rgba(20,184,166,0.05)',
                    '0 0 15px rgba(34,211,238,0.05)'
                  ]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mt-20 border-t border-cyan-500/30 pt-20"
        >
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-3">
              98%
            </div>
            <div className="text-gray-400">Mood Detection Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-3">
              12K+
            </div>
            <div className="text-gray-400">Active Users Worldwide</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-3">
              24/7
            </div>
            <div className="text-gray-400">Emotion-Based Suggestions</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_2;

