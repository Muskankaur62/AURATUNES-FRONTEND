
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { ToastContainer, toast } from "react-toastify";
// import { MapPin, Phone, Mail, Clock, Sparkles, User, MessageCircle, Music } from "lucide-react";
// import Navbar from "../components/HomePage/Navbar";
// import Footer from "../components/HomePage/Footer";

// const ContactUs = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         message: ""
//     });
//     const [error, setError] = useState(null);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setError(null);
//         toast.success("Message sent successfully!", {
//             position: "top-right",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//         });
//         setFormData({ name: "", email: "", phone: "", message: "" });
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="h-15" />
//             <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
//                 {/* Floating Music Notes Animation */}
//                 <div className="absolute inset-0 z-0 overflow-hidden">
//                     {[...Array(15)].map((_, i) => (
//                         <motion.div
//                             key={i}
//                             className="absolute text-cyan-400/20"
//                             style={{
//                                 left: `${Math.random() * 100}%`,
//                                 top: `${Math.random() * 100}%`,
//                                 fontSize: `${Math.random() * 20 + 10}px`,
//                             }}
//                             animate={{
//                                 y: [0, -20, 0],
//                                 opacity: [0.6, 1, 0.6],
//                                 rotate: [0, 5, 0]
//                             }}
//                             transition={{
//                                 duration: 3 + Math.random() * 4,
//                                 repeat: Infinity,
//                                 ease: "easeInOut"
//                             }}
//                         >
//                             <Music />
//                         </motion.div>
//                     ))}
//                 </div>

//                 {/* Sound Wave Animation */}
//                 <div className="absolute bottom-0 left-0 right-0 h-32 flex justify-center items-end space-x-1 z-0">
//                     {[...Array(12)].map((_, i) => (
//                         <motion.div
//                             key={i}
//                             className="w-2 bg-cyan-400 rounded-t-full"
//                             style={{
//                                 height: `${Math.random() * 40 + 10}px`,
//                             }}
//                             animate={{
//                                 height: [
//                                     `${Math.random() * 40 + 10}px`,
//                                     `${Math.random() * 80 + 20}px`,
//                                     `${Math.random() * 40 + 10}px`
//                                 ],
//                             }}
//                             transition={{
//                                 duration: 1.5 + Math.random(),
//                                 repeat: Infinity,
//                                 repeatType: "reverse",
//                                 ease: "easeInOut"
//                             }}
//                         />
//                     ))}
//                 </div>

//                 <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//                     <motion.div
//                         initial={{ opacity: 0, y: 50 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-cyan-500/30 shadow-xl shadow-cyan-500/10"
//                     >
//                         <div className="text-center mb-12">
//                             <motion.div
//                                 whileHover={{ scale: 1.05 }}
//                                 className="inline-flex items-center gap-2 bg-cyan-500/10 px-6 py-2 rounded-full mb-4 border border-cyan-400/30"
//                             >
//                                 <Sparkles className="h-5 w-5 text-cyan-400" />
//                                 <span className="text-sm font-medium text-cyan-400">
//                                     Let's Connect
//                                 </span>
//                             </motion.div>
//                             <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
//                                 Contact Our Team
//                             </h1>
//                             <p className="text-cyan-100/80 max-w-lg mx-auto">
//                             "Got questions or ideas? Reach out to us and let’s tune in together!"
//                             </p>
//                         </div>

//                         <div className="grid md:grid-cols-2 gap-12">
//                             {/* Contact Form */}
//                             <motion.form
//                                 initial={{ opacity: 0, x: -50 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 onSubmit={handleSubmit}
//                                 className="space-y-6"
//                             >
//                                 {error && (
//                                     <motion.div
//                                         initial={{ opacity: 0, y: -20 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         className="p-3 bg-red-900/20 rounded-lg border border-red-700/30 text-red-400 text-sm text-center"
//                                     >
//                                         {error}
//                                     </motion.div>
//                                 )}

