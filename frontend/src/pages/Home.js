import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [disease, setDisease] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // ---------------- CAMERA ----------------
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraOn(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 300);

    } catch {
      alert("Camera permission denied");
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || video.videoWidth === 0) return alert("Wait...");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      const file = new File([blob], "capture.png");
      setFile(file);
      setPreview(URL.createObjectURL(file));
    });

    video.srcObject.getTracks().forEach(track => track.stop());
    setCameraOn(false);
  };

  // ---------------- DETECT ----------------
  const handleDetect = async () => {
    if (!file) return alert("Upload image");

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("https://smart-farming-backend-x4rc.onrender.com", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setDisease(data.disease);
    setDesc(data.description);

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* 🌈 Animated Background */}
      <div className="absolute w-[500px] h-[500px] bg-green-500/30 blur-3xl rounded-full top-0 left-0 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-500/30 blur-3xl rounded-full bottom-0 right-0 animate-pulse"></div>

      {/* 🌐 NAVBAR */}
      <div className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/5 border-b border-white/10 z-50 px-10 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">🌾 SmartFarm AI</h1>

        <div className="flex gap-6 text-gray-300">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/crop")}>Crop</button>
        </div>
      </div>

      <div className="pt-24">

        {/* 🔥 HERO */}
        <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20">

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-lg"
          >
            <h1 className="text-6xl font-bold leading-tight">
              Future of <br />
              <span className="text-green-400">Smart Farming</span>
            </h1>

            <p className="mt-4 text-gray-400">
              AI-powered crop recommendation & plant disease detection.
            </p>

            <button
              onClick={() => document.getElementById("detect").scrollIntoView({ behavior: "smooth" })}
              className="mt-6 px-6 py-3 bg-green-600 rounded-xl hover:scale-105 transition"
            >
              Try Now 🚀
            </button>
          </motion.div>

          <motion.img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef"
            alt="farm"
            className="w-96 rounded-2xl shadow-2xl mt-10 md:mt-0"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
        </section>

        {/* 🚀 FEATURES */}
        <section className="grid md:grid-cols-3 gap-6 px-10">

          {[
            "🌾 Crop Recommendation",
            "📸 Disease Detection",
            "🌦️ Weather Insights"
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl"
            >
              <h3 className="text-xl font-semibold">{f}</h3>
              <p className="text-gray-400 mt-2">
                Smart AI feature for modern farming.
              </p>
            </motion.div>
          ))}

        </section>

        {/* 📸 DETECTION */}
        <section id="detect" className="p-10 max-w-xl mx-auto">

          <h2 className="text-3xl mb-6">📸 Detect Disease</h2>

          {/* CAMERA */}
          <div className="flex gap-4 mb-4">
            <button onClick={startCamera} className="flex-1 bg-purple-600 py-2 rounded-lg">
              📷 Camera
            </button>

            {cameraOn && (
              <button onClick={capturePhoto} className="flex-1 bg-green-600 py-2 rounded-lg">
                📸 Capture
              </button>
            )}
          </div>

          {cameraOn && (
            <video ref={videoRef} autoPlay className="w-full h-52 rounded mb-4" />
          )}

          <canvas ref={canvasRef} className="hidden"></canvas>

          {/* PREVIEW */}
          {preview && (
            <img src={preview} alt="preview" className="w-full h-52 object-cover rounded mb-4" />
          )}

          {/* UPLOAD */}
          <input type="file" onChange={(e) => {
            const f = e.target.files[0];
            setFile(f);
            setPreview(URL.createObjectURL(f));
          }} className="mb-4" />

          {/* BUTTON */}
          <button
            onClick={handleDetect}
            className="w-full bg-blue-600 py-3 rounded-lg"
          >
            {loading ? "Detecting..." : "Detect Disease"}
          </button>

          {/* RESULT */}
          {disease && (
            <div className="mt-4 bg-zinc-800 p-4 rounded">
              <h3 className="text-green-400 text-xl">{disease}</h3>
              <p className="text-gray-300">{desc}</p>
            </div>
          )}

        </section>

      </div>
    </div>
  );
}

export default Home;