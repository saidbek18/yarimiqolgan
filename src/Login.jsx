import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const TRACK_COUNT = 21;
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [track, setTrack] = useState(null);
  const [playing, setPlaying] = useState(false);

  const musicList = Array.from({ length: TRACK_COUNT }, (_, i) =>
    process.env.PUBLIC_URL + `/Music/track${i + 1}.mp3`
  );

// Random musiqa tanlash funksiyasi
const playRandomTrack = () => {
  const randomIndex = Math.floor(Math.random() * musicList.length);
  setTrack(musicList[randomIndex]);
};

// useEffect faqat sahifa yuklanganda birinchi random track
useEffect(() => {
  playRandomTrack();
}, [playRandomTrack]);


// Audio element
{track && (
  <audio
    ref={audioRef}
    src={track}
    loop={false}          // loop o'chirildi
    preload="auto"
    onEnded={playRandomTrack} // tugaganda yangi random track
    autoPlay={playing}    // agar already playing bo'lsa
  />
)}

// startMusic funksiyasi
const startMusic = () => {
  if (audioRef.current) {
    audioRef.current.volume = 0.9;
    audioRef.current.play();
    setPlaying(true);
  }
};


  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      (user) => user.login === email && user.password === password
    );
    if (found) {
      navigate("/home");
    } else {
      alert("Login yoki parol noto‘g‘ri!");
    }
  };

  return (
    <div className="login-page">
      {/* Vinyl Background */}
      <div className={`vinyl-bg ${playing ? "spin" : ""}`}>
        <div className="vinyl-center">SPACE IT</div>
      </div>

      {track && <audio ref={audioRef} src={track} loop preload="auto" />}

      <div className="login-box large">
        <h1 style={{ color: "cyan" }}>Hozirgi loginingizni kiriting</h1>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label style={{ color: "cyan" }}>Email</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label style={{ color: "cyan" }}>Password</label>
          </div>

          <button type="submit" className="btn-login">
            LOGIN
          </button>
        </form>

        <p style={{ marginTop: "10px", color: "white" }}>
          Hisobingiz yo‘qmi?{" "}
          <span
            onClick={() => navigate("/new-login")}
            style={{ cursor: "pointer", color: "cyan", fontWeight: "bold" }}
          >
            Yangi akaunt ochish
          </span>
        </p>
      </div>

      {!playing && (
        <div className="start-overlay" onClick={startMusic}>
          <div className="start-btn">
            <div className="triangle"></div>
            <span>Start Music</span>
          </div>
        </div>
      )}
    </div>
  );
}
