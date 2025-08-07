import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ArrowRightCircle,
  Disc3,
  MessageCircle,
  Music,
  Phone,
  Info,
  Users,
  LogOut,
  LayoutDashboard,
  UserCircle,
  ChevronDown,
  Home
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const mobileMenuRef = useRef();

  // On mount, check localStorage for token and user details.
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Close dropdowns if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target) && !e.target.closest('[data-menu-button]')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    setIsMenuOpen(false);
    navigate("/login-register");
  };

  const handleStartListening = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login-register");
    } else {
      navigate("/recommendation");
    }
    setIsMenuOpen(false);
  };

  // Navigation items with icons for mobile menu
  const navItems = [
    { name: "Home", path: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Recommendation", path: "/recommendation", icon: <Music className="h-5 w-5" /> },
    { name: "Community", path: "/community", icon: <Users className="h-5 w-5" /> },
    { name: "Feedback", path: "/feedback", icon: <MessageCircle className="h-5 w-5" /> },
    { name: "Contact Us", path: "/contact-us", icon: <Phone className="h-5 w-5" /> },
    { name: "About Us", path: "/about-us", icon: <Info className="h-5 w-5" /> },
  ];

  // Animation variants for mobile menu
  const mobileMenuVariants = {
    open: { 
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: { 
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.nav
      className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 backdrop-blur-xl border-b border-cyan-500/30 fixed w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <motion.span
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <Disc3 className="h-8 w-8 mr-2 text-cyan-400 animate-pulse" />
              Aura Tunes
            </motion.span>
          </Link>

          {/* Desktop Navigation Links with Icons */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className="text-gray-300 hover:text-cyan-400 flex items-center gap-2 transition-colors"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center gap-6 relative">
            {user ? (
              <div ref={dropdownRef} className="relative">
                <motion.button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 px-4 py-2 rounded-full border border-cyan-400/20 hover:border-cyan-400/40 transition-colors duration-200"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <UserCircle className="h-5 w-5 text-cyan-400" />
                  <span className="text-cyan-100 font-medium">
                    Hi, {user.first_name} {user.last_name}
                  </span>
                  <motion.div
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4 text-cyan-300" />
                  </motion.div>
                </motion.button>
                
                {dropdownOpen && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-xl border border-cyan-500/20 overflow-hidden z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <button 
                      onClick={() => { setDropdownOpen(false); navigate("/dashboard"); }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left text-cyan-100 hover:bg-cyan-500/10 transition-colors duration-200 border-b border-cyan-500/10"
                    >
                      <LayoutDashboard className="h-5 w-5 text-cyan-400" />
                      <span>Dashboard</span>
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left text-rose-100 hover:bg-rose-500/10 transition-colors duration-200"
                    >
                      <LogOut className="h-5 w-5 text-rose-400" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={handleStartListening}
                  className="flex items-center gap-2 bg-gradient-to-br from-cyan-500 to-teal-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 border border-cyan-400/30"
                >
                  Start Listening
                  <ArrowRightCircle size={18} className="mt-0.5 stroke-[1.5]" />
                </button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            data-menu-button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-7 w-7 text-cyan-400" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        ref={mobileMenuRef}
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-slate-900 to-blue-900/95 backdrop-blur-2xl shadow-2xl border-l border-cyan-500/20 z-40 md:hidden"
      >
        <div className="flex flex-col h-full p-6 overflow-y-auto">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
              <Disc3 className="h-8 w-8 mr-2 text-cyan-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
                Aura Tunes
              </span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-cyan-400 rounded-full"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 space-y-4">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-colors"
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile User Section */}
          <div className="mt-8 pt-6 border-t border-cyan-500/20">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-4 py-3">
                  <UserCircle className="h-8 w-8 text-cyan-400" />
                  <div>
                    <p className="font-medium text-cyan-100">{user.first_name} {user.last_name}</p>
                    <p className="text-sm text-cyan-400/80">Premium Member</p>
                  </div>
                </div>
                <button
                  onClick={() => { setIsMenuOpen(false); navigate("/dashboard"); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-cyan-100 hover:bg-cyan-500/10 rounded-lg transition-colors"
                >
                  <LayoutDashboard className="h-5 w-5 text-cyan-400" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-rose-100 hover:bg-rose-500/10 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5 text-rose-400" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button
                  onClick={handleStartListening}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-cyan-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                >
                  Start Listening
                  <ArrowRightCircle size={18} />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black z-30 md:hidden"
        />
      )}
    </motion.nav>
  );
};

export default Navbar;