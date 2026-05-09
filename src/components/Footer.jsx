import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaTelegramPlane,
  FaInstagram,
  FaYoutube,
  FaGithub
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      
      <h2 className="footer-logo">SKYWING</h2>

      <div className="footer-grid">

        {/* NAV */}
        <div>
          <h4 className="footer-heading">NAVIGATION</h4>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/events">Events</Link>
            <Link to="/team">Team</Link>
            <Link to="/social">Social</Link>
          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h4 className="footer-heading">CONNECT</h4>
          <div className="footer-social">
            <a href="#"><FaTelegramPlane /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaGithub /></a>
          </div>
        </div>

        {/* UPDATES */}
        <div>
          <h4 className="footer-heading">LATEST UPDATES</h4>
          <div className="footer-feed">
            <p>📸 New event photos uploaded</p>
            <p>🎬 Video highlights released</p>
            <p>🎉 Arts Fest coverage live</p>
          </div>
        </div>

      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} Skywing Media Team. All rights reserved.
      </p>
    </footer>
  );
}