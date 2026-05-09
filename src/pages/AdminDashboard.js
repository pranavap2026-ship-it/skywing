import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

import EventsPanel from '../components/admin/EventsPanel';
import MembersPanel from '../components/admin/MembersPanel';
import SocialPanel from '../components/admin/SocialPanel';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [tab, setTab] = useState('events');

  return (
    <div className="page">
      <h2 className="section-title">ADMIN DASHBOARD</h2>

      <div className="admin-tabs">
        <button onClick={() => setTab('events')} className={tab==='events'?'active':''}>Events</button>
        <button onClick={() => setTab('members')} className={tab==='members'?'active':''}>Members</button>
        <button onClick={() => setTab('social')} className={tab==='social'?'active':''}>Social</button>
        <button className="danger" onClick={logout}>Logout</button>
      </div>

      {tab === 'events' && <EventsPanel />}
      {tab === 'members' && <MembersPanel />}
      {tab === 'social' && <SocialPanel />}
    </div>
  );
}