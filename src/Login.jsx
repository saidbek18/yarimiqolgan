import React, { useState, useEffect, useRef } from "react";
import "./Login.css";

export default function Login() {
  const TRACK_COUNT = 1; // qancha qo‘shiq bo‘lsa, shuncha raqam yoz
  const audioRef = useRef(null);

  // music list inside public/Music/
  const musicList = Array.from({ length: TRACK_COUNT }, (_, i) => 
    process.env.PUBLIC_URL + `/Music/track${i + 1}.mp3`
  );

  const [track, setTrack] = useState(null);
  const [playing, setPlaying] = useState(false);

  // Random musiqa tanlash
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * musicList.length);
    setTrack(musicList[randomIndex]);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (playing && audioRef.current) {
      audioRef.current.play().catch(() => {
        setPlaying(false);
      });
    }
  }, [playing]);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.9;
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="login-page">

      {/* Vinyl Background */}
      <div className={`vinyl-bg ${playing ? "spin" : ""}`}>
        <div className="vinyl-center">SPACE IT</div>
      </div>

      {/* Audio */}
      {track && <audio ref={audioRef} src={track} loop preload="auto" />}

      {/* Login Box */}
      <div className="login-box">
        <h1 className="title">SPACE <span className="it">IT</span></h1>

        <div className="input-group">
          <input required type="email" />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input required type="password" />
          <label>Password</label>
        </div>

        <button className="btn-login">LOGIN</button>
      </div>

      {/* Overlay Start Button */}
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
