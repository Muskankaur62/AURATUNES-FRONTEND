
// // //yes and no normal+
// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { motion } from 'framer-motion';
// // // import axios from 'axios';
// // // import { ToastContainer, toast } from 'react-toastify';
// // // import MusicPlayer from '../../pages/MusicPlayer';

// // // const LiveEmotionDetection = () => {
// // //   const [emotion, setEmotion] = useState('');
// // //   const [previousEmotion, setPreviousEmotion] = useState('');
// // //   const [pendingEmotion, setPendingEmotion] = useState('');
// // //   const [recommendations, setRecommendations] = useState([]);
// // //   const [pendingRecommendations, setPendingRecommendations] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [isCameraOn, setIsCameraOn] = useState(false);
// // //   const [showConfirmation, setShowConfirmation] = useState(false);
// // //   const [selectedLanguage, setSelectedLanguage] = useState('Hindi');
// // //   const videoRef = useRef(null);
// // //   const canvasRef = useRef(null);
// // //   const intervalRef = useRef(null);
// // //   const [faceBox, setFaceBox] = useState(null);

// // //   const startCamera = async () => {
// // //     try {
// // //       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// // //       videoRef.current.srcObject = stream;
// // //       setIsCameraOn(true);
// // //       startDetection();
// // //     } catch (err) {
// // //       toast.error('Error accessing camera');
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const captureAndAnalyze = async () => {
// // //     const canvas = canvasRef.current;
// // //     const video = videoRef.current;
// // //     const ctx = canvas.getContext('2d');

// // //     canvas.width = video.videoWidth;
// // //     canvas.height = video.videoHeight;

// // //     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

// // //     canvas.toBlob(async (blob) => {
// // //       const formData = new FormData();
// // //       formData.append('image', blob, 'frame.jpg');
// // //       formData.append('language', selectedLanguage);

// // //       try {
// // //         const response = await axios.post('http://localhost:8000/emotion/emotion_detection/', formData, {
// // //           headers: {
// // //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
// // //             'Content-Type': 'multipart/form-data'
// // //           }
// // //         });

// // //         if (response.data.success) {
// // //           const videoElement = videoRef.current;
// // //           const scaleX = videoElement.offsetWidth / videoElement.videoWidth;
// // //           const scaleY = videoElement.offsetHeight / videoElement.videoHeight;

// // //           const faceCoords = response.data.face_coordinates;
// // //           if (faceCoords) {
// // //             setFaceBox({
// // //               x: faceCoords.x * scaleX,
// // //               y: faceCoords.y * scaleY,
// // //               width: faceCoords.width * scaleX,
// // //               height: faceCoords.height * scaleY
// // //             });
// // //           }

// // //           const newEmotion = response.data.emotion;
// // //           if (newEmotion !== previousEmotion) {
// // //             setPendingEmotion(newEmotion);
// // //             setPendingRecommendations([...response.data.recommendations]);
// // //             setShowConfirmation(true);
// // //           }
// // //         }
// // //       } catch (error) {
// // //         toast.error('Error analyzing frame');
// // //       }
// // //     }, 'image/jpeg');
// // //   };

// // //   const startDetection = () => {
// // //     if (intervalRef.current) clearInterval(intervalRef.current);
// // //     intervalRef.current = setInterval(captureAndAnalyze, 5000);
// // //     setIsLoading(false);
// // //     captureAndAnalyze();
// // //   };

// // //   const handleLanguageChange = (language) => {
// // //     setSelectedLanguage(language);
// // //     if (isCameraOn) {
// // //       captureAndAnalyze();
// // //     }
// // //   };

// // //   const handleUserChoice = (choice) => {
// // //     if (choice === 'yes') {
// // //       setEmotion(pendingEmotion);
// // //       setPreviousEmotion(pendingEmotion);
// // //       setRecommendations(pendingRecommendations);
// // //     }
// // //     setShowConfirmation(false);
// // //     setPendingEmotion('');
// // //     setPendingRecommendations([]);
// // //   };

// // //   useEffect(() => {
// // //     return () => {
// // //       if (intervalRef.current) clearInterval(intervalRef.current);
// // //       if (videoRef.current?.srcObject) {
// // //         videoRef.current.srcObject.getTracks().forEach(track => track.stop());
// // //       }
// // //     };
// // //   }, []);

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-slate-100 p-8">
// // //       <div className="max-w-7xl mx-auto">
// // //         <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-[#7dd3fc] to-[#3b82f6] bg-clip-text text-transparent tracking-wide">
// // //           AuraTunes Detection
// // //         </h1>

// // //         {/* Language Selection Buttons */}
// // //         <div className="flex justify-center gap-4 mb-8">
// // //           {['English', 'Hindi', 'Punjabi'].map((language) => (
// // //             <motion.button
// // //               key={language}
// // //               whileHover={{ scale: 1.05 }}
// // //               whileTap={{ scale: 0.95 }}
// // //               onClick={() => handleLanguageChange(language)}
// // //               className={`px-6 py-2 rounded-lg font-medium transition-all ${
// // //                 selectedLanguage === language
// // //                   ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
// // //                   : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700/70'
// // //               }`}
// // //             >
// // //               {language}
// // //             </motion.button>
// // //           ))}
// // //         </div>

// // //         <div className="relative mb-8 group">
// // //           <video
// // //             ref={videoRef}
// // //             autoPlay
// // //             muted
// // //             className="w-full h-96 object-cover rounded-xl shadow-2xl shadow-blue-900/50 border-2 border-slate-700/50"
// // //             style={{ display: isCameraOn ? 'block' : 'none' }}
// // //           />

// // //           {faceBox && (
// // //             <div
// // //               className="absolute border-4 border-emerald-400 rounded-lg shadow-lg shadow-emerald-500/30"
// // //               style={{
// // //                 left: `${faceBox.x}px`,
// // //                 top: `${faceBox.y}px`,
// // //                 width: `${faceBox.width}px`,
// // //                 height: `${faceBox.height}px`,
// // //               }}
// // //             >
// // //               <motion.div
// // //                 initial={{ scale: 0 }}
// // //                 animate={{ scale: 1 }}
// // //                 className="absolute -top-8 left-0 bg-gradient-to-br from-emerald-500 to-cyan-500 px-4 py-2 rounded-lg font-bold"
// // //               >
// // //                 <span className="text-xl text-slate-900">{emotion}</span>
// // //               </motion.div>
// // //             </div>
// // //           )}

// // //           <canvas ref={canvasRef} className="hidden" />
// // //         </div>

// // //         {!isCameraOn && (
// // //           <div className="text-center">
// // //             <motion.button
// // //               whileHover={{ scale: 1.05 }}
// // //               whileTap={{ scale: 0.95 }}
// // //               onClick={startCamera}
// // //               className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-bold tracking-wide transition-all duration-300 shadow-lg shadow-cyan-500/20"
// // //             >
// // //               {isLoading ? 'Starting Detection...' : 'Start Emotion Detection'}
// // //             </motion.button>
// // //           </div>
// // //         )}

// // //         {showConfirmation && (
// // //           <motion.div 
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             className="bg-cyan-100 text-slate-900 p-6 rounded-xl mt-6 text-center shadow-lg shadow-cyan-500/20 border-2 border-cyan-400"
// // //           >
// // //             <p className="mb-4 font-semibold text-lg">
// // //               New emotion detected: <span className="text-blue-600 font-bold">{pendingEmotion}</span>. 
// // //               <br />Do you want to update recommendations?
// // //             </p>
// // //             <div className="flex justify-center gap-6">
// // //               <motion.button
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={() => handleUserChoice('yes')}
// // //                 className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-md shadow-cyan-500/30"
// // //               >
// // //                 Yes, Update
// // //               </motion.button>
// // //               <motion.button
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={() => handleUserChoice('no')}
// // //                 className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow-md shadow-blue-500/30"
// // //               >
// // //                 No, Keep Current
// // //               </motion.button>
// // //             </div>
// // //           </motion.div>
// // //         )}

// // //         {recommendations.length > 0 && (
// // //           <motion.div 
// // //             initial={{ opacity: 0 }} 
// // //             animate={{ opacity: 1 }}
// // //             className="border-t-2 border-slate-700/50 pt-8 mt-12"
// // //           >
// // //             <div className="text-center mb-6">
// // //               <h2 className="text-2xl font-bold text-slate-100 mb-2">
// // //                 Recommended for your {emotion.toLowerCase()} mood
// // //               </h2>
// // //               <p className="text-slate-400">
// // //                 Selected language: {selectedLanguage}
// // //               </p>
// // //             </div>
// // //             <MusicPlayer recommendations={recommendations} />
// // //           </motion.div>
// // //         )}
// // //       </div>

// // //       <ToastContainer 
// // //         position="bottom-right"
// // //         toastClassName="bg-slate-800/90 text-slate-100"
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default LiveEmotionDetection;


// // //toggle auto-update functionality
// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { motion } from 'framer-motion';
// // // import axios from 'axios';
// // // import { ToastContainer, toast } from 'react-toastify';
// // // import MusicPlayer from '../../pages/MusicPlayer';

// // // const LiveEmotionDetection = () => {
// // //   const [emotion, setEmotion] = useState('');
// // //   const [previousEmotion, setPreviousEmotion] = useState('');
// // //   const [pendingEmotion, setPendingEmotion] = useState('');
// // //   const [recommendations, setRecommendations] = useState([]);
// // //   const [pendingRecommendations, setPendingRecommendations] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [isCameraOn, setIsCameraOn] = useState(false);
// // //   const [showConfirmation, setShowConfirmation] = useState(false);
// // //   const [selectedLanguage, setSelectedLanguage] = useState('Hindi');
// // //   const [autoUpdate, setAutoUpdate] = useState(false); // 🔘 Added auto-update toggle
// // //   const videoRef = useRef(null);
// // //   const canvasRef = useRef(null);
// // //   const intervalRef = useRef(null);
// // //   const [faceBox, setFaceBox] = useState(null);

// // //   const startCamera = async () => {
// // //     try {
// // //       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// // //       videoRef.current.srcObject = stream;
// // //       setIsCameraOn(true);
// // //       startDetection();
// // //     } catch (err) {
// // //       toast.error('Error accessing camera');
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const captureAndAnalyze = async () => {
// // //     const canvas = canvasRef.current;
// // //     const video = videoRef.current;
// // //     const ctx = canvas.getContext('2d');

// // //     canvas.width = video.videoWidth;
// // //     canvas.height = video.videoHeight;

// // //     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

// // //     canvas.toBlob(async (blob) => {
// // //       const formData = new FormData();
// // //       formData.append('image', blob, 'frame.jpg');
// // //       formData.append('language', selectedLanguage);

// // //       try {
// // //         const response = await axios.post('http://localhost:8000/emotion/emotion_detection/', formData, {
// // //           headers: {
// // //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
// // //             'Content-Type': 'multipart/form-data'
// // //           }
// // //         });

// // //         if (response.data.success) {
// // //           const videoElement = videoRef.current;
// // //           const scaleX = videoElement.offsetWidth / videoElement.videoWidth;
// // //           const scaleY = videoElement.offsetHeight / videoElement.videoHeight;

// // //           const faceCoords = response.data.face_coordinates;
// // //           if (faceCoords) {
// // //             setFaceBox({
// // //               x: faceCoords.x * scaleX,
// // //               y: faceCoords.y * scaleY,
// // //               width: faceCoords.width * scaleX,
// // //               height: faceCoords.height * scaleY
// // //             });
// // //           }

// // //           const newEmotion = response.data.emotion;
// // //           if (newEmotion !== previousEmotion) {
// // //             if (autoUpdate) {
// // //               setEmotion(newEmotion);
// // //               setPreviousEmotion(newEmotion);
// // //               setRecommendations([...response.data.recommendations]);
// // //             } else {
// // //               setPendingEmotion(newEmotion);
// // //               setPendingRecommendations([...response.data.recommendations]);
// // //               setShowConfirmation(true);
// // //             }
// // //           }
// // //         }
// // //       } catch (error) {
// // //         toast.error('Error analyzing frame');
// // //       }
// // //     }, 'image/jpeg');
// // //   };

// // //   const startDetection = () => {
// // //     if (intervalRef.current) clearInterval(intervalRef.current);
// // //     intervalRef.current = setInterval(captureAndAnalyze, 5000);
// // //     setIsLoading(false);
// // //     captureAndAnalyze();
// // //   };

// // //   const handleLanguageChange = (language) => {
// // //     setSelectedLanguage(language);
// // //     if (isCameraOn) {
// // //       captureAndAnalyze();
// // //     }
// // //   };

// // //   const handleUserChoice = (choice) => {
// // //     if (choice === 'yes') {
// // //       setEmotion(pendingEmotion);
// // //       setPreviousEmotion(pendingEmotion);
// // //       setRecommendations(pendingRecommendations);
// // //     }
// // //     setShowConfirmation(false);
// // //     setPendingEmotion('');
// // //     setPendingRecommendations([]);
// // //   };

// // //   useEffect(() => {
// // //     return () => {
// // //       if (intervalRef.current) clearInterval(intervalRef.current);
// // //       if (videoRef.current?.srcObject) {
// // //         videoRef.current.srcObject.getTracks().forEach(track => track.stop());
// // //       }
// // //     };
// // //   }, []);

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-slate-100 p-8">
// // //       <div className="max-w-7xl mx-auto">
// // //         <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-[#7dd3fc] to-[#3b82f6] bg-clip-text text-transparent tracking-wide">
// // //           AuraTunes Detection
// // //         </h1>

// // //         {/* Language Selection */}
// // //         <div className="flex justify-center gap-4 mb-4">
// // //           {['English', 'Hindi', 'Punjabi'].map((language) => (
// // //             <motion.button
// // //               key={language}
// // //               whileHover={{ scale: 1.05 }}
// // //               whileTap={{ scale: 0.95 }}
// // //               onClick={() => handleLanguageChange(language)}
// // //               className={`px-6 py-2 rounded-lg font-medium transition-all ${
// // //                 selectedLanguage === language
// // //                   ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
// // //                   : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700/70'
// // //               }`}
// // //             >
// // //               {language}
// // //             </motion.button>
// // //           ))}
// // //         </div>

// // //         {/* Auto-update Toggle */}
// // //         <div className="flex justify-center mb-6">
// // //           <label className="flex items-center gap-3 bg-slate-800/60 px-4 py-2 rounded-lg shadow shadow-slate-700/40">
// // //             <input
// // //               type="checkbox"
// // //               checked={autoUpdate}
// // //               onChange={() => setAutoUpdate(!autoUpdate)}
// // //               className="form-checkbox h-5 w-5 text-cyan-500 rounded"
// // //             />
// // //             <span className="text-slate-200 font-medium">Auto-update music on emotion change</span>
// // //           </label>
// // //         </div>

// // //         {/* Video Feed */}
// // //         <div className="relative mb-8 group">
// // //           <video
// // //             ref={videoRef}
// // //             autoPlay
// // //             muted
// // //             className="w-full h-96 object-cover rounded-xl shadow-2xl shadow-blue-900/50 border-2 border-slate-700/50"
// // //             style={{ display: isCameraOn ? 'block' : 'none' }}
// // //           />
// // //           {faceBox && (
// // //             <div
// // //               className="absolute border-4 border-emerald-400 rounded-lg shadow-lg shadow-emerald-500/30"
// // //               style={{
// // //                 left: `${faceBox.x}px`,
// // //                 top: `${faceBox.y}px`,
// // //                 width: `${faceBox.width}px`,
// // //                 height: `${faceBox.height}px`,
// // //               }}
// // //             >
// // //               <motion.div
// // //                 initial={{ scale: 0 }}
// // //                 animate={{ scale: 1 }}
// // //                 className="absolute -top-8 left-0 bg-gradient-to-br from-emerald-500 to-cyan-500 px-4 py-2 rounded-lg font-bold"
// // //               >
// // //                 <span className="text-xl text-slate-900">{emotion}</span>
// // //               </motion.div>
// // //             </div>
// // //           )}
// // //           <canvas ref={canvasRef} className="hidden" />
// // //         </div>

// // //         {!isCameraOn && (
// // //           <div className="text-center">
// // //             <motion.button
// // //               whileHover={{ scale: 1.05 }}
// // //               whileTap={{ scale: 0.95 }}
// // //               onClick={startCamera}
// // //               className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-bold tracking-wide transition-all duration-300 shadow-lg shadow-cyan-500/20"
// // //             >
// // //               {isLoading ? 'Starting Detection...' : 'Start Emotion Detection'}
// // //             </motion.button>
// // //           </div>
// // //         )}

// // //         {showConfirmation && (
// // //           <motion.div 
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             className="bg-cyan-100 text-slate-900 p-6 rounded-xl mt-6 text-center shadow-lg shadow-cyan-500/20 border-2 border-cyan-400"
// // //           >
// // //             <p className="mb-4 font-semibold text-lg">
// // //               New emotion detected: <span className="text-blue-600 font-bold">{pendingEmotion}</span>. 
// // //               <br />Do you want to update recommendations?
// // //             </p>
// // //             <div className="flex justify-center gap-6">
// // //               <motion.button
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={() => handleUserChoice('yes')}
// // //                 className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-md shadow-cyan-500/30"
// // //               >
// // //                 Yes, Update
// // //               </motion.button>
// // //               <motion.button
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={() => handleUserChoice('no')}
// // //                 className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow-md shadow-blue-500/30"
// // //               >
// // //                 No, Keep Current
// // //               </motion.button>
// // //             </div>
// // //           </motion.div>
// // //         )}

// // //         {recommendations.length > 0 && (
// // //           <motion.div 
// // //             initial={{ opacity: 0 }} 
// // //             animate={{ opacity: 1 }}
// // //             className="border-t-2 border-slate-700/50 pt-8 mt-12"
// // //           >
// // //             <div className="text-center mb-6">
// // //               <h2 className="text-2xl font-bold text-slate-100 mb-2">
// // //                 Recommended for your {emotion.toLowerCase()} mood
// // //               </h2>
// // //               <p className="text-slate-400">
// // //                 Selected language: {selectedLanguage}
// // //               </p>
// // //             </div>
// // //             <MusicPlayer recommendations={recommendations} />
// // //           </motion.div>
// // //         )}
// // //       </div>

// // //       <ToastContainer 
// // //         position="bottom-right"
// // //         toastClassName="bg-slate-800/90 text-slate-100"
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default LiveEmotionDetection;


// // //camera off normal+

// import React, { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import MusicPlayer from '../../pages/MusicPlayer';

// const LiveEmotionDetection = () => {
//   const [emotion, setEmotion] = useState('');
//   const [recommendations, setRecommendations] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isCameraOn, setIsCameraOn] = useState(false);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState('Hindi');
//   const [pendingData, setPendingData] = useState({ emotion: '', recommendations: [] });
//   const [faceBox, setFaceBox] = useState(null);
//   const [cameraError, setCameraError] = useState('');
  
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const streamRef = useRef(null);
//   const detectionInterval = useRef(null);

//   // Camera handling
//   const startCamera = async () => {
//     try {
//       setIsLoading(true);

//       // Clear any existing stream
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach(track => track.stop());
//       }
      
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: { 
//           width: { ideal: 1280 },
//           height: { ideal: 720 },
//           facingMode: 'user' 
//         } 
//       });
      
//       streamRef.current = stream;
//       const videoElement = videoRef.current;
//       if (!videoElement) {
//         throw new Error('Video element not available');
//       }
      
//       videoElement.srcObject = stream;

//       await new Promise((resolve) => {
//         const onLoaded = () => {
//           videoElement.removeEventListener('loadedmetadata', onLoaded);
//           videoElement.play().then(resolve).catch(resolve);
//         };
        
//         videoElement.addEventListener('loadedmetadata', onLoaded);
//       });

//       setIsCameraOn(true);
//       startDetection();   
//     } catch (err) {
//       console.error('Camera start error:', err);
//       setCameraError(`Camera error: ${err.message || err.name}`);
//       stopCamera();

//       let errorMsg = 'Error accessing camera'; 
//       if (err.name === 'NotAllowedError') {
//         errorMsg = 'Camera access denied. Please enable permissions in your browser settings.';
//       } else if (err.name === 'NotFoundError') {
//         errorMsg = 'No camera device found.';
//       } else if (err.name === 'OverconstrainedError') {
//         errorMsg = 'Camera constraints could not be satisfied.';
//       }
      
//       toast.error(errorMsg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => {
//         track.stop();
//       });
//       streamRef.current = null;
//     }
    
//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//     }
    
//     if (detectionInterval.current) {
//       clearInterval(detectionInterval.current);
//       detectionInterval.current = null;
//     }
    
//     setIsCameraOn(false);
//     setFaceBox(null);
//   };

//   // Detection logic
//   const startDetection = () => {
//     if (detectionInterval.current) {
//       clearInterval(detectionInterval.current);
//     }
    
//     detectionInterval.current = setInterval(() => {
//       if (document.visibilityState === 'visible') {
//         captureAndAnalyze();
//       }
//     }, 5000);
    
//     // Initial capture
//     captureAndAnalyze();
//     setIsLoading(false);
//   };

//   const captureAndAnalyze = async () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
    
//     if (!video || video.readyState < 2) {
//       toast.warn('Video not ready. Waiting for camera...');
//       return;
//     }
    
//     try {
//       // Set canvas dimensions to match video
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
      
//       const ctx = canvas.getContext('2d');
//       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
//       // Convert to blob for upload
//       const blob = await new Promise(resolve => 
//         canvas.toBlob(resolve, 'image/jpeg', 0.9)
//       );
      
//       const formData = new FormData();
//       formData.append('image', blob, 'frame.jpg');
//       formData.append('language', selectedLanguage);
      
//       // Send to backend
//       const response = await axios.post(
//         'http://localhost:8000/emotion/emotion_detection/',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );
      
//       if (response.data.success) {
//         // Scale face coordinates to match display
//         const videoElement = videoRef.current;
//         const scaleX = videoElement.offsetWidth / videoElement.videoWidth;
//         const scaleY = videoElement.offsetHeight / videoElement.videoHeight;
        
//         const faceCoords = response.data.face_coordinates;
//         if (faceCoords) {
//           setFaceBox({
//             x: faceCoords.x * scaleX,
//             y: faceCoords.y * scaleY,
//             width: faceCoords.width * scaleX,
//             height: faceCoords.height * scaleY,
//             emotion: response.data.emotion
//           });
//         }
        
//         // Show confirmation if emotion changed
//         if (response.data.emotion !== emotion) {
//           setPendingData({
//             emotion: response.data.emotion,
//             recommendations: response.data.recommendations
//           });
//           setShowConfirmation(true);
//         }
//       }
//     } catch (error) {
//       console.error('Detection error:', error);
//       toast.error(error.response?.data?.message || 'Emotion detection failed');
//     }
//   };

//   // Handle user confirmation
//   const handleUserChoice = (choice) => {
//     if (choice === 'yes') {
//       setEmotion(pendingData.emotion);
//       setRecommendations(pendingData.recommendations);
//     }
//     setShowConfirmation(false);
//   };

//   // Language change handler
//   const handleLanguageChange = (language) => {
//     setSelectedLanguage(language);
    
//     // If camera is on, restart detection with new language
//     if (isCameraOn) {
//       setRecommendations([]);
//       setEmotion('');
//       clearInterval(detectionInterval.current);
//       startDetection();
//     }
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       stopCamera();
//     };
//   }, []);

//   // Handle tab visibility changes
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.hidden && isCameraOn) {
//         stopCamera();
//       }
//     };

//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//     };
//   }, [isCameraOn]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-950 to-emerald-900 text-slate-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent tracking-wide">
//           AuraTunes Detection
//         </h1>

//         {/* Language Selection */}
//         <div className="flex justify-center gap-4 mb-8">
//           {['English', 'Hindi', 'Punjabi'].map((language) => (
//             <motion.button
//               key={language}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => handleLanguageChange(language)}
//               className={`px-6 py-2 rounded-lg font-medium transition-all ${
//                 selectedLanguage === language
//                   ? 'bg-gradient-to-r from-emerald-500 to-lime-600 text-white shadow-lg shadow-emerald-500/20'
//                   : 'bg-emerald-900/50 text-emerald-300 hover:bg-emerald-900/70'
//               }`}
//             >
//               {language}
//             </motion.button>
//           ))}
//         </div>

//         {/* Video Feed */}
//         <div className="relative mb-8 group bg-emerald-900/50 rounded-xl border border-emerald-500/30 min-h-[24rem] flex items-center justify-center">
//           {/* Video element always exists in DOM */}
//           <video
//             ref={videoRef}
//             autoPlay
//             muted
//             playsInline
//             className={`w-full h-full object-cover rounded-xl ${isCameraOn ? 'block' : 'hidden'}`}
//           />
          
//           {/* Camera off state */}
//           {!isCameraOn && (
//             <div className="text-center p-8">
//               <div className="bg-emerald-900/30 border-2 border-dashed border-emerald-500/30 rounded-xl p-12 inline-block">
//                 <p className="text-emerald-300 mb-4">
//                   {cameraError || 'Camera is off'}
//                 </p>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={startCamera}
//                   className="bg-gradient-to-r from-emerald-500 to-lime-600 hover:to-lime-700 text-white px-8 py-4 rounded-xl text-lg font-bold tracking-wide transition-all duration-300 shadow-lg shadow-emerald-500/20"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <span className="flex items-center justify-center">
//                       <span className="h-4 w-4 mr-2 border-t-2 border-b-2 border-lime-300 rounded-full animate-spin"></span>
//                       Starting Camera...
//                     </span>
//                   ) : (
//                     'Start Emotion Detection'
//                   )}
//                 </motion.button>
//               </div>
//             </div>
//           )}
          
//           {/* Face detection overlay */}
//           {isCameraOn && faceBox && (
//             <div
//               className="absolute border-4 border-emerald-400 rounded-lg shadow-lg shadow-emerald-500/30"
//               style={{
//                 left: `${faceBox.x}px`,
//                 top: `${faceBox.y}px`,
//                 width: `${faceBox.width}px`,
//                 height: `${faceBox.height}px`,
//               }}
//             >
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 className="absolute -top-8 left-0 bg-gradient-to-br from-emerald-500 to-lime-500 px-4 py-2 rounded-lg font-bold"
//               >
//                 <span className="text-xl text-slate-900">
//                   {faceBox.emotion}
//                 </span>
//               </motion.div>
//             </div>
//           )}
          
//           <canvas ref={canvasRef} className="hidden" />
//         </div>

//         {/* Confirmation Dialog */}
//         {showConfirmation && (
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-emerald-100 text-emerald-900 p-6 rounded-xl mt-6 text-center shadow-lg shadow-emerald-500/20 border-2 border-emerald-400"
//           >
//             <p className="mb-4 font-semibold text-lg">
//               New emotion detected: <span className="text-emerald-600 font-bold">{pendingData.emotion}</span>. 
//               <br />Update recommendations?
//             </p>
//             <div className="flex justify-center gap-6">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => handleUserChoice('yes')}
//                 className="bg-gradient-to-r from-emerald-500 to-lime-600 text-white px-6 py-3 rounded-lg font-bold shadow-md shadow-emerald-500/30"
//               >
//                 Yes, Update
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => handleUserChoice('no')}
//                 className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg font-bold shadow-md shadow-emerald-500/30"
//               >
//                 No, Keep Current
//               </motion.button>
//             </div>
//           </motion.div>
//         )}

//         {/* Recommendations */}
//         {recommendations.length > 0 && (
//           <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }}
//             className="border-t-2 border-emerald-500/30 pt-8 mt-12"
//           >
//             <div className="text-center mb-6">
//               <h2 className="text-2xl font-bold text-lime-200 mb-2">
//                 Recommended for your {emotion.toLowerCase()} mood
//               </h2>
//               <p className="text-emerald-300">
//                 Selected language: {selectedLanguage}
//               </p>
//             </div>
//             <MusicPlayer recommendations={recommendations} />
//           </motion.div>
//         )}

//         {/* Camera Controls */}
//         {isCameraOn && (
//           <div className="flex justify-center mt-8">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={stopCamera}
//               className="bg-gradient-to-r from-rose-600 to-amber-600 text-white px-6 py-3 rounded-lg font-bold shadow-md shadow-rose-500/30 flex items-center gap-2"
//             >
//               <span>Stop Camera</span>
//             </motion.button>
//           </div>
//         )}
//       </div>
      
//       <ToastContainer 
//         position="bottom-right"
//         toastClassName="bg-emerald-900/90 text-emerald-100 border border-emerald-500/30"
//         progressStyle={{ background: 'linear-gradient(to right, #10b981, #84cc16)' }}
//       />
//     </div>
//   );
// };

// export default LiveEmotionDetection;




// // // // // //deepseek
// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { motion } from 'framer-motion';
// // // import axios from 'axios';
// // // import { ToastContainer, toast } from 'react-toastify';
// // // import MusicPlayer from '../../pages/MusicPlayer';

// // // const LiveEmotionDetection = () => {
// // //   const [emotion, setEmotion] = useState('');
// // //   const [previousEmotion, setPreviousEmotion] = useState('');
// // //   const [pendingEmotion, setPendingEmotion] = useState('');
// // //   const [recommendations, setRecommendations] = useState([]);
// // //   const [pendingRecommendations, setPendingRecommendations] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [isCameraOn, setIsCameraOn] = useState(false);
// // //   const [showConfirmation, setShowConfirmation] = useState(false);
// // //   const [selectedLanguage, setSelectedLanguage] = useState('Hindi');
// // //   const [isAutoDetectionOn, setIsAutoDetectionOn] = useState(true);
// // //   const videoRef = useRef(null);
// // //   const canvasRef = useRef(null);
// // //   const intervalRef = useRef(null);
// // //   const [faceBox, setFaceBox] = useState(null);

// // //   const startCamera = async () => {
// // //     try {
// // //       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// // //       videoRef.current.srcObject = stream;
// // //       setIsCameraOn(true);
// // //       startDetection();
// // //     } catch (err) {
// // //       toast.error('Error accessing camera');
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const captureAndAnalyze = async () => {
// // //     const canvas = canvasRef.current;
// // //     const video = videoRef.current;
// // //     const ctx = canvas.getContext('2d');

// // //     // Set canvas dimensions to match video's intrinsic dimensions
// // //     canvas.width = video.videoWidth;
// // //     canvas.height = video.videoHeight;
    
// // //     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
// // //     canvas.toBlob(async (blob) => {
// // //       const formData = new FormData();
// // //       formData.append('image', blob, 'frame.jpg');
// // //       formData.append('language', selectedLanguage);

// // //       try {
// // //         const response = await axios.post('http://localhost:8000/emotion/emotion_detection/', formData, {
// // //           headers: {
// // //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
// // //             'Content-Type': 'multipart/form-data'
// // //           }
// // //         });

// // //         if (response.data.success) {
// // //           // Scale coordinates from backend to match displayed video size
// // //           const videoElement = videoRef.current;
// // //           const scaleX = videoElement.offsetWidth / videoElement.videoWidth;
// // //           const scaleY = videoElement.offsetHeight / videoElement.videoHeight;

// // //           const faceCoords = response.data.face_coordinates;
// // //           if (faceCoords) {
// // //             setFaceBox({
// // //               x: faceCoords.x * scaleX,
// // //               y: faceCoords.y * scaleY,
// // //               width: faceCoords.width * scaleX,
// // //               height: faceCoords.height * scaleY
// // //             });
// // //           }

// // //           const newEmotion = response.data.emotion;
// // //           if (newEmotion !== previousEmotion) {
// // //             setPendingEmotion(newEmotion);
// // //             setPendingRecommendations([...response.data.recommendations]);
// // //             setShowConfirmation(true);
// // //           }
// // //         }
// // //       } catch (error) {
// // //         toast.error('Error analyzing frame');
// // //       }
// // //     }, 'image/jpeg');
// // //   };

// // //   const startDetection = () => {
// // //     // Clear any existing interval
// // //     if (intervalRef.current) clearInterval(intervalRef.current);
    
// // //     // Start new interval with 5-second detection if auto detection is on
// // //     if (isAutoDetectionOn) {
// // //       intervalRef.current = setInterval(captureAndAnalyze, 5000);
// // //     }
// // //     setIsLoading(false);
// // //     captureAndAnalyze(); // Immediate first detection
// // //   };

// // //   const handleLanguageChange = (language) => {
// // //     setSelectedLanguage(language);
// // //     if (isCameraOn) {
// // //       // Trigger immediate detection when language changes
// // //       captureAndAnalyze();
// // //     }
// // //   };

// // //   const handleUserChoice = (choice) => {
// // //     if (choice === 'yes') {
// // //       setEmotion(pendingEmotion);
// // //       setPreviousEmotion(pendingEmotion);
// // //       setRecommendations(pendingRecommendations);
// // //     }
// // //     setShowConfirmation(false);
// // //     setPendingEmotion('');
// // //     setPendingRecommendations([]);
// // //   };

// // //   const toggleAutoDetection = () => {
// // //     setIsAutoDetectionOn(!isAutoDetectionOn);
// // //     if (isCameraOn) {
// // //       if (!isAutoDetectionOn) {
// // //         // If turning auto detection on, start the interval
// // //         intervalRef.current = setInterval(captureAndAnalyze, 5000);
// // //       } else {
// // //         // If turning auto detection off, clear the interval
// // //         if (intervalRef.current) clearInterval(intervalRef.current);
// // //       }
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     return () => {
// // //       if (intervalRef.current) clearInterval(intervalRef.current);
// // //       if (videoRef.current?.srcObject) {
// // //         videoRef.current.srcObject.getTracks().forEach(track => track.stop());
// // //       }
// // //     };
// // //   }, []);

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-slate-100 p-8">
// // //       <div className="max-w-7xl mx-auto">
// // //         <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-[#7dd3fc] to-[#3b82f6] bg-clip-text text-transparent tracking-wide">
// // //           AuraTunes Detection
// // //         </h1>
        
// // //         {/* Language Selection Buttons */}
// // //         <div className="flex justify-center gap-4 mb-8">
// // //           {['English', 'Hindi', 'Punjabi'].map((language) => (
// // //             <motion.button
// // //               key={language}
// // //               whileHover={{ scale: 1.05 }}
// // //               whileTap={{ scale: 0.95 }}
// // //               onClick={() => handleLanguageChange(language)}
// // //               className={`px-6 py-2 rounded-lg font-medium transition-all ${
// // //                 selectedLanguage === language
// // //                   ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
// // //                   : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700/70'
// // //               }`}
// // //             >
// // //               {language}
// // //             </motion.button>
// // //           ))}
// // //         </div>
        
// // //         <div className="relative mb-8 group">
// // //           <video
// // //             ref={videoRef}
// // //             autoPlay
// // //             muted
// // //             className="w-full h-96 object-cover rounded-xl shadow-2xl shadow-blue-900/50 border-2 border-slate-700/50"
// // //             style={{ display: isCameraOn ? 'block' : 'none' }}
// // //           />
          
// // //           {faceBox && (
// // //             <div
// // //               className="absolute border-4 border-emerald-400 rounded-lg shadow-lg shadow-emerald-500/30"
// // //               style={{
// // //                 left: `${faceBox.x}px`,
// // //                 top: `${faceBox.y}px`,
// // //                 width: `${faceBox.width}px`,
// // //                 height: `${faceBox.height}px`,
// // //               }}
// // //             >
// // //               <motion.div
// // //                 initial={{ scale: 0 }}
// // //                 animate={{ scale: 1 }}
// // //                 className="absolute -top-8 left-0 bg-gradient-to-br from-emerald-500 to-cyan-500 px-4 py-2 rounded-lg font-bold"
// // //               >
// // //                 <span className="text-xl text-slate-900">{emotion}</span>
// // //               </motion.div>
// // //             </div>
// // //           )}
          
// // //           <canvas ref={canvasRef} className="hidden" />
// // //         </div>

// // //         <div className="flex justify-center gap-4 mb-8">
// // //           {!isCameraOn && (
// // //             <motion.button
// // //               whileHover={{ scale: 1.05 }}
// // //               whileTap={{ scale: 0.95 }}
// // //               onClick={startCamera}
// // //               className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-bold tracking-wide transition-all duration-300 shadow-lg shadow-cyan-500/20"
// // //             >
// // //               {isLoading ? 'Starting Detection...' : 'Start Emotion Detection'}
// // //             </motion.button>
// // //           )}

// // //           {isCameraOn && (
// // //             <motion.button
// // //               whileHover={{ scale: 1.05 }}
// // //               whileTap={{ scale: 0.95 }}
// // //               onClick={toggleAutoDetection}
// // //               className={`px-6 py-3 rounded-lg font-medium transition-all ${
// // //                 isAutoDetectionOn
// // //                   ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
// // //                   : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20'
// // //               }`}
// // //             >
// // //               {isAutoDetectionOn ? 'Auto Detection: ON' : 'Auto Detection: OFF'}
// // //             </motion.button>
// // //           )}

// // //           {isCameraOn && !isAutoDetectionOn && (
// // //             <motion.button
// // //               whileHover={{ scale: 1.05 }}
// // //               whileTap={{ scale: 0.95 }}
// // //               onClick={captureAndAnalyze}
// // //               className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-bold shadow-md shadow-purple-500/30"
// // //             >
// // //               Capture Now
// // //             </motion.button>
// // //           )}
// // //         </div>

// // //         {showConfirmation && (
// // //           <motion.div 
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             className="bg-cyan-100 text-slate-900 p-6 rounded-xl mt-6 text-center shadow-lg shadow-cyan-500/20 border-2 border-cyan-400"
// // //           >
// // //             <p className="mb-4 font-semibold text-lg">
// // //               New emotion detected: <span className="text-blue-600 font-bold">{pendingEmotion}</span>. 
// // //               <br />Do you want to update recommendations?
// // //             </p>
// // //             <div className="flex justify-center gap-6">
// // //               <motion.button
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={() => handleUserChoice('yes')}
// // //                 className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-md shadow-cyan-500/30"
// // //               >
// // //                 Yes, Update
// // //               </motion.button>
// // //               <motion.button
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={() => handleUserChoice('no')}
// // //                 className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow-md shadow-blue-500/30"
// // //               >
// // //                 No, Keep Current
// // //               </motion.button>
// // //             </div>
// // //           </motion.div>
// // //         )}

// // //         {recommendations.length > 0 && (
// // //           <motion.div 
// // //             initial={{ opacity: 0 }} 
// // //             animate={{ opacity: 1 }}
// // //             className="border-t-2 border-slate-700/50 pt-8 mt-12"
// // //           >
// // //             <div className="text-center mb-6">
// // //               <h2 className="text-2xl font-bold text-slate-100 mb-2">
// // //                 Recommended for your {emotion.toLowerCase()} mood
// // //               </h2>
// // //               <p className="text-slate-400">
// // //                 Selected language: {selectedLanguage}
// // //               </p>
// // //             </div>
// // //             <MusicPlayer recommendations={recommendations} />
// // //           </motion.div>
// // //         )}
// // //       </div>
      
// // //       <ToastContainer 
// // //         position="bottom-right"
// // //         toastClassName="bg-slate-800/90 text-slate-100"
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default LiveEmotionDetection;





import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import MusicPlayer from '../../pages/MusicPlayer';

const LiveEmotionDetection = () => {
  const [emotion, setEmotion] = useState('');
  const [previousEmotion, setPreviousEmotion] = useState('');
  const [pendingEmotion, setPendingEmotion] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [pendingRecommendations, setPendingRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');
  const [autoUpdate, setAutoUpdate] = useState(false); // 🔘 Added auto-update toggle
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const [faceBox, setFaceBox] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraOn(true);
      startDetection();
    } catch (err) {
      // toast.error('Error accessing camera');
      setIsLoading(false);
    }
  };

  // New function to stop the camera
  const stopCamera = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
    setIsLoading(false);
    setFaceBox(null);
  };

  // Toggle camera on/off
  const toggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      setIsLoading(true);
      startCamera();
    }
  };

  const captureAndAnalyze = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('image', blob, 'frame.jpg');
      formData.append('language', selectedLanguage);

      try {
        const response = await axios.post('http://localhost:8000/emotion/emotion_detection/', formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.success) {
          const videoElement = videoRef.current;
          const scaleX = videoElement.offsetWidth / videoElement.videoWidth;
          const scaleY = videoElement.offsetHeight / videoElement.videoHeight;

          const faceCoords = response.data.face_coordinates;
          if (faceCoords) {
            setFaceBox({
              x: faceCoords.x * scaleX,
              y: faceCoords.y * scaleY,
              width: faceCoords.width * scaleX,
              height: faceCoords.height * scaleY
            });
          }

          const newEmotion = response.data.emotion;
          if (newEmotion !== previousEmotion) {
            if (autoUpdate) {
              setEmotion(newEmotion);
              setPreviousEmotion(newEmotion);
              setRecommendations([...response.data.recommendations]);
            } else {
              setPendingEmotion(newEmotion);
              setPendingRecommendations([...response.data.recommendations]);
              setShowConfirmation(true);
            }
          }
        }
      } catch (error) {
        // toast.error('Error analyzing frame');
      }
    }, 'image/jpeg');
  };

  const startDetection = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(captureAndAnalyze, 5000);
    setIsLoading(false);
    captureAndAnalyze();
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    if (isCameraOn) {
      captureAndAnalyze();
    }
  };

  const handleUserChoice = (choice) => {
    if (choice === 'yes') {
      setEmotion(pendingEmotion);
      setPreviousEmotion(pendingEmotion);
      setRecommendations(pendingRecommendations);
    }
    setShowConfirmation(false);
    setPendingEmotion('');
    setPendingRecommendations([]);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-[#7dd3fc] to-[#3b82f6] bg-clip-text text-transparent tracking-wide">
          AuraTunes Detection
        </h1>

        {/* Language Selection */}
        <div className="flex justify-center gap-4 mb-4">
          {['English', 'Hindi', 'Punjabi'].map((language) => (
            <button
              key={language}
              onClick={() => handleLanguageChange(language)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedLanguage === language
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700/70'
              }`}
            >
              {language}
            </button>
          ))}
        </div>

        {/* Auto-update Toggle */}
        <div className="flex justify-center mb-6">
          <label className="flex items-center gap-3 bg-slate-800/60 px-4 py-2 rounded-lg shadow shadow-slate-700/40">
            <input
              type="checkbox"
              checked={autoUpdate}
              onChange={() => setAutoUpdate(!autoUpdate)}
              className="form-checkbox h-5 w-5 text-cyan-500 rounded"
            />
            <span className="text-slate-200 font-medium">Auto-update music on emotion change</span>
          </label>
        </div>

        {/* Video Feed */}
        <div className="relative mb-8 group">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-96 object-cover rounded-xl shadow-2xl shadow-blue-900/50 border-2 border-slate-700/50"
            style={{ display: isCameraOn ? 'block' : 'none' }}
          />
          {faceBox && (
            <div
              className="absolute border-4 border-emerald-400 rounded-lg shadow-lg shadow-emerald-500/30"
              style={{
                left: `${faceBox.x}px`,
                top: `${faceBox.y}px`,
                width: `${faceBox.width}px`,
                height: `${faceBox.height}px`,
              }}
            >
              <div
                className="absolute -top-8 left-0 bg-gradient-to-br from-emerald-500 to-cyan-500 px-4 py-2 rounded-lg font-bold"
              >
                <span className="text-xl text-slate-900">{emotion}</span>
              </div>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Toggle Camera Button */}
        <div className="text-center mb-6">
          <button
            onClick={toggleCamera}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-bold tracking-wide transition-all duration-300 shadow-lg shadow-cyan-500/20"
          >
            {isCameraOn ? 'Stop Emotion Detection' : (isLoading ? 'Starting Detection...' : 'Start Emotion Detection')}
          </button>
        </div>

        {showConfirmation && (
          <div
            className="bg-cyan-100 text-slate-900 p-6 rounded-xl mt-6 text-center shadow-lg shadow-cyan-500/20 border-2 border-cyan-400"
          >
            <p className="mb-4 font-semibold text-lg">
              New emotion detected: <span className="text-blue-600 font-bold">{pendingEmotion}</span>.
              <br />Do you want to update recommendations?
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => handleUserChoice('yes')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-md shadow-cyan-500/30"
              >
                Yes, Update
              </button>
              <button
                onClick={() => handleUserChoice('no')}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow-md shadow-blue-500/30"
              >
                No, Keep Current
              </button>
            </div>
          </div>
        )}

        {recommendations.length > 0 && (
          <div
            className="border-t-2 border-slate-700/50 pt-8 mt-12"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-100 mb-2">
                Recommended for your {emotion.toLowerCase()} mood
              </h2>
              <p className="text-slate-400">
                Selected language: {selectedLanguage}
              </p>
            </div>
            <MusicPlayer recommendations={recommendations} />
          </div>
        )}
      </div>

      <ToastContainer
        position="bottom-right"
        toastClassName="bg-slate-800/90 text-slate-100"
      />
    </div>
  );
};

export default LiveEmotionDetection;
