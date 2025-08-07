
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  MessageSquare,
  AlertCircle,
  Settings,
  LogOut,
  Heart,
  ListMusic,
} from 'lucide-react';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import Profile from '../components/Dashboard/Profile';
import CommunityPosts from '../components/Dashboard/CommunityPosts';
import SubmittedFeedbacks from '../components/Dashboard/SubmittedFeedbacks';
import SettingsPanel from '../components/Dashboard/SettingsPanel';
import Playlists from '../components/Dashboard/MyPlaylists'; // ✅ Import Playlists component
import { BASE_URL } from '../config';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const userString = localStorage.getItem('user');
  const userObj = JSON.parse(userString);
  const [profileData, setProfileData] = useState(userObj);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login-register';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile user={profileData} />;
      case 'posts':
        return <CommunityPosts />;
      case 'feedbacks':
        return <SubmittedFeedbacks />;
      case 'settings':
        return <SettingsPanel />;
      case 'playlists':
        return <Playlists />; // ✅ Correct reference
      default:
        return <Profile user={profileData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 flex flex-col">
      <Navbar />

      <div className="mt-20 grid grid-cols-[auto_1fr] flex-1">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="w-64 bg-slate-900/40 backdrop-blur-2xl border-r border-cyan-400/30 h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="relative">
                <img
                  src={`${BASE_URL}media/${profileData.profile_picture}`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400/30"
                />
                <Heart className="absolute -bottom-1 -right-1 h-5 w-5 text-red-500 bg-white rounded-full p-0.5" />
              </div>
              <div>
                <h3 className="text-cyan-100 font-medium">
                  {profileData.first_name} {profileData.last_name}
                </h3>
                <p className="text-cyan-300 text-sm">{profileData.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'profile', icon: <User size={20} className="text-cyan-400" />, label: 'Profile' },
                { id: 'posts', icon: <MessageSquare size={20} className="text-cyan-400" />, label: 'My Posts' },
                { id: 'feedbacks', icon: <AlertCircle size={20} className="text-cyan-400" />, label: 'Feedbacks' },
                { id: 'settings', icon: <Settings size={20} className="text-cyan-400" />, label: 'Settings' },
                { id: 'playlists', icon: <ListMusic size={20} className="text-cyan-400" />, label: 'Playlists' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-white/10 text-cyan-400 border border-cyan-400/30'
                      : 'text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-rose-400 hover:bg-rose-500/10 rounded-lg mt-8 transition-all hover:text-rose-300"
              >
                <LogOut size={20} className="text-rose-400" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <main className="h-[calc(100vh-5rem)] overflow-y-auto bg-gradient-to-br from-slate-800/30 via-blue-900/30 to-slate-900/30">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-8 m-8"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default DashboardPage;
