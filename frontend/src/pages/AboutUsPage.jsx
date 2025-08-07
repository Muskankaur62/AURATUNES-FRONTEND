

import { motion } from "framer-motion";
import {
  Rocket,
  Users,
  Shield,
  Star,
  Globe,
  HeartHandshake,
} from "lucide-react";
import Navbar from "../components/HomePage/Navbar";
import Footer from "../components/HomePage/Footer";

const AboutUsPage = () => {
  const teamMembers = [
    {
      name: "Missy Cooper",
      role: "AI Engineer",
      bio: "Deep learning specialist with 5+ years in emotion recognition",
      img: "https://i.pinimg.com/474x/35/f4/4d/35f44d24f81c401a9d50d377bd400685.jpg",
    },
    {
      name: "Britney Taylor",
      role: "Music Curator",
      bio: "Professional DJ with expertise in mood-based playlists",
      img: "https://i.pinimg.com/474x/8b/2a/05/8b2a0534fa63523792d2d5e1ddb1685f.jpg",
    },
    {
      name: "Sia Arora",
      role: "Full Stack Developer",
      bio: "Web platform architect & UI/UX enthusiast",
      img: "https://i.pinimg.com/736x/9a/a0/bc/9aa0bc99645d66f1949ddefa3f700d0f.jpg",
    },
    {
      name: "Emily Skye",
      role: "Community Manager",
      bio: "Connecting music lovers worldwide",
      img: "https://i.pinimg.com/736x/27/39/72/273972c2bb8c4fe16e176dff31b9f89a.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Floating Dots Animation */}
      <div className="absolute inset-0 z-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <Navbar />

      <div className="h-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 px-6 py-2 rounded-full border border-blue-500/20 mb-8">
            <Rocket className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-semibold text-blue-400">
            Emotion Engineers
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-4">
            Decoding Emotions into Melody
          </h1>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
          "Where emotion detection meets algorithmic precision, Aura Tunes creates music that speaks directly to your soul."
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid md:grid-cols-2 gap-12 mb-20 items-center"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-blue-400 mb-4">
              <Shield className="h-6 w-6" />
              <span className="text-sm font-semibold">Our Core</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-100">
            "Your Emotions, Our Algorithm, Pure Music."
            </h2>
            <p className="text-gray-300 leading-relaxed">
            We pioneer emotional frequency technology that interprets your biometric signals
            to craft music experiences that resonate with your unique emotional rhythm and energy.


            </p>
          </div>
          {/* Image added here */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-blue-500/20 to-indigo-500/10 rounded-2xl p-4 border border-blue-500/20 backdrop-blur-xl"
          >
            <img
              src="https://i.pinimg.com/736x/8c/d7/43/8cd7437570ca5b28210fbe81ab305877.jpg"
              alt="Emotion meets music"
              className="w-full h-64 object-cover rounded-xl shadow-xl"
            />
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Users className="h-6 w-6 text-blue-400" />
              <h2 className="text-3xl font-bold text-gray-100">
              Emotion Engineers
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="p-6 bg-slate-900/50 backdrop-blur-lg rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-100">{member.name}</h3>
                <p className="text-blue-400 mb-2">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 bg-slate-900/50 backdrop-blur-lg rounded-2xl border border-blue-500/20"
          >
            <Star className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Precision</h3>
            <p className="text-gray-300">
              Algorithmic accuracy meeting emotional authenticity
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 bg-slate-900/50 backdrop-blur-lg rounded-2xl border border-blue-500/20"
          >
            <Globe className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Harmony</h3>
            <p className="text-gray-300">
              Creating universal connections through sound
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 bg-slate-900/50 backdrop-blur-lg rounded-2xl border border-blue-500/20"
          >
            <HeartHandshake className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Empathy</h3>
            <p className="text-gray-300">
              Technology that adapts to your emotional needs
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-20 text-center">
          <div className="p-6 border border-blue-500/20 rounded-2xl">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              82K+
            </div>
            <div className="text-gray-300">Tuned Listeners</div>
          </div>
          <div className="p-6 border border-blue-500/20 rounded-2xl">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              3M+
            </div>
            <div className="text-gray-300">Frequency Matches</div>
          </div>
          <div className="p-6 border border-blue-500/20 rounded-2xl">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              97%
            </div>
            <div className="text-gray-300">Accuracy</div>
          </div>
          <div className="p-6 border border-blue-500/20 rounded-2xl">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              24/7
            </div>
            <div className="text-gray-300">Sonic Support</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
