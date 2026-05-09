import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">SKY<span>WING</span></Link>
      <ul className="nav-links">
        {[['/', 'Home'], ['/events', 'Events'], ['/team', 'Team'], ['/social', 'Connect']].map(([path, label]) => (
          <li key={path}><Link to={path} className={pathname === path ? 'active' : ''}>{label}</Link></li>
        ))}
        {isAdmin && <li><Link to="/admin" className={pathname === '/admin' ? 'active' : ''}>⚡ Admin</Link></li>}
        {user
          ? <li><button onClick={handleLogout} className="btn btn-secondary btn-sm" style={{cursor:'pointer'}}>Logout</button></li>
          : <li><Link to="/login" className="btn btn-primary btn-sm">Admin</Link></li>}
      </ul>
    </nav>
  );
}
