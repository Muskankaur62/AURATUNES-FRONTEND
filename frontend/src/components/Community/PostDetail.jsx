
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Navbar from "../HomePage/Navbar";
import { motion } from "framer-motion";

const BASE_URL = 'http://localhost:8000/';

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [reply, setReply] = useState({});
    const [showReplyInput, setShowReplyInput] = useState({});
    const [token, setToken] = useState(null);

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem("token");
        setToken(tokenFromStorage);
    }, []);

    useEffect(() => {
        if (token) {
            axios.get(`${BASE_URL}community/posts/${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                if (response.data.success) {
                    setPost(response.data.post);
                }
            })
            .catch((error) => console.error("Error fetching post:", error))
            .finally(() => setLoading(false));
        }
    }, [id, token]);

    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}community/create_comment/${id}/`,
                { content: comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                setComment("");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    const handleReplySubmit = async (commentId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}community/create_reply/${commentId}/`,
                { content: reply[commentId] },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                window.location.reload();
            }
        } catch (error) {
            console.error("Error creating reply:", error);
        }
    };

    const toggleReplyInput = (commentId) => {
        setShowReplyInput(prev => ({ ...prev, [commentId]: !prev[commentId] }));
        setReply(prev => ({ ...prev, [commentId]: "" }));
    };

    if (loading) return (
        <div className="fixed inset-0 bg-gray-900 flex justify-center items-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
        </div>
    );

    if (!post) return (
        <div className="fixed inset-0 bg-gray-900 flex justify-center items-center z-50">
            <p className="text-gray-300">Post not found.</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
            <Navbar />
            
            <main className="pt-20 pb-10 px-4 max-w-6xl mx-auto relative">
                {/* Floating background elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <div 
                            key={i}
                            className="absolute rounded-full bg-cyan-500/10 animate-float"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                width: `${Math.random() * 10 + 5}px`,
                                height: `${Math.random() * 10 + 5}px`,
                                animationDuration: `${Math.random() * 20 + 10}s`,
                                animationDelay: `${Math.random() * 5}s`
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10">
                    <motion.button 
                        onClick={() => navigate("/community")}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center text-cyan-400 mb-6 hover:text-cyan-300 transition-colors"
                    >
                        <ArrowUturnLeftIcon className="w-5 h-5 mr-1" />
                        Back to community
                    </motion.button>

                    {/* Post Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-900/80 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/30 shadow-xl shadow-cyan-500/10 mb-8"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <img
                                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${post.post.user}&background=%2308B6D4&color=white`}
                                    alt={post.post.user}
                                    className="w-10 h-10 rounded-full mr-3 ring-2 ring-cyan-400"
                                />
                                <div>
                                    <h1 className="text-2xl font-bold text-cyan-300">{post.post.title}</h1>
                                    <p className="text-gray-400 text-sm">
                                        Posted by {post.post.user} • {new Date(post.post.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <span className="inline-block bg-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium">
                                Discussion
                            </span>
                        </div>

                        <div className="mt-6 mb-8">
                            <p className="text-gray-200 leading-relaxed whitespace-pre-line">{post.post.content}</p>
                        </div>

                        {post.post.image && (
                            <div className="mb-8 rounded-lg overflow-hidden border border-cyan-500/30 shadow-lg">
                                <img 
                                    src={`${BASE_URL}${post.post.image}`} 
                                    alt="Post" 
                                    className="w-full max-h-96 object-contain bg-gray-800"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </div>
                        )}

                        <hr className="border-gray-700 my-6" />

                        {/* Comment Form */}
                        <div>
                            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                                Join the Conversation
                            </h2>
                            <p className="text-gray-400 mb-6">Share your thoughts about this musical topic.</p>

                            <textarea
                                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white placeholder-gray-500"
                                rows="4"
                                placeholder="What's your perspective on this?"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <motion.button
                                onClick={handleCommentSubmit}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="mt-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/20"
                                disabled={!comment.trim()}
                            >
                                Post Comment
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Comments Section */}
                    <div className="bg-gray-900/80 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/30 shadow-xl shadow-cyan-500/10">
                        <h3 className="text-lg font-semibold text-cyan-300 mb-4">
                            {post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}
                        </h3>

                        {post.comments.length > 0 ? (
                            <div className="space-y-6">
                                {post.comments.map((c) => (
                                    <motion.div 
                                        key={c.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-gray-800/70 rounded-lg p-4 border border-gray-700 shadow-sm"
                                    >
                                        <div className="flex items-start">
                                            <img
                                                src={`https://api.dicebear.com/9.x/initials/svg?seed=${c.user}&background=%2308B6D4&color=white`}
                                                alt={c.user}
                                                className="w-8 h-8 rounded-full mr-3 ring-1 ring-cyan-400"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium text-cyan-300">{c.user}</p>
                                                        <p className="text-gray-300 mt-1 whitespace-pre-line">{c.content}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => toggleReplyInput(c.id)}
                                                        className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center"
                                                    >
                                                        <ArrowUturnLeftIcon className="w-4 h-4 mr-1" />
                                                        <span className="text-sm">Reply</span>
                                                    </button>
                                                </div>

                                                {/* Reply Input */}
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={showReplyInput[c.id] ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                                                    className="overflow-hidden pl-8 mt-3"
                                                >
                                                    <div className="border-l-2 border-cyan-500/30 pl-4">
                                                        <textarea
                                                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500/30 text-white placeholder-gray-400"
                                                            rows="2"
                                                            placeholder="Write your reply..."
                                                            value={reply[c.id] || ""}
                                                            onChange={(e) => setReply(prev => ({ ...prev, [c.id]: e.target.value }))}
                                                        />
                                                        <div className="flex gap-2 mt-2">
                                                            <motion.button
                                                                onClick={() => handleReplySubmit(c.id)}
                                                                whileHover={{ scale: 1.03 }}
                                                                className="px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm"
                                                                disabled={!reply[c.id]?.trim()}
                                                            >
                                                                Post Reply
                                                            </motion.button>
                                                            <button
                                                                onClick={() => toggleReplyInput(c.id)}
                                                                className="px-4 py-1 border border-gray-600 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>

                                                {/* Replies */}
                                                {c.replies?.length > 0 && (
                                                    <div className="mt-4 pl-8">
                                                        <div className="border-l-2 border-cyan-500/30 pl-4 space-y-4">
                                                            {c.replies.map((reply) => (
                                                                <div key={reply.id} className="pt-3">
                                                                    <div className="flex items-start">
                                                                        <img
                                                                            src={`https://api.dicebear.com/9.x/initials/svg?seed=${reply.user}&background=%2308B6D4&color=white`}
                                                                            alt={reply.user}
                                                                            className="w-6 h-6 rounded-full mr-2 ring-1 ring-cyan-400"
                                                                        />
                                                                        <div>
                                                                            <p className="text-sm font-medium text-cyan-300">{reply.user}</p>
                                                                            <p className="text-sm text-gray-300 whitespace-pre-line">{reply.content}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-400 bg-gray-800/50 rounded-lg">
                                <p>No comments yet. Be the first to share your thoughts!</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <style jsx global>{`
                @keyframes float {
                    0% { transform: translateY(0) translateX(0); opacity: 1; }
                    50% { transform: translateY(-100px) translateX(20px); opacity: 0.7; }
                    100% { transform: translateY(-200px) translateX(0); opacity: 0; }
                }
                .animate-float {
                    animation: float linear infinite;
                }
                body {
                    background-color: #111827;
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default PostDetail;