//                                 <div className="space-y-2">
//                                     <label className="text-cyan-100 text-sm font-medium flex items-center gap-2">
//                                         <User className="h-5 w-5 text-cyan-400" />
//                                         Full Name
//                                     </label>
//                                     <motion.input
//                                         whileFocus={{ borderColor: "#06b6d4", boxShadow: "0 0 0 2px rgba(6, 182, 212, 0.1)" }}
//                                         type="text"
//                                         name="name"
//                                         value={formData.name}
//                                         onChange={handleChange}
//                                         required
//                                         className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-cyan-100 focus:outline-none focus:border-cyan-400 placeholder-cyan-400/50"
//                                         placeholder="Your name"
//                                     />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <label className="text-cyan-100 text-sm font-medium flex items-center gap-2">
//                                         <Mail className="h-5 w-5 text-cyan-400" />
//                                         Email Address
//                                     </label>
//                                     <motion.input
//                                         whileFocus={{ borderColor: "#06b6d4", boxShadow: "0 0 0 2px rgba(6, 182, 212, 0.1)" }}
//                                         type="email"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         required
//                                         className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-cyan-100 focus:outline-none focus:border-cyan-400 placeholder-cyan-400/50"
//                                         placeholder="your@email.com"
//                                     />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <label className="text-cyan-100 text-sm font-medium flex items-center gap-2">
//                                         <Phone className="h-5 w-5 text-cyan-400" />
//                                         Phone Number
//                                     </label>
//                                     <motion.input
//                                         whileFocus={{ borderColor: "#06b6d4", boxShadow: "0 0 0 2px rgba(6, 182, 212, 0.1)" }}
//                                         type="tel"
//                                         name="phone"
//                                         value={formData.phone}
//                                         onChange={handleChange}
//                                         className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-cyan-100 focus:outline-none focus:border-cyan-400 placeholder-cyan-400/50"
//                                         placeholder="+91 ____________"
//                                     />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <label className="text-cyan-100 text-sm font-medium flex items-center gap-2">
//                                         <MessageCircle className="h-5 w-5 text-cyan-400" />
//                                         Your Message
//                                     </label>
//                                     <motion.textarea
//                                         whileFocus={{ borderColor: "#06b6d4", boxShadow: "0 0 0 2px rgba(6, 182, 212, 0.1)" }}
//                                         name="message"
//                                         value={formData.message}
//                                         onChange={handleChange}
//                                         required
//                                         rows="4"
//                                         className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-cyan-100 focus:outline-none focus:border-cyan-400 placeholder-cyan-400/50"
//                                         placeholder="How can we help you?"
//                                     />
//                                 </div>

//                                 <motion.button
//                                     whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(6, 182, 212, 0.3)" }}
//                                     whileTap={{ scale: 0.98 }}
//                                     className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-medium shadow-lg shadow-cyan-500/20"
//                                 >
//                                     Send Message
//                                 </motion.button>
//                             </motion.form>

//                             {/* Contact Information */}
//                             <motion.div
//                                 initial={{ opacity: 0, x: 50 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 className="space-y-8"
//                             >
//                                 <motion.div
//                                     whileHover={{ y: -5 }}
//                                     className="p-8 bg-slate-700/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 shadow-sm"
//                                 >
//                                     <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
//                                         Contact Details
//                                     </h3>
//                                     <div className="space-y-6 text-cyan-100">
//                                         <div className="flex items-start gap-4">
//                                             <MapPin className="w-6 h-6 mt-1 text-cyan-400" />
//                                             <div>
//                                                 <p className="font-medium">Headquarters</p>
//                                                 <p className="text-sm">133 Sphere Lane</p>
//                                                 <p className="text-sm">New Delhi,India 110001</p>
//                                             </div>
//                                         </div>
//                                         <div className="flex items-center gap-4">
//                                             <Phone className="w-6 h-6 text-cyan-400" />
//                                             <span>+91 9876543211</span>
//                                         </div>
//                                         <div className="flex items-center gap-4">
//                                             <Mail className="w-6 h-6 text-cyan-400" />
//                                             <span>support@auratunes.com</span>
//                                         </div>
//                                     </div>
//                                 </motion.div>

