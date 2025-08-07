
// // // this is new code
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, ListMusic, SkipForward, Disc2, Music2, Plus, X, Loader } from 'lucide-react';
import { toast } from 'react-toastify';

const MusicPlayer = ({ recommendations = [] }) => {
  // Player state
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [creatingPlaylist, setCreatingPlaylist] = useState(false);
  const playerRef = useRef(null);

  // Process track data
  const tracks = recommendations.map(song => ({
    ...song,
    videoId: song.song_url?.split('v=')[1]?.split('&')[0] || ''
  }));

  // YouTube Player API setup
  useEffect(() => {
    if (!tracks.length) return;

    const loadYouTubeAPI = () => {
      window.onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player('youtube-player', {
          height: '100%',
          width: '100%',
          videoId: tracks[currentTrack]?.videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 0,
            modestbranding: 1,
            rel: 0
          },
          events: {
            onReady: (event) => {
              event.target.playVideo();
              setDuration(event.target.getDuration());
              startProgressUpdate();
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                startProgressUpdate();
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (event.data === window.YT.PlayerState.ENDED) {
                handleNextTrack();
              }
            }
          }
        });
      };

      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      } else {
        window.onYouTubeIframeAPIReady();
      }
    };

    loadYouTubeAPI();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [recommendations, currentTrack]);

  // Fetch playlists when modal opens
  const fetchPlaylists = async () => {
    try {
      setLoadingPlaylists(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/emotion/get_playlists/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setPlaylists(data.playlists);
      }
    } catch (error) {
      console.error('Error fetching playlists:', error);
    } finally {
      setLoadingPlaylists(false);
    }
  };

  useEffect(() => {
    if (showPlaylistModal) fetchPlaylists();
  }, [showPlaylistModal]);

  // Track progress updater
  const startProgressUpdate = () => {
    const interval = setInterval(() => {
      if (playerRef.current?.getCurrentTime) {
        const time = playerRef.current.getCurrentTime();
        const dur = playerRef.current.getDuration();
        setCurrentTime(time);
        setProgress((time / dur) * 100);
      }
    }, 1000);
    return () => clearInterval(interval);
  };

  // Control handlers
  const handlePlayPause = () => {
    if (!playerRef.current) return;
    isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (playerRef.current) playerRef.current.setVolume(newVolume);
  };

  const handleSeek = (e) => {
    if (!playerRef.current) return;
    const seekTime = (e.target.value / 100) * duration;
    playerRef.current.seekTo(seekTime, true);
  };

  const handleTrackChange = (index) => {
    setCurrentTrack(index);
    if (playerRef.current) {
      playerRef.current.loadVideoById(tracks[index].videoId);
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    const nextTrack = (currentTrack + 1) % tracks.length;
    handleTrackChange(nextTrack);
  };

  // Playlist management
  const handleAddToPlaylist = async (playlistId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/emotion/add_song_to_playlist/${playlistId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recommendation_id: selectedTrackId,
        }),
      });

      if (response.ok) {
        setShowPlaylistModal(false);
      }
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    }
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return;

    try {
      setCreatingPlaylist(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/emotion/create_playlist/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newPlaylistName
        }),
      });

      if (response.ok) {
        toast.success('Playlist created successfully!');
        setNewPlaylistName('');
        setShowCreatePlaylist(false);
        setShowPlaylistModal(true);
      }

      await fetchPlaylists();
    } catch (error) {
      console.error('Error creating playlist:', error);
    } finally {
      setCreatingPlaylist(false);
    }
  };
  


  // Time formatter
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 p-4 md:p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-cyan-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              rotate: Math.random() * 360
            }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              borderRadius: ['30%', '50%', '30%'],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Player Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="xl:col-span-3 bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-cyan-400/30 shadow-cyan-500/20 shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Album Art */}
              <div className="relative flex-shrink-0 w-full lg:w-80">
                <div className="aspect-square rounded-2xl overflow-hidden border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-900/50 to-emerald-900/50">
                  <div id="youtube-player" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-cyan-900/80 backdrop-blur-sm px-4 py-1 rounded-full border border-cyan-500/30">
                  <span className="text-xs font-medium bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    Now Playing
                  </span>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex-1 space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                    {tracks[currentTrack]?.song_title || 'No track selected'}
                  </h2>
                  <div className="flex justify-center gap-3 text-cyan-300">
                    <span className="flex items-center gap-1 bg-cyan-900/30 px-3 py-1 rounded-full text-xs">
                      <Music2 className="w-3 h-3" />
                      <span>{formatTime(currentTime)}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-cyan-900/30 px-3 py-1 rounded-full text-xs">
                      <Disc2 className="w-3 h-3" />
                      <span>{formatTime(duration)}</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className="w-full h-2 bg-cyan-900/30 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400"
                  />

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <Volume2 className="w-5 h-5 text-cyan-400" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="flex-1 h-1 bg-cyan-900/30 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePlayPause}
                        className="p-3 md:p-4 rounded-xl bg-cyan-900/50 hover:bg-cyan-900/70 border border-cyan-500/30"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 text-cyan-300" />
                        ) : (
                          <Play className="w-6 h-6 text-cyan-300" />
                        )}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextTrack}
                        className="p-3 rounded-xl bg-cyan-900/50 hover:bg-cyan-900/70 border border-cyan-500/30"
                      >
                        <SkipForward className="w-5 h-5 text-cyan-300" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Playlist Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-900/40 backdrop-blur-lg rounded-3xl p-4 border border-cyan-500/30 h-[calc(100vh-120px)] overflow-y-auto"
          >
            <div className="flex items-center gap-2 mb-4 px-2">
              <ListMusic className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                Aura Playlist
              </h3>
            </div>

            <div className="space-y-2">
              {tracks.map((track, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    index === currentTrack
                      ? 'bg-cyan-900/30 border border-cyan-500/40 shadow-md shadow-cyan-900/10'
                      : 'hover:bg-slate-800/20'
                  }`}
                  onClick={() => handleTrackChange(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={track.song_thumbnail}
                        alt={track.song_title}
                        className="w-12 h-12 rounded-lg object-cover border border-cyan-500/20"
                      />
                      {index === currentTrack && (
                        <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-[1px] rounded-lg" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-100 truncate text-sm">
                        {track.song_title}
                      </p>
                      <p className="text-xs text-cyan-400 truncate">
                        {track.artist || 'Unknown Artist'}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTrackId(track.id);
                        setShowPlaylistModal(true);
                      }}
                      className="p-1 hover:bg-cyan-900/30 rounded-full text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Playlist Modal */}
      {showPlaylistModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-cyan-500/30"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-cyan-300">Add to Playlist</h3>
              <button
                onClick={() => {
                  setShowPlaylistModal(false);
                  setShowCreatePlaylist(false);
                }}
                className="p-1 hover:bg-slate-800/50 rounded-full text-cyan-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!showCreatePlaylist ? (
              <>
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setShowCreatePlaylist(true)}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Create New Playlist
                  </button>
                </div>

                {loadingPlaylists ? (
                  <div className="flex justify-center py-8">
                    <Loader className="animate-spin text-cyan-400" />
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                    {playlists.map((playlist) => (
                      <motion.div
                        key={playlist.id}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl bg-slate-800/20 hover:bg-slate-800/40 cursor-pointer transition-colors"
                        onClick={() => handleAddToPlaylist(playlist.id)}
                      >
                        <div className="flex items-center gap-3">
                          <ListMusic className="w-5 h-5 text-cyan-400" />
                          <span className="font-medium text-cyan-100">{playlist.name}</span>
                        </div>
                        <div className="text-sm text-cyan-400/70 mt-1">
                          {playlist.songs.length} songs
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-cyan-300">Create New Playlist</h4>
                <input
                  type="text"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  placeholder="Enter playlist name"
                  className="w-full px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-cyan-100"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowCreatePlaylist(false)}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors text-cyan-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreatePlaylist}
                    disabled={creatingPlaylist || !newPlaylistName.trim()}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-600/50 rounded-lg text-sm font-medium transition-colors"
                  >
                    {creatingPlaylist ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
