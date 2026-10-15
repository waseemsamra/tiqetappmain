'use client';

import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { getUpcomingBookingsForUser, getPastBookingsForUser } from '@/app/actions';

const COLORS = {
  blue: '#58c0e8',
  yellow: '#ebbe46',
  red: '#db5e60',
  green: '#a6ce5e',
  border: '#eeeeee',
  text: '#666666',
  heading: '#444444',
};

const StatCard = ({
  title,
  value,
  icon,
  color,
  link,
}: {
  title: string;
  value: string | number;
  icon: string;
  color: 'blue' | 'yellow' | 'red' | 'green';
  link?: string;
}) => {
  return (
    <div
      style={{
        padding: '25px 20px',
        color: '#fff',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '140px',
        backgroundColor: COLORS[color],
        borderRadius: '8px',
      }}
    >
      <div style={{ fontSize: '36px', opacity: 0.6, position: 'absolute', left: '20px', top: '25px' }}>
        <i className={`fa-solid ${icon}`} />
      </div>
      <div style={{ textAlign: 'right', position: 'relative', zIndex: 2 }}>
        <h2 style={{ fontWeight: 300, fontSize: '32px', marginBottom: '5px' }}>{value}</h2>
        <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</p>
      </div>
      {link && (
        <a
          href={link}
          style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '10px',
            textTransform: 'uppercase',
            textAlign: 'right',
            marginTop: 'auto',
            display: 'block',
            letterSpacing: '0.5px',
          }}
        >
          View <i className="fa-solid fa-arrow-right" style={{ marginLeft: '5px' }} />
        </a>
      )}
    </div>
  );
};

const InfoBox = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: `1px solid ${COLORS.blue}`,
        padding: '20px',
        marginBottom: '25px',
        position: 'relative',
        color: COLORS.text,
        lineHeight: '1.8',
        fontSize: '13px',
      }}
    >
      <button
        onClick={() => setVisible(false)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '15px',
          background: 'none',
          border: 'none',
          color: COLORS.blue,
          cursor: 'pointer',
          fontSize: '18px',
        }}
      >
        &times;
      </button>
      <p>
        This is your Dashboard, the place to check your Profile, respond to Reservation Requests,
        view upcoming Trip Information, and much more.
      </p>
      <ul style={{ listStyle: 'none', marginTop: '10px' }}>
        <li>
          <a href="#" style={{ color: COLORS.blue, textDecoration: 'none' }}>
            Learn How It Works
          </a>{' '}
          – Watch a short video that shows you how AAFare works.
        </li>
        <li>
          <a href="#" style={{ color: COLORS.blue, textDecoration: 'none' }}>
            Get Help
          </a>{' '}
          – View our help section and FAQs to get started on AAFare.
        </li>
      </ul>
    </div>
  );
};

const TripStatsGrid = ({ userId }: { userId: string }) => {
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [pastCount, setPastCount] = useState(0);

  useEffect(() => {
    if (!userId) return;
    getUpcomingBookingsForUser(userId, 100).then((bookings) => {
      setUpcomingCount(bookings.length);
    });
    getPastBookingsForUser().then((bookings) => {
      setPastCount(bookings.length);
    });
  }, [userId]);

  const totalBookings = upcomingCount + pastCount;
  const totalSpent = pastCount * 240 + upcomingCount * 180;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
      <StatCard title="Hotels to Stay" value={1570} icon="fa-hotel" color="blue" link="#" />
      <StatCard title="Airlines to Travel" value={4509} icon="fa-plane" color="yellow" link="#" />
      <StatCard title="Trips Booked" value={totalBookings} icon="fa-suitcase" color="red" link="/dashboard/bookings" />
      <StatCard title="Total Spent" value={'$' + totalSpent.toLocaleString()} icon="fa-coins" color="green" link="#" />
    </div>
  );
};

