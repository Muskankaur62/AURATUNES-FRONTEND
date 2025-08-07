import { motion } from "framer-motion";
import { ChevronDown, Cpu, Music, Headphones, Eye } from "lucide-react";
import { useState } from "react";

const Feature_5 = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqs = [
    {
      question: "how is music recommended by detecting emotions?",
      answer: "Music is recommended by analyzing facial expressions using computer vision and deep learning to detect the user's current emotion. Based on the detected emotion, the system suggests songs with matching mood to enhance or balance the user's emotional state.",
      icon: <Cpu className="h-5 w-5" />
    },
    {
      question: "What music platforms do you support?",
      answer: "Currently integrated with Spotify and YouTube Music, with more platforms coming soon",
      icon: <Headphones className="h-5 w-5" />
    },
    {
      question: "Is my biometric data stored or my image?",
      answer: "No. All emotion detection happens locally on your device, ensuring complete privacy and zero data retention",
      icon: <Eye className="h-5 w-5" />
    },
    {
      question: "What makes Aura Tunes different from other music apps?",
      answer: "Unlike traditional apps, Aura Tunes curates songs by sensing your feelings—not just your listening history, but through real-time emotion-based music recommendations.",
      icon: <Music className="h-5 w-5" />
    }
  ];

  // Music notes configuration
  const notes = Array(15).fill(0).map((_, i) => ({
    id: i,
    size: Math.random() * 24 + 16,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 5,
    opacity: Math.random() * 0.3 + 0.1,
    rotation: Math.random() * 60 - 30 // Random rotation between -30 and 30 degrees
  }));

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900">
      
      {/* Floating Music Notes Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {notes.map((note) => (
          <motion.div
            key={note.id}
            className="absolute text-cyan-400/20"
            style={{
              fontSize: `${note.size}px`,
              left: `${note.x}%`,
              top: `${note.y}%`,
              opacity: note.opacity,
              rotate: `${note.rotation}deg`
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, 20, -20, 0],
              opacity: [note.opacity, note.opacity * 1.5, note.opacity]
            }}
            transition={{
              duration: note.duration,
              delay: note.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ♫
          </motion.div>
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
            <Music className="h-5 w-5 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400">
              Technology and Transparency
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-5">
            Tech Behind the Tunes
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            "All the details you need about how Aura Tunes works with your emotions!"
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 shadow-lg"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full text-left p-7 flex items-start gap-5"
              >
                {/* Animated Icon */}
                <motion.div
                  animate={{ 
                    rotate: activeIndex === index ? [0, 10, -10, 0] : 0,
                    scale: activeIndex === index ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 0.5 }}
                  className="p-2.5 bg-cyan-500/10 rounded-lg mt-0.5"
                >
                  {faq.icon}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-100 mb-3">
                    {faq.question}
                  </h3>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      height: activeIndex === index ? 'auto' : 0
                    }}
                    className="text-gray-400 pr-8 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                </div>

                <ChevronDown className={`h-5 w-5 text-cyan-400 transition-transform ${
                  activeIndex === index ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Hover Effect Wave */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                initial={{ width: '0%' }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Floating AURA TUNES Text */}
        <motion.div
          className="absolute right-20 bottom-20 opacity-10 pointer-events-none"
          animate={{
            y: [0, -15, 0],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{
            duration: 7,
            repeat: Infinity
          }}
        >
          <span className="text-[120px] font-bold bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent">
            AURA TUNES
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_5;

