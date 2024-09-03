'use client';

import React from 'react';
import { useAuth } from '../../../components/AuthProvider';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Welcome to SendEase Dashboard</h1>
      <p className="mb-4">Logged in as: {user}</p>
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
      >
        Logout
      </button>
      {/* Add more dashboard content here */}
    </div>
  );
}