//                                 <motion.div
//                                     whileHover={{ y: -5 }}
//                                     className="p-8 bg-slate-700/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 shadow-sm"
//                                 >
//                                     <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
//                                         Operating Hours
//                                     </h3>
//                                     <div className="space-y-4 text-cyan-100">
//                                         <div className="flex justify-between items-center">
//                                             <span>Monday - Friday</span>
//                                             <span className="bg-cyan-500/10 px-3 py-1 rounded-full text-sm">9 AM - 6 PM</span>
//                                         </div>
//                                         <div className="flex justify-between items-center">
//                                             <span>Saturday</span>
//                                             <span className="bg-cyan-500/10 px-3 py-1 rounded-full text-sm">10 AM - 4 PM</span>
//                                         </div>
//                                         <div className="flex justify-between items-center">
//                                             <span>Sunday</span>
//                                             <span className="bg-cyan-500/10 px-3 py-1 rounded-full text-sm">Closed</span>
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             </motion.div>
//                         </div>
//                     </motion.div>
//                 </div>

//                 <Footer />

//                 <ToastContainer
//                     position="top-right"
//                     autoClose={2000}
//                     hideProgressBar={false}
//                     newestOnTop
//                     closeOnClick
//                     rtl={false}
//                     pauseOnFocusLoss
//                     draggable
//                     pauseOnHover
//                     theme="dark"
//                 />
//             </div>
//         </>
//     );
// };

// export default ContactUs;


