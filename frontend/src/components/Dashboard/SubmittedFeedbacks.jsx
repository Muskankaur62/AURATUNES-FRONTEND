import React, { useEffect, useState } from 'react';
import { Star, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';

const SubmittedFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://127.0.0.1:8000/emotion/get_user_feedbacks/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch feedbacks');
        }

        setFeedbacks(data.feedbacks || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) return <p className="text-center text-gray-400">Loading feedbacks...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Calculate statistics
  const total = feedbacks.length;
  const publishedCount = feedbacks.filter(fb => fb.publish).length;
  const unpublishedCount = total - publishedCount;
  const avgRating = feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / (total || 1);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-cyan-100">Submitted Feedbacks</h2>

      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-slate-800/80 p-4 rounded-lg border border-cyan-400/30">
            <div className="flex items-center justify-between">
              <h3 className="text-cyan-100 font-medium">Feedback #{feedback.id}</h3>
              <div className="flex items-center gap-1">
                <span className="text-sm text-slate-400">Rating:</span>
                {[...Array(feedback.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400" />
                ))}
              </div>
            </div>

            <p className="text-slate-400 text-sm mt-2">{feedback.comment}</p>

            <div className="flex items-center justify-between mt-3">
              <span className="flex items-center gap-1 text-slate-500 text-xs">
                {new Date(feedback.created_at).toLocaleDateString()}
              </span>
              <div className="flex items-center gap-1 text-xs">
                {feedback.publish ? (
                  <><Eye className="w-4 h-4 text-green-400" /><span>Published</span></>
                ) : (
                  <><EyeOff className="w-4 h-4 text-red-400" /><span>Unpublished</span></>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-slate-800/80 p-4 rounded-lg border border-cyan-400/30">
          <p className="text-slate-400 text-sm">Total Feedbacks</p>
          <p className="text-2xl font-bold text-cyan-100">{total}</p>
        </div>
        <div className="bg-slate-800/80 p-4 rounded-lg border border-cyan-400/30">
          <p className="text-slate-400 text-sm">Published</p>
          <p className="text-2xl font-bold text-green-400">{publishedCount}</p>
        </div>
        <div className="bg-slate-800/80 p-4 rounded-lg border border-cyan-400/30">
          <p className="text-slate-400 text-sm">Unpublished</p>
          <p className="text-2xl font-bold text-red-400">{unpublishedCount}</p>
        </div>
        <div className="bg-slate-800/80 p-4 rounded-lg border border-cyan-400/30">
          <p className="text-slate-400 text-sm">Average Rating</p>
          <p className="text-2xl font-bold text-yellow-400">{avgRating.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
};

export default SubmittedFeedbacks;
