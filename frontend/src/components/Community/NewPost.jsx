
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Waves } from "lucide-react";
import Navbar from "../HomePage/Navbar";

const BASE_URL = "http://localhost:8000";
const API_URL = `${BASE_URL}/community/create_post/`;

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login-register", { replace: true });
        }
    }, []);

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }
    }, [image]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication required. Please log in.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) formData.append("image", image);

        try {
            const response = await axios.post(API_URL, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                toast.success("Post created successfully!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => navigate("/community"), 2000);
            } else {
                setError(response.data.message || "Failed to create post.");
            }
        } catch (err) {
            setError("Error submitting post. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 flex flex-col justify-center items-center p-4 relative overflow-hidden">
                {/* Animated Water Background */}
                <motion.div
                    className="absolute inset-0 z-0"
                    animate={{
                        background: [
                            'linear-gradient(45deg, rgba(34,211,238,0.05) 0%, rgba(20,184,166,0.05) 100%)',
                            'linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(6,182,212,0.05) 100%)',
                            'linear-gradient(225deg, rgba(34,211,238,0.05) 0%, rgba(20,184,166,0.05) 100%)'
                        ]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }}
                />

                {/* Floating Bubbles */}
                <div className="absolute inset-0 z-10">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`
                            }}
                            animate={{
                                y: [0, -20, 0],
                                scale: [0.8, 1.2, 0.8],
                                opacity: [0.4, 0.9, 0.4]
                            }}
                            transition={{
                                duration: 3 + Math.random() * 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-2xl relative z-20"
                >
                    <div className="bg-slate-900/60 backdrop-blur-md p-8 rounded-xl border border-cyan-500/20 shadow-lg">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 text-center mb-6"
                        >
                            Share Your Sonic Journey
                        </motion.h1>
                        
                        <motion.form
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            {error && (
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-cyan-400 text-sm text-center p-2 bg-slate-800/50 rounded-lg"
                                >
                                    {error}
                                </motion.p>
                            )}

                            <div>
                                <label className="block text-cyan-300 text-sm font-medium mb-2">Post Title</label>
                                <input
                                    type="text"
                                    placeholder="What's resonating with you?"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white placeholder-slate-400"
                                />
                            </div>

                            <div>
                                <label className="block text-cyan-300 text-sm font-medium mb-2">Your Message</label>
                                <textarea
                                    placeholder="Share your musical thoughts with the Aura Tunes community..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                    rows="6"
                                    className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white placeholder-slate-400"
                                />
                            </div>

                            <div>
                                <label className="block text-cyan-300 text-sm font-medium mb-2">Add Visual Inspiration</label>
                                <div className="flex flex-col space-y-3">
                                    <div className="relative border-2 border-dashed border-cyan-500/30 rounded-lg p-4 text-center transition-all hover:border-cyan-500/50 group">
                                        <div className="flex flex-col items-center justify-center space-y-2">
                                            <Waves className="w-10 h-10 text-cyan-400" />
                                            <p className="text-sm text-slate-400">
                                                {image ? image.name : "Drag & drop or click to upload"}
                                            </p>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setImage(e.target.files[0])}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                        </div>
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100"
                                            animate={{
                                                x: ['-100%', '100%']
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity
                                            }}
                                        />
                                    </div>
                                    {preview && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-2 rounded-lg overflow-hidden border border-cyan-500/20"
                                        >
                                            <img 
                                                src={preview} 
                                                alt="Preview" 
                                                className="w-full h-48 object-cover"
                                            />
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-all shadow-lg relative overflow-hidden group"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
                                    animate={{
                                        x: ['-100%', '100%']
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity
                                    }}
                                />
                                <span className="relative z-10">Share With Community</span>
                            </motion.button>
                        </motion.form>
                    </div>
                </motion.div>
            </div>
            <ToastContainer 
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{ backgroundColor: '#0f172a', color: 'white' }}
                progressStyle={{ background: 'linear-gradient(to right, #06b6d4, #14b8a6)' }}
            />
        </>
    );
}