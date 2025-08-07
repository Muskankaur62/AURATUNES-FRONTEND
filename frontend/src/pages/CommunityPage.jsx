import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunityHero from '../components/Community/CommunityHero';
import RecentPosts from '../components/Community/RecentPosts';
import Navbar from '../components/HomePage/Navbar';

const CommunityPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login-register');
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <CommunityHero />
      <RecentPosts />
    </>
  );
};

export default CommunityPage;

