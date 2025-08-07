

//(new code)
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Camera, Upload, Languages, Sparkles, Music } from 'lucide-react';
import LiveEmotionDetection from '../components/MusicRecommendation/LiveEmotionDetection';
import MusicPlayer from './MusicPlayer';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';

const MusicRecommendation = () => {
    const [imageFile, setImageFile] = useState(null);
    const [language, setLanguage] = useState('english');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [liveMode, setLiveMode] = useState(false);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setImageFile(file);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
            setImageFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResults(null);

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to use this feature');
            setIsLoading(false);
            setTimeout(() => {
                navigate('/login-register');
            }, 2000);
            return;
        }

        if (!imageFile) {
            toast.error('Please upload an image');
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('language', language);

        try {
            const response = await axios.post(
                'http://localhost:8000/emotion/emotion_detection/',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );

            if (response.data.success) {
                setResults(response.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error processing request');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="h-15" />
            <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 relative overflow-hidden">
                {/* Floating Elements */}
                <div className="absolute inset-0 z-0">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-cyan-400/10 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                scale: [0.8, 1.2, 0.8],
                                opacity: [0.2, 0.6, 0.2],
                                y: [0, -20, 0]
                            }}
                            transition={{
                                duration: 5 + Math.random() * 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-600 text-white px-6 py-3 rounded-full mx-auto shadow-md hover:shadow-lg transition-all"
                            onClick={() => setLiveMode(!liveMode)}
                        >
                            <Camera className="h-5 w-5" />
                            {liveMode ? 'Switch to Image Upload' : 'Try Live Emotion Detection'}
                        </motion.button>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-6xl mx-auto"
                    >
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500 text-center mb-8"
                        >
                            Emotion-Driven Music Discovery
                        </motion.h1>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-slate-800/80 backdrop-blur-lg p-8 rounded-3xl border border-cyan-400/30 shadow-cyan-500/20 shadow-xl"
                        >
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onSubmit={handleSubmit}
                                className="space-y-8"
                            >
                                {/* Image Upload Section */}
                                <div className="mb-8">
                                    <label className="block text-cyan-300 mb-4 text-lg font-medium flex items-center gap-2">
                                        <Upload className="h-6 w-6 text-cyan-400" />
                                        Upload Facial Image
                                    </label>
                                    <div
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                                            dragActive
                                                ? 'border-cyan-400/30 bg-slate-700/50 shadow-inner'
                                                : 'border-cyan-400/30 bg-slate-900/80'
                                        }`}
                                    >
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label htmlFor="image-upload" className="cursor-pointer">
                                            <div className="text-cyan-400 space-y-4">
                                                <Upload className="w-16 h-16 mx-auto mb-4 stroke-1" />
                                                {imageFile ? (
                                                    <p className="text-sm bg-slate-700/50 px-4 py-2 rounded-lg border border-cyan-400/30">
                                                        {imageFile.name}
                                                    </p>
                                                ) : (
                                                    <>
                                                        <p className="text-sm font-medium">Drag & Drop Your Image Here</p>
                                                        <p className="text-xs text-cyan-300/80">or click to browse files</p>
                                                    </>
                                                )}
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Language Selection */}
                                <div className="mb-8">
                                    <label className="block text-cyan-300 mb-4 text-lg font-medium flex items-center gap-2">
                                        <Languages className="h-6 w-6 text-cyan-400" />
                                        Select Language
                                    </label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {['english', 'hindi', 'punjabi'].map((lang) => (
                                            <motion.button
                                                key={lang}
                                                type="button"
                                                onClick={() => setLanguage(lang)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`py-3 rounded-lg text-sm font-medium transition-all ${
                                                    language === lang
                                                        ? 'bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-md'
                                                        : 'bg-slate-800 text-cyan-300 hover:bg-slate-700 border border-cyan-400/30'
                                                }`}
                                            >
                                                {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.03, boxShadow: "0 5px 15px rgba(6, 182, 212, 0.3)" }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-600 text-white py-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-70"
                                >
                                    {isLoading ? (
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Sparkles className="h-5 w-5" />
                                        </motion.span>
                                    ) : (
                                        <Sparkles className="h-5 w-5" />
                                    )}
                                    {isLoading ? 'Analyzing Emotion...' : 'Get Recommendations'}
                                </motion.button>
                            </motion.form>

                            {/* Results Section */}
                            {liveMode ? (
                                <LiveEmotionDetection />
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-12"
                                >
                                    {results && (
                                        <div className="space-y-12">
                                            <div className="text-center">
                                                <motion.div
                                                    initial={{ scale: 0.8 }}
                                                    animate={{ scale: 1 }}
                                                    className="inline-block bg-gradient-to-r from-slate-800 via-blue-900 to-slate-900 p-6 rounded-2xl border border-cyan-400/30 shadow-sm"
                                                >
                                                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500 mb-2">
                                                        {results.emotion}
                                                    </h2>
                                                    <p className="text-cyan-300">Detected from your expression</p>
                                                </motion.div>
                                            </div>

                                            <MusicPlayer recommendations={results.recommendations} />
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                </div>

                <Footer />

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </>
    );
};

export default MusicRecommendation;