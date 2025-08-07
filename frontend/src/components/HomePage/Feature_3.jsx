import { motion } from "framer-motion";
import { Headphones, Heart, Share, User, Disc, Send, MoreHorizontal, MessageCircle  } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Feature_3 = () => {
  const [activePost, setActivePost] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "SoundExplorer",
      content: "Aura Tunes' adaptive audio system perfectly matched my workout vibe today! 🎵",
      likes: 56,
      liked: false,
      timestamp: "3h ago",
      avatar: <User className="h-6 w-6" />,
      comments: [
        { id: 1, user: "Listener_1", text: "The sound quality is amazing!" },
        { id: 2, user: "Listener_2", text: "How does the biometric analysis work?" }
      ]
    },
    {
      id: 2,
      user: "MusicEnthusiast",
      content: "Aura Tunes always knows how to match my mood with the perfect song, making every moment feel brighter and more meaningful. 🎧✨",
      likes: 34,
      liked: false,
      timestamp: "5h ago",
      avatar: <Disc className="h-6 w-6" />,
      comments: [
        { id: 1, user: "Listener_1", text: "Created my first sonic profile!" }
      ]
    }
  ]);
  
  const [newComments, setNewComments] = useState({});
  const navigate = useNavigate();

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId, commentText) => {
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(), // Simple unique ID
      user: "You", // Assuming the current user is adding the comment
      text: commentText
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));

    // Clear the input field
    setNewComments({...newComments, [postId]: ""});
  };

  const handleCommentChange = (postId, text) => {
    setNewComments({...newComments, [postId]: text});
  };

  const handleJoinCommunity = () => {
    navigate('/community');
  };

  return (
    <section
      className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900"
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/1806011581/photo/overjoyed-happy-young-people-dancing-jumping-and-singing-during-concert-of-favorite-group.jpg?s=612x612&w=0&k=20&c=cMFdhX403-yKneupEN-VWSfFdy6UWf1H0zqo6QBChP4='
        )`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-900/80 z-0"></div>

      {/* Animated Sound Waves */}
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
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
             Music syncs with emotions
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-5">
            Share Your Sound Journey
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          "Every song tells a story – share how Aura Tunes has shaped yours"
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Connect with our music commmunity and share your stories with the world!
          </p>
          
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 shadow-lg"
            >
              {/* Post Header */}
              <div className="flex items-center gap-4 mb-5">
                <div className="p-2.5 bg-cyan-500/10 rounded-xl">
                  {post.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">{post.user}</h3>
                  <p className="text-sm text-gray-400">{post.timestamp}</p>
                </div>
                <button className="ml-auto text-gray-400 hover:text-cyan-400">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>

              {/* Post Content */}
              <p className="text-gray-300 mb-7 leading-relaxed">{post.content}</p>

              {/* Interaction Buttons */}
              <div className="flex items-center gap-6 border-t border-cyan-500/30 pt-5">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 group"
                  onClick={() => handleLike(post.id)}
                >
                  <Heart className={`h-5 w-5 ${post.liked ? 'fill-cyan-400 text-cyan-400' : 'group-hover:fill-cyan-400/20'}`} />
                  <span>{post.likes}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 text-gray-400 hover:text-cyan-400"
                  onClick={() => setActivePost(activePost === post.id ? null : post.id)}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{post.comments.length}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-cyan-400"
                >
                  <Share className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Comments Section */}
              {activePost === post.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-5 pt-5 border-t border-cyan-500/30"
                >
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 mb-5">
                      <div className="p-2.5 bg-cyan-500/10 rounded-xl">
                        <User className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-300">{comment.user}</div>
                        <p className="text-gray-400 text-sm leading-relaxed">{comment.text}</p>
                      </div>
                    </div>
                  ))}

                  {/* Comment Input */}
                  <div className="flex gap-4 mt-5">
                    <input
                      type="text"
                      placeholder="Add your response..."
                      className="flex-1 bg-slate-800/50 border border-cyan-500/30 rounded-xl px-5 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-cyan-500"
                      value={newComments[post.id] || ""}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id, newComments[post.id])}
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="text-cyan-400"
                      onClick={() => handleAddComment(post.id, newComments[post.id])}
                    >
                      <Send className="h-5 w-5" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(34, 211, 238, 0.2)" }}
            className="flex items-center gap-3 bg-gradient-to-br from-cyan-500 to-teal-600 text-white px-8 py-3.5 rounded-xl text-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 mx-auto border border-cyan-400/30"
            onClick={handleJoinCommunity}
          >
            <Headphones className="h-5 w-5" />
            Join the Sound Collective
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_3;