const NotificationsSection = () => {
  const notifications = [
    { id: 1, icon: 'fa-plane', bg: COLORS.yellow, text: 'London to Paris flight in', price: '$120', time: 'JUST NOW' },
    { id: 2, icon: 'fa-hotel', bg: COLORS.blue, text: 'Hilton hotel & resorts in', price: '$247', time: '10 MINS AGO' },
    { id: 3, icon: 'fa-car', bg: COLORS.red, text: 'Economy car for 2 days in', price: '$39', time: '39 MINS AGO' },
    { id: 4, icon: 'fa-ship', bg: COLORS.green, text: 'Baja Mexico 4 nights in', price: '$537', time: '1 HOUR AGO' },
  ];

  return (
    <div style={{ flex: 1 }}>
      <h3 style={{ color: COLORS.heading, fontWeight: 400, marginBottom: '20px', fontSize: '18px' }}>Notifications</h3>
      <ul style={{ listStyle: 'none' }}>
        {notifications.map((n) => (
          <li
            key={n.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f8f9fa',
              marginBottom: '8px',
              padding: '12px 15px',
              fontSize: '13px',
            }}
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                marginRight: '15px',
                fontSize: '12px',
                backgroundColor: n.bg,
              }}
            >
              <i className={`fa-solid ${n.icon}`} />
            </div>
            <div style={{ flex: 1, color: '#666' }}>
              {n.text} <span style={{ color: COLORS.blue, fontWeight: 600 }}>{n.price}</span>
            </div>
            <div style={{ fontSize: '10px', color: '#aaa', textTransform: 'uppercase', fontWeight: 600 }}>
              {n.time}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const RecentActivitySection = () => {
  const activities = [
    { id: 1, icon: 'fa-plane', title: 'Indianapolis to Paris', subtitle: 'ONEWAY FLIGHT', label: 'AVG/PERSON', amount: '$120' },
    { id: 2, icon: 'fa-car', title: 'Economy Car', subtitle: 'BMW MINI', label: 'PER DAY', amount: '$45.39' },
    { id: 3, icon: 'fa-ship', title: 'Jacksonville to Asia', subtitle: '4 NIGHTS', label: 'FROM', amount: '$578' },
  ];

  return (
    <div style={{ flex: 1 }}>
      <h3 style={{ color: COLORS.heading, fontWeight: 400, marginBottom: '20px', fontSize: '18px' }}>Recent Activity</h3>
      <div style={{ border: `1px solid ${COLORS.border}`, padding: '10px 15px', marginBottom: '15px' }}>
        {activities.map((a) => (
          <div
            key={a.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: `1px solid ${COLORS.border}`,
              padding: '15px 0',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                border: `1px solid ${COLORS.border}`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: COLORS.yellow,
                marginRight: '15px',
                fontSize: '16px',
              }}
            >
              <i className={`fa-solid ${a.icon}`} />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ color: '#555', marginBottom: '3px', fontSize: '14px', fontWeight: 400 }}>{a.title}</h4>
              <span style={{ fontSize: '10px', color: '#aaa', textTransform: 'uppercase' }}>{a.subtitle}</span>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <span style={{ display: 'block', fontSize: '9px', color: '#aaa', textTransform: 'uppercase' }}>{a.label}</span>
              <span style={{ fontSize: '18px', color: COLORS.green, fontWeight: 600 }}>{a.amount}</span>
            </div>
          </div>
        ))}
      </div>
      <button
        style={{
          width: '100%',
          backgroundColor: COLORS.green,
          color: '#fff',
          border: 'none',
          padding: '12px',
          fontSize: '11px',
          cursor: 'pointer',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        VIEW ALL ACTIVITIES
      </button>
    </div>
  );
};

const TravelStoriesSection = () => {
  return (
    <div style={{ maxWidth: '900px' }}>
      <h1 style={{ marginBottom: '30px' }}>Share Your Story</h1>
      <form>
        <div style={{ display: 'flex', gap: '30px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '20px' }}>
            <label style={{ fontSize: '11px', color: COLORS.text, textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>
              STORY TITLE
            </label>
            <input type="text" style={{ backgroundColor: '#f8f9fa', border: '1px solid #eee', padding: '12px', fontFamily: 'inherit', fontSize: '13px', color: '#555', width: '100%' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '20px' }}>
            <label style={{ fontSize: '11px', color: COLORS.text, textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>
              NAME
            </label>
            <input type="text" style={{ backgroundColor: '#f8f9fa', border: '1px solid #eee', padding: '12px', fontFamily: 'inherit', fontSize: '13px', color: '#555', width: '100%' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '30px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '20px' }}>
            <label style={{ fontSize: '11px', color: COLORS.text, textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>
              SELECT MILES
            </label>
            <select style={{ backgroundColor: '#f8f9fa', border: '1px solid #eee', padding: '12px', fontFamily: 'inherit', fontSize: '13px', color: '#555', width: '100%' }}>
              <option>4,528 Miles</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '20px' }}>
            <label style={{ fontSize: '11px', color: COLORS.text, textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>
              EMAIL ADDRESS
            </label>
            <input type="email" style={{ backgroundColor: '#f8f9fa', border: '1px solid #eee', padding: '12px', fontFamily: 'inherit', fontSize: '13px', color: '#555', width: '100%' }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '20px' }}>
          <label style={{ fontSize: '11px', color: COLORS.text, textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>
            TYPE YOUR STORY
          </label>
          <textarea rows={6} placeholder="please tell us about you" style={{ backgroundColor: '#f8f9fa', border: '1px solid #eee', padding: '12px', fontFamily: 'inherit', fontSize: '13px', color: '#555', width: '100%', resize: 'vertical' }} />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: COLORS.green, color: '#fff', border: 'none', padding: '12px 30px', fontSize: '12px', cursor: 'pointer', textTransform: 'uppercase', fontWeight: 600 }}
        >
          SUBMIT REVIEW
        </button>
      </form>
    </div>
  );
};

const SettingsSection = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    supabase.auth.updateUser({ password: newPassword }).then(() => {
      alert('Password updated successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    });
  };

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>Account Settings</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '50px', borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '30px', maxWidth: '700px' }}>
          <h3 style={{ color: COLORS.blue, fontSize: '18px', marginBottom: '20px', fontWeight: 400 }}>Change Your Password</h3>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '11px', color: COLORS.text, textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600, display: 'block' }}>OLD PASSWORD</label>
            <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} style={{ backgroundColor: '#f8f9fa', border: '1px solid #eee', padding: '12px', fontFamily: 'inherit', fontSize: '13px', color: '#555', width: '100%' }} required />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '11px', color: COLORS.text, textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600, display: 'block' }}>ENTER NEW PASSWORD</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ backgroundColor: '#f8f9fa', border: '1px solid #eee', padding: '12px', fontFamily: 'inherit', fontSize: '13px', color: '#555', width: '100%' }} required />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '11px', color: COLORS.text, textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600, display: 'block' }}>CONFIRM NEW PASSWORD</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ backgroundColor: '#f8f9fa', border: '1px solid #eee', padding: '12px', fontFamily: 'inherit', fontSize: '13px', color: '#555', width: '100%' }}
              required
              pattern={newPassword}
              onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Passwords do not match')}
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
            />
          </div>
          <button
            type="submit"
            style={{ backgroundColor: COLORS.green, color: '#fff', border: 'none', padding: '12px 30px', fontSize: '12px', cursor: 'pointer', textTransform: 'uppercase', fontWeight: 600 }}
          >
            UPDATE PASSWORD
          </button>
        </div>
      </form>
    </div>
  );
};

