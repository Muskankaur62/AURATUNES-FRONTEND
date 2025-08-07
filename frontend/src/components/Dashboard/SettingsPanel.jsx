import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SettingsPanel = () => {
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [emailData, setEmailData] = useState({
    current: '',
    new: ''
  });

  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.new !== passwordData.confirm) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      setLoadingPassword(true);
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:8000/emotion/change_password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(passwordData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update password');
      }

      toast.success(data.message || 'Password updated successfully');
      window.location.reload();
      setPasswordData({ current: '', new: '', confirm: '' });
    } catch (error) {
      toast.error(error.message || 'Error updating password');
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoadingEmail(true);
      const token = localStorage.getItem('token');

      const response = await fetch('http://127.0.0.1:8000/emotion/change_email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          current_email: emailData.current,
          new_email: emailData.new
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update email');
      }

      toast.success(data.message || 'Email updated successfully');
      setEmailData({ current: '', new: '' });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login-register');
    } catch (error) {
      toast.error(error.message || 'Error updating email');
    } finally {
      setLoadingEmail(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast */}
      <ToastContainer />

      {/* Change Password Panel */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
          Change Password
        </h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-3">
          <input
            type="password"
            name="current"
            placeholder="Current Password"
            value={passwordData.current}
            onChange={handlePasswordChange}
            className="w-full bg-slate-700/50 border border-cyan-400/30 rounded-lg px-4 py-2 text-cyan-100 focus:outline-none focus:border-cyan-400"
            required
          />
          <input
            type="password"
            name="new"
            placeholder="New Password"
            value={passwordData.new}
            onChange={handlePasswordChange}
            className="w-full bg-slate-700/50 border border-cyan-400/30 rounded-lg px-4 py-2 text-cyan-100 focus:outline-none focus:border-cyan-400"
            required
            minLength={8}
          />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm New Password"
            value={passwordData.confirm}
            onChange={handlePasswordChange}
            className="w-full bg-slate-700/50 border border-cyan-400/30 rounded-lg px-4 py-2 text-cyan-100 focus:outline-none focus:border-cyan-400"
            required
            minLength={8}
          />
          <button
            type="submit"
            disabled={loadingPassword}
            className={`w-full bg-gradient-to-br from-cyan-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-teal-700 hover:shadow-cyan-500/20 transition ${
              loadingPassword ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loadingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Change Email Panel */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
          Change Email
        </h3>
        <form onSubmit={handleEmailSubmit} className="space-y-3">
          <input
            type="email"
            name="current"
            placeholder="Current Email"
            value={emailData.current}
            onChange={handleEmailChange}
            className="w-full bg-slate-700/50 border border-cyan-400/30 rounded-lg px-4 py-2 text-cyan-100 focus:outline-none focus:border-cyan-400"
            required
          />
          <input
            type="email"
            name="new"
            placeholder="New Email"
            value={emailData.new}
            onChange={handleEmailChange}
            className="w-full bg-slate-700/50 border border-cyan-400/30 rounded-lg px-4 py-2 text-cyan-100 focus:outline-none focus:border-cyan-400"
            required
          />
          <button
            type="submit"
            disabled={loadingEmail}
            className={`w-full bg-gradient-to-br from-cyan-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-teal-700 hover:shadow-cyan-500/20 transition ${
              loadingEmail ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loadingEmail ? 'Updating...' : 'Update Email'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPanel;
