// //og code

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Mail, Lock, User, Phone, Sparkles } from "lucide-react";
import Navbar from "../components/HomePage/Navbar";
import Footer from "../components/HomePage/Footer";

const LoginRegister = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/", { replace: true });
        }
    }, []);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        if (!isLogin) {
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setPhone("");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/emotion/user_login/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
                toast.error(data.error);
            } else {
                const userResponse = await fetch(`http://localhost:8000/emotion/user_details/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${data.token}`,
                    },
                });
                const userData = await userResponse.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(userData.user_details));
                toast.success("Logged in successfully!");
                setTimeout(() => navigate("/", { replace: true }), 2000);
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/emotion/user_register/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phone,
                }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
                toast.error(data.error);
            } else {
                localStorage.setItem("token", data.token);
                setIsLogin(true);
                toast.success("Registered successfully!");
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 flex flex-col justify-center items-center relative overflow-hidden text-cyan-200">
                {/* Floating Background Elements */}
                <div className="absolute inset-0 z-0">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                scale: [0.8, 1.2, 0.8],
                                opacity: [0.3, 0.8, 0.3],
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

                <ToastContainer />
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="container mx-auto p-8 flex flex-col items-center relative z-10"
                >
                    <div className="w-full max-w-xl bg-slate-800/80 backdrop-blur-lg p-10 rounded-2xl border border-cyan-400/30 shadow-xl">
                        <motion.div
                            key={isLogin ? "login" : "register"}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-8"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="inline-flex items-center gap-2 bg-cyan-100/10 px-6 py-2 rounded-full mb-4"
                            >
                                <Sparkles className="h-5 w-5 text-cyan-400" />
                                <span className="text-sm font-medium text-cyan-400">
                                    {isLogin ? "Welcome Back" : "Get Started"}
                                </span>
                            </motion.div>
                            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
                                {isLogin ? "Sign In" : "Create Account"}
                            </h1>
                        </motion.div>

                        <motion.form
                            onSubmit={isLogin ? handleLogin : handleRegister}
                            className="space-y-6"
                        >
                            {!isLogin && (
                                <div className="grid grid-cols-2 gap-4">
                                    <motion.div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-400" />
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="First Name"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-cyan-400/30 rounded-lg text-cyan-300 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30"
                                        />
                                    </motion.div>
                                    <motion.div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-400" />
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Last Name"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-cyan-400/30 rounded-lg text-cyan-300 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30"
                                        />
                                    </motion.div>
                                    <motion.div className="col-span-2 relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-400" />
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Phone Number"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-cyan-400/30 rounded-lg text-cyan-300 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30"
                                        />
                                    </motion.div>
                                </div>
                            )}

                            <motion.div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-cyan-400/30 rounded-lg text-cyan-300 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30"
                                />
                            </motion.div>

                            <motion.div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-cyan-400/30 rounded-lg text-cyan-300 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30"
                                />
                            </motion.div>

                            {error && (
                                <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-red-600 text-sm">
                                    {error}
                                </div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-600 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                            >
                                <Sparkles className="h-5 w-5" />
                                {isLogin ? "Sign In" : "Create Account"}
                            </motion.button>
                        </motion.form>

                        <div className="mt-6 text-center">
                            <button
                                onClick={toggleForm}
                                className="text-cyan-400 hover:text-teal-400 text-sm font-medium transition-colors group"
                            >
                                {isLogin ? (
                                    <>New here? <span className="text-teal-400 group-hover:underline">Create an account</span></>
                                ) : (
                                    <>Already have an account? <span className="text-teal-400 group-hover:underline">Sign in instead</span></>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Floating Orb */}
                <motion.div
                    className="absolute left-20 bottom-20 w-24 h-24 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full blur-xl opacity-10"
                    animate={{
                        y: [0, -40, 0],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
            <Footer />
        </>
    );
};

export default LoginRegister;




