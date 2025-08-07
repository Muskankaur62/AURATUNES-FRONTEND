import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Twitter, Github, Linkedin, Disc3, Disc } from "lucide-react";

const Footer = () => {
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
    <footer className="relative bg-gradient-to-br from-slate-950 via-blue-900 to-slate-950 border-t border-cyan-500/30">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [0.5, 1.2, 0.5],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="flex items-center gap-3">
              <Disc3 className="h-9 w-9 text-cyan-400 animate-pulse" />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
                Aura Tunes
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Syncing your emotions with the perfect music experience. Join us in the sound revolution.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-5">
            <h4 className="text-cyan-400 font-semibold mb-3">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/about-us" className="text-gray-300 hover:text-cyan-400 text-sm transition-colors flex items-center gap-2">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-gray-300 hover:text-cyan-400 text-sm transition-colors flex items-center gap-2">
                  Feedback
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-300 hover:text-cyan-400 text-sm transition-colors flex items-center gap-2">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-gray-300 hover:text-cyan-400 text-sm transition-colors flex items-center gap-2">
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-5">
            <h4 className="text-cyan-400 font-semibold mb-3">Resources</h4>
            <ul className="space-y-4">
              {['Blog', 'Help Center', 'API Docs', 'Careers'].map((link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-cyan-400 text-sm transition-colors flex items-center gap-2"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Socials */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-5">
            <h4 className="text-cyan-400 font-semibold mb-3">Join the Wave</h4>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-slate-800/50 border border-cyan-500/30 rounded-xl px-5 py-3.5 text-gray-300 text-sm focus:outline-none focus:border-cyan-500 placeholder-gray-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="absolute right-2 top-2 bg-gradient-to-br from-cyan-500 to-teal-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:shadow-cyan-500/20 hover:shadow-md transition-all"
              >
                Subscribe
              </motion.button>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-5 pt-5">
              <motion.a href="https://twitter.com" target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }}
                className="text-cyan-400 hover:text-teal-400 p-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a href="https://github.com" target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }}
                className="text-cyan-400 hover:text-teal-400 p-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }}
                className="text-cyan-400 hover:text-teal-400 p-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a href="https://discord.com" target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }}
                className="text-cyan-400 hover:text-teal-400 p-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
                <Disc className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="border-t border-cyan-500/30 pt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} Aura Tunes. Crafted with ♥ for music lovers.
            </p>
            <div className="flex items-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((link) => (
                <Link
                  key={link}
                  to="#"
                  className="text-gray-400 hover:text-cyan-400 text-sm transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div className="absolute left-24 bottom-24 w-28 h-28 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full blur-2xl opacity-15"
        variants={floatingVariants}
        animate="float"
      />
      <motion.div className="absolute right-40 top-1/3 w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-2xl opacity-15"
        variants={floatingVariants}
        animate="float"
      />
    </footer>
  );
};

export default Footer;
