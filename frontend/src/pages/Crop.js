import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell,
  PieChart, Pie,
  LineChart, Line,
  CartesianGrid,
  LabelList
} from "recharts";


function Crop() {

  const [form, setForm] = useState({
    N: "", P: "", K: "",
    temperature: "", humidity: "",
    ph: "", rainfall: ""
  });

  const [result, setResult] = useState("");

  const API_KEY = "f01b738c97d878fea95ca6eccff47493";

  // 🌦️ WEATHER
  const getWeather = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );

          const data = await res.json();

          console.log("Weather:", data);

          if (data.cod !== 200) {
            alert(data.message || "Weather error");
            return;
          }

          setForm((prev) => ({
            ...prev,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            rainfall: data.rain?.["1h"] || 0
          }));

        } catch (err) {
          alert("Weather fetch failed");
        }
      },
      () => alert("Location permission denied")
    );
  };

  // 🧾 FORM
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🌾 PREDICT
  const handleSubmit = async () => {
    try {
      const res = await fetch("https://smart-farming-backend-x4rc.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(form).map(([k, v]) => [k, Number(v)])
          )
        )
      });

      const data = await res.json();
      setResult(data.recommended_crop);

    } catch {
      alert("Backend error");
    }
  };

  // 📊 DATA
  const chartData = [
    { name: "Nitrogen", value: Number(form.N) || 0 },
    { name: "Phosphorus", value: Number(form.P) || 0 },
    { name: "Potassium", value: Number(form.K) || 0 }
  ];

  const pieData = chartData;

  const weatherData = [
    { day: "Mon", temp: 28 },
    { day: "Tue", temp: 30 },
    { day: "Wed", temp: 29 },
    { day: "Thu", temp: 32 },
    { day: "Fri", temp: 31 }
  ];

  const confidence = [
    { name: "Rice", value: 80 },
    { name: "Wheat", value: 60 },
    { name: "Maize", value: 40 }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl mb-4">🌾 Crop Recommendation</h1>

      <button
        onClick={getWeather}
        className="bg-blue-500 px-4 py-2 rounded mb-4 hover:scale-105 transition"
      >
        🌦️ Auto Fill Weather
      </button>

      <div className="grid grid-cols-2 gap-3">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key}
            className="p-2 bg-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-green-600 py-2 rounded hover:scale-105 transition"
      >
        Predict Crop
      </button>

      {result && (
        <h2 className="mt-4 text-green-400 text-xl">
          🌱 {result}
        </h2>
      )}

      {/* 📊 DASHBOARD */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">

        {/* BAR */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
          <h2 className="mb-4">📊 Soil Nutrients</h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="value" radius={[10,10,0,0]}>
                <LabelList dataKey="value" position="top" fill="#fff" />
                {chartData.map((_, i) => (
                  <Cell key={i} fill={["#22c55e","#3b82f6","#f59e0b"][i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
          <h2 className="mb-4">🥧 Distribution</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={90} label>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={["#22c55e","#3b82f6","#f59e0b"][i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LINE */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl col-span-2">
          <h2 className="mb-4">📈 Temperature Trend</h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weatherData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="day" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="#22c55e" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* 🎯 CONFIDENCE */}
      <div className="mt-10 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
        <h2 className="mb-4">🎯 Prediction Confidence</h2>

        {confidence.map((item, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span>{item.value}%</span>
            </div>

            <div className="w-full bg-zinc-800 rounded-full h-2 mt-1">
              <div
                className="h-2 rounded-full bg-green-500"
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Crop;