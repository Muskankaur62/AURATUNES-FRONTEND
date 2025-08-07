import { motion } from "framer-motion";
import { Heart, User, Music, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Feature_4 = () => {
  const navigate = useNavigate();
  const testimonials = [
    {
      id: 1,
      name: "Arjun Mehta",
      role: "Software Engineer",
      text: "The interface is clean and vibrant, and the AI emotion detection is surprisingly accurate. I love how intuitive it feels to use. Aura Tunes makes me feel seen and heard—through music!",
      rating: 5,
    },
    {
      id: 2,
      name: "Riya Malhotra",
      role: "UX Designer",
      text: "Aura Tunes really gets me! The music it recommends perfectly matches my mood—whether I'm happy, stressed, or just chilling. It's like having a personal DJ who understands me emotionally!",
      rating: 5,
    },
    {
      id: 3,
      name: "Anya Verma",
      role: "Digital Wellness Coach",
      text: "I was skeptical at first, but Aura Tunes blew me away. After a long day, it recommended songs that truly matched my vibe. The emotional connection through music is magical!",
      rating: 4,
    },
  ];

  const handleFeedbackClick = () => {
    navigate('/feedback'); // Navigate to feedback page
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900">
      {/* Sound Wave Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMjAiPjxwYXRoIGQ9Ik0wIDEwIEMxMCAxNSAyMCA1IDMwIDEwIEM0MCAxNSA1MCA1IDYwIDEwIEM3MCAxNSA4MCA1IDkwIDEwIEMxMDAgMTUgMTAwIDEwIDEwMCAxMCIgc3Ryb2tlPSJyZ2JhKDM0LDIxMSwyMzgsMC4xKSIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+PC9zdmc+')] bg-[size:100px_20px]" />
      </div>
      

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 bg-cyan-500/10 px-6 py-2.5 rounded-xl border border-cyan-500/30 mb-8">
            <Volume2 className="h-5 w-5 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400">
            Sound of Satisfaction
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-5">
              "Your Feedback, Our Sound"
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          "Every review, every suggestion—hear how your feedback makes Aura Tunes better every day."
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 shadow-lg"
            >
              {/* Sound Wave Icon */}
              <Music className="absolute top-6 right-6 h-8 w-8 text-cyan-500/20" />

              {/* User Avatar */}
              <motion.div
                className="mb-5 p-1 rounded-full w-max bg-gradient-to-br from-cyan-500 to-teal-600"
                whileHover={{ rotate: 15 }}
              >
                <div className="p-3 bg-slate-800 rounded-full">
                  <User className="h-8 w-8 text-cyan-400" />
                </div>
              </motion.div>

              {/* Rating Discs */}
              <div className="flex gap-2 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    className="text-cyan-400"
                  >
                    <Heart className="h-5 w-5" />
                  </motion.div>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 mb-6 leading-relaxed italic">"{testimonial.text}"</p>

              {/* User Info */}
              <div className="border-t border-cyan-500/30 pt-5">
                <h3 className="font-semibold text-gray-100">{testimonial.name}</h3>
                <p className="text-sm text-cyan-400">{testimonial.role}</p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
              4.8/5
            </div>
            <div className="text-gray-400">Audio Precision Score</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-3">
              3K+
            </div>
            <div className="text-gray-400">Active Listeners</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-3">
              97%
            </div>
            <div className="text-gray-400">Satisfaction Rate</div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.button
            onClick={handleFeedbackClick}
            whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(34, 211, 238, 0.2)" }}
            className="flex items-center gap-3 bg-gradient-to-br from-cyan-500 to-teal-600 text-white px-8 py-3.5 rounded-xl text-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 mx-auto border border-cyan-400/30"
          >
            <User className="h-5 w-5" />
            Join the Sound Revolution
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_4;