import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { MapPin, Phone, Mail, Clock, Sparkles, User, MessageCircle, Music } from "lucide-react";
import Navbar from "../components/HomePage/Navbar";
import Footer from "../components/HomePage/Footer";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/emotion/add_contactus/", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to send message");
            }

            toast.success("Message sent successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        } catch (err) {
            setError(err.message || "Something went wrong");
            toast.error(err.message || "Failed to send message", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="h-15" />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
                {/* Floating Music Notes Animation */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-cyan-400/20"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top:  `${Math.random() * 100}%`,
                                fontSize: `${Math.random() * 20 + 10}px`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.6, 1, 0.6],
                                rotate: [0, 5, 0]
                            }}
                            transition={{
                                duration: 3 + Math.random() * 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Music />
                        </motion.div>
                    ))}
                </div>

                {/* Sound Wave Animation */}
                <div className="absolute bottom-0 left-0 right-0 h-32 flex justify-center items-end space-x-1 z-0">
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-2 bg-cyan-400 rounded-t-full"
                            style={{
                                height: `${Math.random() * 40 + 10}px`,
                            }}
                            animate={{
                                height: [
                                    `${Math.random() * 40 + 10}px`,
                                    `${Math.random() * 80 + 20}px`,
                                    `${Math.random() * 40 + 10}px`
                                ],
                            }}
                            transition={{
                                duration: 1.5 + Math.random(),
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-cyan-500/30 shadow-xl shadow-cyan-500/10"
                    >
                        <div className="text-center mb-12">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="inline-flex items-center gap-2 bg-cyan-500/10 px-6 py-2 rounded-full mb-4 border border-cyan-400/30"
                            >
                                <Sparkles className="h-5 w-5 text-cyan-400" />
                                <span className="text-sm font-medium text-cyan-400">
                                    Let's Connect
                                </span>
                            </motion.div>
                            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                                Contact Our Team
                            </h1>
                            <p className="text-cyan-100/80 max-w-lg mx-auto">
                                "Got questions or ideas? Reach out to us and let's tune in together!"
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <motion.form
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 bg-red-900/20 rounded-lg border border-red-700/30 text-red-400 text-sm text-center"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-cyan-100 text-sm font-medium flex items-center gap-2">
                                        <User className="h-5 w-5 text-cyan-400" />
                                        Full Name
                                    </label>
                                    <motion.input
                                        whileFocus={{ borderColor: "#06b6d4", boxShadow: "0 0 0 2px rgba(6, 182, 212, 0.1)" }}
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-cyan-100 focus:outline-none focus:border-cyan-400 placeholder-cyan-400/50"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-cyan-100 text-sm font-medium flex items-center gap-2">
                                        <Mail className="h-5 w-5 text-cyan-400" />
                                        Email Address
                                    </label>
                                    <motion.input
                                        whileFocus={{ borderColor: "#06b6d4", boxShadow: "0 0 0 2px rgba(6, 182, 212, 0.1)" }}
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-cyan-100 focus:outline-none focus:border-cyan-400 placeholder-cyan-400/50"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-cyan-100 text-sm font-medium flex items-center gap-2">
                                        <Phone className="h-5 w-5 text-cyan-400" />
                                        Phone Number
                                    </label>
                                    <motion.input
                                        whileFocus={{ borderColor: "#06b6d4", boxShadow: "0 0 0 2px rgba(6, 182, 212, 0.1)" }}
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-cyan-100 focus:outline-none focus:border-cyan-400 placeholder-cyan-400/50"
                                        placeholder="+91 ____________"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-cyan-100 text-sm font-medium flex items-center gap-2">
                                        <MessageCircle className="h-5 w-5 text-cyan-400" />
                                        Subject
                                    </label>
                                    <motion.input
                                        whileFocus={{ borderColor: "#06b6d4", boxShadow: "0 0 0 2px rgba(6, 182, 212, 0.1)" }}
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-cyan-100 focus:outline-none focus:border-cyan-400 placeholder-cyan-400/50"
                                        placeholder="Subject of your message"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-cyan-100 text-sm font-medium flex items-center gap-2">
                                        <MessageCircle className="h-5 w-5 text-cyan-400" />
                                        Your Message
                                    </label>
                                    <motion.textarea
                                        whileFocus={{ borderColor: "#06b6d4", boxShadow: "0 0 0 2px rgba(6, 182, 212, 0.1)" }}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-cyan-100 focus:outline-none focus:border-cyan-400 placeholder-cyan-400/50"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(6, 182, 212, 0.3)" }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-medium shadow-lg shadow-cyan-500/20 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}

                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        "Send Message"
                                    )}
                                </motion.button>
                            </motion.form>

                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                            >
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="p-8 bg-slate-700/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 shadow-sm"
                                >
                                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
                                        Contact Details
                                    </h3>
                                    <div className="space-y-6 text-cyan-100">
                                        <div className="flex items-start gap-4">
                                            <MapPin className="w-6 h-6 mt-1 text-cyan-400" />
                                            <div>
                                                <p className="font-medium">Headquarters</p>
                                                <p className="text-sm">133 Sphere Lane</p>
                                                <p className="text-sm">New Delhi,India 110001</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Phone className="w-6 h-6 text-cyan-400" />
                                            <span>+91 9876543211</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Mail className="w-6 h-6 text-cyan-400" />
                                            <span>support@auratunes.com</span>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="p-8 bg-slate-700/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 shadow-sm"
                                >
                                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
                                        Operating Hours
                                    </h3>
                                    <div className="space-y-4 text-cyan-100">
                                        <div className="flex justify-between items-center">
                                            <span>Monday - Friday</span>
                                            <span className="bg-cyan-500/10 px-3 py-1 rounded-full text-sm">9 AM - 6 PM</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Saturday</span>
                                            <span className="bg-cyan-500/10 px-3 py-1 rounded-full text-sm">10 AM - 4 PM</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Sunday</span>
                                            <span className="bg-cyan-500/10 px-3 py-1 rounded-full text-sm">Closed</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                <Footer />

                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
        </>
    );
};

export default ContactUs;

