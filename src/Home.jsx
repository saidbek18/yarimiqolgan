import React from "react";
import "./Home.css"; // Banner va background uchun CSS

export default function Home() {
  return (
    <div className="home-page">
      {/* Banner */}
      <div className="banner">
        <h1 className="banner-text">
          <span className="space">SPACE</span>
          <span className="it">IT</span>
        </h1>
      </div>

      {/* Keyinchalik boshqa kontent qo‘shamiz */}
      <div className="home-content">
        <p style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
          Welcome to SPACE IT!
        </p>
      </div>
    </div>
  );
}
