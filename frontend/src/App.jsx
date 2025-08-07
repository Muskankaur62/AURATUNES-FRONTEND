import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginRegister from './pages/LoginRegister';
import ContactUs from './pages/ContactUs';
import FeedbackPage from './pages/FeedbackPage';
import CommunityPage from './pages/CommunityPage';
import PostDetail from './components/Community/PostDetail';
import NewPost from './components/Community/NewPost';
import MusicRecommendation from './pages/MusicRecommendation';
import DashboardPage from './pages/DashboardPage';
import Profile from './components/Dashboard/Profile';
import AboutUsPage from './pages/AboutUsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/new-post" element={<NewPost />} />
        <Route path="/community/posts/:id" element={<PostDetail />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/recommendation" element={<MusicRecommendation />} />
      </Routes>
    </Router>
  );
}

export default App;
