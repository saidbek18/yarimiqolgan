import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function NewLogin() {
  const TRACK_COUNT = 21;
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const [track, setTrack] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const musicList = Array.from({ length: TRACK_COUNT }, (_, i) =>
    process.env.PUBLIC_URL + `/Music/track${i + 1}.mp3`
  );

  // Random track tanlash
  const playRandomTrack = () => {
    const randomIndex = Math.floor(Math.random() * musicList.length);
    setTrack(musicList[randomIndex]);
  };

  useEffect(() => {
    playRandomTrack();
  }, [playRandomTrack]);

  // Start Music funksiyasi
  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.9;
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert("Parol va parolni takrorlash mos emas!");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ login, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Hisob yaratildi! Endi login sahifaga qaytasiz.");
    navigate("/login");
  };

  return (
    <div className="login-page">
      <div className={`vinyl-bg ${playing ? "spin" : ""}`}>
        <div className="vinyl-center">SPACE IT</div>
      </div>

      {/* Audio element */}
      {track && (
        <audio
          ref={audioRef}
          src={track}
          loop={false}
          preload="auto"
          onEnded={playRandomTrack}
        />
      )}

      <div className="login-box large">
        <h1 style={{ color: "cyan" }}>New Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
            <label style={{ color: "cyan" }}>Login</label>
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

          <div className="input-group">
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
            <label style={{ color: "cyan" }}>Parolni takrorlash</label>
          </div>

          <button type="submit" className="btn-login">
            Hisob yaratish
          </button>
        </form>

        <p style={{ marginTop: "10px", color: "white" }}>
          Loginingiz bormi?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", color: "cyan", fontWeight: "bold" }}
          >
            Login sahifaga qaytish
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
