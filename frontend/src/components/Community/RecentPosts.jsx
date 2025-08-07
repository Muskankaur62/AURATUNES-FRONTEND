

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const BASE_URL = "http://localhost:8000";
const API_URL = `${BASE_URL}/community/posts/`;

export default function RecentPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.success) {
            setPosts(response.data.posts);
          }
        })
        .catch((error) => console.error("Error fetching posts:", error))
        .finally(() => setLoading(false));
    }
  }, [token]);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-950 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Aura Tunes Community
            </h2>
            <p className="text-slate-400 mt-2">Share your musical journey with the Aura Tunes community</p>
          </div>
          <Link to="/community/new-post">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <span>+</span> New Post
            </motion.button>
          </Link>
        </div>

        {/* Search Input */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cyan-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search posts by title, content or author..."
            className="w-full pl-10 pr-5 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 text-white placeholder-slate-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 animate-spin border-2 border-cyan-500 border-t-transparent"></div>
              <span className="text-slate-500">Loading harmonies...</span>
            </div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl p-8 text-center border border-dashed border-cyan-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-slate-400 mt-4 text-lg">No discussions found. Strike the first chord!</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredPosts.map((post) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`/community/posts/${post.id}`}>
                  <div className="bg-slate-900/80 hover:bg-slate-900 backdrop-blur-lg rounded-xl p-5 border border-slate-800 hover:border-cyan-500/30 transition-all shadow-lg hover:shadow-cyan-500/10">
                    <div className="flex flex-col md:flex-row gap-5">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-cyan-300">{post.title}</h3>
                          <span className="text-xs bg-cyan-400/10 text-cyan-400 px-3 py-1 rounded-full">
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <p className="text-slate-300">
                          {post.content.length > 200 ? (
                            <span>
                              {post.content.slice(0, 200)}...
                              <span className="text-cyan-400 hover:underline ml-1">Continue reading</span>
                            </span>
                          ) : (
                            post.content
                          )}
                        </p>

                        <div className="mt-4 flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mr-3 text-white text-sm font-medium">
                            {post.user.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm text-slate-400">@{post.user}</span>
                        </div>
                      </div>
                      
                      {post.image && (
                        <div className="md:w-48 w-full h-48 rounded-lg overflow-hidden border border-slate-800">
                          <img
                            src={`${BASE_URL}${post.image}`}
                            alt="Post"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}