const ProfileSection = ({
  user,
  userName,
}: {
  user: any;
  userName: string;
}) => {
  const profileData = user.user_metadata || {};
  const details = [
    { label: 'EMAIL', val: user.email || '' },
    { label: 'FULL NAME', val: profileData.full_name || userName },
    { label: 'PHONE', val: profileData.phone || 'Not set' },
    { label: 'DATE OF BIRTH', val: profileData.date_of_birth || 'Not set' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', gap: '40px', marginBottom: '40px', alignItems: 'flex-start' }}>
        <div
          style={{
            width: '150px',
            height: '150px',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {profileData.avatar_url ? (
            <Image src={profileData.avatar_url} alt={userName} width={150} height={150} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          ) : (
            <User style={{ width: '60px', height: '60px', color: '#999' }} />
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px',
              borderBottom: `1px solid ${COLORS.border}`,
              paddingBottom: '15px',
            }}
          >
            <h1 style={{ fontWeight: 300, color: COLORS.heading, fontSize: '28px' }}>{userName}</h1>
            <Link
              href="/dashboard/profile"
              style={{
                backgroundColor: '#e0e0e0',
                color: '#fff',
                border: 'none',
                padding: '8px 20px',
                fontSize: '10px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              EDIT PROFILE
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 2fr', gap: '15px 10px', fontSize: '12px' }}>
            {details.map((d, i) => (
              <React.Fragment key={i}>
                <div style={{ color: COLORS.blue, textTransform: 'uppercase', fontSize: '10px', paddingTop: '3px' }}>{d.label}:</div>
                <div style={{ color: '#666', textTransform: 'uppercase', fontSize: '11px' }}>{d.val}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: COLORS.blue, fontSize: '18px', marginBottom: '20px', fontWeight: 400 }}>About You</h3>
        <p style={{ lineHeight: '1.8', color: COLORS.text, fontSize: '13px' }}>
          Welcome to your AAFare profile. Manage your personal information, travel preferences,
          and documents. Your loyalty points and wallet balance help you save on every booking.
        </p>
      </div>
    </div>
  );
};

const TabNav = ({ active, onChange }: { active: string; onChange: (s: string) => void }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-gauge-high' },
    { id: 'profile', label: 'Profile', icon: 'fa-user' },
    { id: 'booking', label: 'Bookings', icon: 'fa-suitcase' },
    { id: 'stories', label: 'Travel Stories', icon: 'fa-users' },
    { id: 'settings', label: 'Settings', icon: 'fa-lock' },
  ];

  return (
    <div style={{ display: 'flex', gap: '30px', borderBottom: `1px solid ${COLORS.border}`, marginBottom: '30px', paddingBottom: '15px' }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            background: 'none',
            border: 'none',
            padding: '10px 5px',
            cursor: 'pointer',
            borderBottom: `2px solid ${active === tab.id ? COLORS.yellow : 'transparent'}`,
            color: active === tab.id ? COLORS.heading : '#888',
            fontSize: '12px',
            fontWeight: active === tab.id ? 600 : 'normal',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <i className={`fa-solid ${tab.icon}`} style={{ fontSize: '14px' }} />
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default function AAFareDashboard({ user, userName }: { user: any; userName: string }) {
  const userId = user?.id || '';

  return (
    <div style={{ padding: '20px 0', fontSize: '16px' }}>
      <section>
        <div className="header" style={{ marginBottom: '30px' }}>
          <h1 style={{ color: COLORS.blue, fontWeight: 300, marginBottom: '5px', fontSize: '26px' }}>
            Hi {userName}, Welcome to AAFare!
          </h1>
          <p style={{ color: '#999' }}>
            All your trips booked with us will appear here and you'll be able to manage everything!
          </p>
        </div>

        <TripStatsGrid userId={userId} />

        <InfoBox />

        <div style={{ display: 'flex', gap: '40px', marginBottom: '50px' }}>
          <NotificationsSection />
          <RecentActivitySection />
        </div>

        <div
          style={{
            display: 'flex',
            gap: '40px',
            marginTop: '40px',
            borderTop: `1px solid ${COLORS.border}`,
            paddingTop: '30px',
          }}
        >
          <div style={{ flex: 1 }}>
            <h3 style={{ color: COLORS.heading, fontSize: '16px', marginBottom: '15px', fontWeight: 400 }}>Benefits of AAFare Account</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '10px', fontSize: '12px', color: COLORS.text }}>
                <i className="fa-solid fa-caret-right" style={{ color: COLORS.blue, fontSize: '10px', marginRight: '8px' }} /> Faster bookings with fewer clicks
              </li>
              <li style={{ marginBottom: '10px', fontSize: '12px', color: COLORS.text }}>
                <i className="fa-solid fa-caret-right" style={{ color: COLORS.blue, fontSize: '10px', marginRight: '8px' }} /> Track travel history & manage bookings
              </li>
              <li style={{ marginBottom: '10px', fontSize: '12px', color: COLORS.text }}>
                <i className="fa-solid fa-caret-right" style={{ color: COLORS.blue, fontSize: '10px', marginRight: '8px' }} /> Manage profile & personalize experience
              </li>
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ color: COLORS.heading, fontSize: '16px', marginBottom: '15px', fontWeight: 400 }}>Need AAFare Help?</h3>
            <p style={{ color: COLORS.text, fontSize: '13px', lineHeight: '1.8' }}>
              We would be more than happy to help you. Our team advisors are 24/7 at your service.
            </p>
            <div style={{ color: COLORS.blue, fontSize: '18px', marginTop: '10px' }}>
              <i className="fa-solid fa-phone" style={{ color: COLORS.blue, marginRight: '10px' }} /> 1-800-123-HELLO
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
