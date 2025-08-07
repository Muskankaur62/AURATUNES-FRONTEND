import { motion, useScroll, useTransform } from "framer-motion";
import { Music } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link

const Feature_1 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"], { damping: 15 });
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"], { damping: 15 });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 10]);

  const badgeVariants = {
    hover: {
      background: [
        'linear-gradient(45deg, rgba(34,211,238,0.1) 0%, rgba(20,184,166,0.1) 100%)',
        'linear-gradient(45deg, rgba(20,184,166,0.1) 0%, rgba(34,211,238,0.1) 100%)'
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'reverse'
      }
    },
    tap: {
      scale: 0.95,
      background: 'linear-gradient(45deg, rgba(34,211,238,0.2) 0%, rgba(20,184,166,0.2) 100%)'
    }
  };

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900">
      {/* Animated Water Background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(34,211,238,0.05) 0%, rgba(20,184,166,0.05) 100%)',
            'linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(6,182,212,0.05) 100%)',
            'linear-gradient(225deg, rgba(34,211,238,0.05) 0%, rgba(20,184,166,0.05) 100%)'
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />

      {/* Floating Bubbles */}
      <div className="absolute inset-0 z-10">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -20, 0],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 0.9, 0.4]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Description with Parallax */}
          <motion.div 
            style={{ y: y1 }}
            className="space-y-8"
          >
            <motion.div 
              className="inline-flex items-center gap-3 bg-cyan-500/10 px-6 py-2.5 rounded-xl border border-cyan-500/30 relative overflow-hidden"
              variants={badgeVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <Music className="h-5 w-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-400 relative">
              Mood-Based Music Intelligence
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
            "Music That Feels You — Algorithmically and Emotionally."
            </h2>

            <motion.p 
              className="text-lg text-gray-300 leading-relaxed"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -20 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              "Aura Tunes — where your emotions become the music."
              Step into a new dimension of sound with our AI-powered platform that reads your mood, your vibe, your emotion.
              Using real-time facial expression analysis powered by computer vision and machine learning
              algorithms, Aura Tunes understands your emotion and curates the perfect tracks to match. 
              It’s not just music — it’s your emotional soundtrack.
            </motion.p>

            {/* ✅ Updated Button with Link */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link to="/recommendation">
                <button className="flex items-center gap-3 bg-gradient-to-br from-cyan-500 to-teal-600 text-white px-8 py-3.5 rounded-xl text-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity
                    }}
                  />
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform">Discover Soundscapes</span>
                  <Music className="h-5 w-5 relative z-10 group-hover:animate-pulse" />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Project Name with Parallax */}
          <motion.div 
            style={{ y: y2, rotateX }}
            className="relative flex items-center justify-center h-full min-h-[400px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-3xl backdrop-blur-xl border border-cyan-500/30" />
            
            <motion.div 
              className="relative z-10 text-center"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                AURA TUNES
              </div>
              <div className="mt-4 text-lg text-cyan-300 font-medium">
              The Soundtrack of Your Emotions
              </div>
            </motion.div>

            <motion.div 
              className="absolute inset-0 rounded-3xl border-2 border-cyan-500/30"
              animate={{
                borderColor: [
                  'rgba(34,211,238,0.3)',
                  'rgba(20,184,166,0.3)',
                  'rgba(34,211,238,0.3)'
                ],
                boxShadow: [
                  '0 0 20px rgba(34,211,238,0.1)',
                  '0 0 30px rgba(20,184,166,0.1)',
                  '0 0 20px rgba(34,211,238,0.1)'
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Feature_1;





