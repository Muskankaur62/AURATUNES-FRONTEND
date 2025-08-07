import { motion } from "framer-motion";
import {
  Headphones,
  Mail,
  User,
  MessageSquare,
  Send,
  Twitter,
  Github,
  Linkedin
} from "lucide-react";
import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const floatingVariants = {
    float: {
      x: [0, -15, 15, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900">
      {/* Animated Sound Waves */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
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
              y: [0, -10, 0]
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
            <Headphones className="h-5 w-5 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400">
              Sound Support
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-5">
            Tune Into Our Frequency
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have questions about our audio technology? Our sound engineers are ready to assist you
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative p-10 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-cyan-500/30 shadow-xl"
          >
            <motion.div
              className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full blur-xl opacity-15"
              variants={floatingVariants}
              animate="float"
            />
            <motion.div
              className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-xl opacity-15"
              variants={floatingVariants}
              animate="float"
            />

            <form className="space-y-7">
              <div>
                <label className="flex items-center gap-3 text-gray-300 mb-3">
                  <User className="h-5 w-5 text-cyan-400" />
                  <span className="font-medium">Your Name</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(34, 211, 238, 0.3)" }}
                  type="text"
                  className="w-full bg-slate-800/50 border border-cyan-500/30 rounded-xl px-5 py-3.5 text-gray-300 focus:outline-none focus:border-cyan-500 placeholder-gray-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="flex items-center gap-3 text-gray-300 mb-3">
                  <Mail className="h-5 w-5 text-cyan-400" />
                  <span className="font-medium">Email Address</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(34, 211, 238, 0.3)" }}
                  type="email"
                  className="w-full bg-slate-800/50 border border-cyan-500/30 rounded-xl px-5 py-3.5 text-gray-300 focus:outline-none focus:border-cyan-500 placeholder-gray-500"
                  placeholder="hello@auratunes.com"
                />
              </div>

              <div>
                <label className="flex items-center gap-3 text-gray-300 mb-3">
                  <MessageSquare className="h-5 w-5 text-cyan-400" />
                  <span className="font-medium">Your Message</span>
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(34, 211, 238, 0.3)" }}
                  rows="5"
                  className="w-full bg-slate-800/50 border border-cyan-500/30 rounded-xl px-5 py-3.5 text-gray-300 focus:outline-none focus:border-cyan-500 placeholder-gray-500"
                  placeholder="Describe your audio inquiry..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 5px 15px rgba(34, 211, 238, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-br from-cyan-500 to-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 border border-cyan-400/30"
              >
                <Send className="h-5 w-5" />
                Transmit Message
              </motion.button>
            </form>
          </motion.div>

          {/* Additional Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="p-10 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-cyan-500/30 shadow-xl">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-5">
                Join Our Sonic Network
              </h3>
              <p className="text-gray-300 mb-7 leading-relaxed">
                Whether you're looking to collaborate on audio research, provide feedback on our technology, 
                or discuss the future of biometric sound - let's create harmonious solutions together!
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-5 text-gray-300 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
                  <Mail className="h-6 w-6 text-cyan-400" />
                  <span>contact@auratunes.com</span>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="grid grid-cols-3 gap-4">
              <motion.a
                whileHover={{ y: -5, backgroundColor: "rgba(8, 47, 73, 0.5)" }}
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 text-center rounded-xl bg-slate-900/50 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 flex flex-col items-center gap-2"
              >
                <Twitter className="h-6 w-6 text-cyan-400" />
                <span className="text-cyan-400 font-medium text-sm">Twitter</span>
              </motion.a>
              <motion.a
                whileHover={{ y: -5, backgroundColor: "rgba(8, 47, 73, 0.5)" }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 text-center rounded-xl bg-slate-900/50 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 flex flex-col items-center gap-2"
              >
                <Github className="h-6 w-6 text-cyan-400" />
                <span className="text-cyan-400 font-medium text-sm">GitHub</span>
              </motion.a>
              <motion.a
                whileHover={{ y: -5, backgroundColor: "rgba(8, 47, 73, 0.5)" }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 text-center rounded-xl bg-slate-900/50 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 flex flex-col items-center gap-2"
              >
                <Linkedin className="h-6 w-6 text-cyan-400" />
                <span className="text-cyan-400 font-medium text-sm">LinkedIn</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
