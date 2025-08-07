//create playlist from button, delete playlist, delete song from playlist, view song details
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ListMusic, Music, Plus, ChevronDown, ChevronRight, Play, Trash, X } from 'lucide-react';
import { toast } from 'react-toastify';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showNewInput, setShowNewInput] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/emotion/get_playlists/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setPlaylists(data.playlists);
      } else {
        toast.error(data.message || 'Failed to fetch playlists');
      }
    } catch {
      toast.error('Error fetching playlists');
    } finally {
      setLoading(false);
    }
  };

  const togglePlaylist = (playlistId) => {
    setExpandedPlaylist(expandedPlaylist === playlistId ? null : playlistId);
  };

  const createPlaylist = async () => {
    if (!newPlaylistName.trim()) return;
    try {
      const res = await fetch('http://localhost:8000/emotion/create_playlist/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newPlaylistName }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewPlaylistName('');
        setShowNewInput(false);
        fetchPlaylists();
        toast.success('Playlist created');
      } else {
        toast.error(data.message || 'Failed to create playlist');
      }
    } catch {
      toast.error('Error creating playlist');
    }
  };

  const deletePlaylist = async (playlistId) => {
    try {
      const res = await fetch(`http://localhost:8000/emotion/delete_playlist/${playlistId}/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        fetchPlaylists();
        toast.success('Playlist deleted');
      } else {
        toast.error(data.message || 'Failed to delete playlist');
      }
    } catch {
      toast.error('Error deleting playlist');
    }
  };

  const deleteSong = async (playlistId, songId) => {
    try {
      const res = await fetch(`http://localhost:8000/emotion/delete_song_from_playlist/${playlistId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ song_id: songId }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchPlaylists();
        toast.success('Song removed from playlist');
      } else {
        toast.error(data.message || 'Failed to delete song');
      }
    } catch {
      toast.error('Error deleting song');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent flex items-center gap-2">
          <ListMusic className="text-cyan-400" />
          My Playlists
        </h2>
        {showNewInput ? (
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Playlist name"
              className="px-3 py-1 rounded-lg text-sm bg-slate-700 text-white border border-cyan-500 focus:outline-none"
            />
            <button onClick={createPlaylist} className="px-3 py-1 bg-cyan-600 text-white rounded-md text-sm font-medium">
              Create
            </button>
            <button onClick={() => setShowNewInput(false)} className="text-red-400">
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowNewInput(true)}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 rounded-lg text-sm font-medium flex items-center gap-2 text-white"
          >
            <Plus size={16} />
            New Playlist
          </button>
        )}
      </div>

      {playlists.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <Music className="mx-auto h-12 w-12 text-cyan-400" />
          <p className="mt-4">You don't have any playlists yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {playlists.map((playlist) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/80 rounded-xl border border-cyan-500/30 overflow-hidden shadow-cyan-500/10"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-cyan-500/10 transition-colors"
                onClick={() => togglePlaylist(playlist.id)}
              >
                <div className="flex items-center gap-3">
                  {expandedPlaylist === playlist.id ? <ChevronDown className="text-cyan-400" /> : <ChevronRight className="text-cyan-400" />}
                  <h3 className="font-medium text-cyan-100">{playlist.name}</h3>
                  <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full">
                    {playlist.songs.length} songs
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>Created: {new Date(playlist.created_at).toLocaleDateString()}</span>
                  <button onClick={(e) => { e.stopPropagation(); deletePlaylist(playlist.id); }}>
                    <Trash size={16} className="text-red-400 hover:text-red-300" />
                  </button>
                </div>
              </div>

              {expandedPlaylist === playlist.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-slate-800/50 border-t border-cyan-500/30">
                  <div className="divide-y divide-cyan-500/30">
                    {playlist.songs.length > 0 ? (
                      playlist.songs.map((song) => (
                        <div key={song.id} className="p-4 hover:bg-cyan-500/10 transition-colors flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <img src={song.thumbnail_url} alt={song.title} className="w-12 h-12 rounded-lg object-cover" />
                              <button className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/50 rounded-lg transition-opacity">
                                <Play className="text-cyan-400" size={16} />
                              </button>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-300">{song.title}</h4>
                              <p className="text-xs text-gray-400 mt-1">
                                Added: {new Date(song.added_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-3 items-center">
                            <a href={song.url} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:text-cyan-300">
                              View
                            </a>
                            <button onClick={() => deleteSong(playlist.id, song.id)}>
                              <Trash size={14} className="text-red-400 hover:text-red-300" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-400">No songs in this playlist yet</div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Playlists;

// // Original code for reference
// // import { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import { ListMusic, Music, Plus, ChevronDown, ChevronRight, Play } from 'lucide-react';
// // import { toast } from 'react-toastify';

// // const Playlists = () => {
// //   const [playlists, setPlaylists] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [expandedPlaylist, setExpandedPlaylist] = useState(null);

// //   useEffect(() => {
// //     const fetchPlaylists = async () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         const response = await fetch('http://localhost:8000/emotion/get_playlists/', {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });

// //         const data = await response.json();
// //         if (data.success) {
// //           setPlaylists(data.playlists);
// //         } else {
// //           toast.error(data.message || 'Failed to fetch playlists');
// //         }
// //       } catch (error) {
// //         toast.error('Error fetching playlists');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchPlaylists();
// //   }, []);

// //   const togglePlaylist = (playlistId) => {
// //     setExpandedPlaylist(expandedPlaylist === playlistId ? null : playlistId);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 p-6 rounded-lg">
// //       <div className="flex items-center justify-between">
// //         <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent flex items-center gap-2">
// //           <ListMusic className="text-cyan-400" />
// //           My Playlists
// //         </h2>
// //         <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-white">
// //           <Plus size={16} />
// //           New Playlist
// //         </button>
// //       </div>

// //       {playlists.length === 0 ? (
// //         <div className="text-center py-12 text-gray-400">
// //           <Music className="mx-auto h-12 w-12 text-cyan-400" />
// //           <p className="mt-4">You don't have any playlists yet</p>
// //           <button className="mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 rounded-lg text-sm font-medium text-white">
// //             Create your first playlist
// //           </button>
// //         </div>
// //       ) : (
// //         <div className="space-y-4">
// //           {playlists.map((playlist) => (
// //             <motion.div
// //               key={playlist.id}
// //               initial={{ opacity: 0, y: 10 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               className="bg-slate-800/80 rounded-xl border border-cyan-500/30 overflow-hidden shadow-cyan-500/10"
// //             >
// //               <div
// //                 className="flex items-center justify-between p-4 cursor-pointer hover:bg-cyan-500/10 transition-colors"
// //                 onClick={() => togglePlaylist(playlist.id)}
// //               >
// //                 <div className="flex items-center gap-3">
// //                   {expandedPlaylist === playlist.id ? (
// //                     <ChevronDown className="text-cyan-400" />
// //                   ) : (
// //                     <ChevronRight className="text-cyan-400" />
// //                   )}
// //                   <h3 className="font-medium text-cyan-100">{playlist.name}</h3>
// //                   <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full">
// //                     {playlist.songs.length} songs
// //                   </span>
// //                 </div>
// //                 <div className="text-xs text-gray-400">
// //                   Created: {new Date(playlist.created_at).toLocaleDateString()}
// //                 </div>
// //               </div>

// //               {expandedPlaylist === playlist.id && (
// //                 <motion.div
// //                   initial={{ opacity: 0, height: 0 }}
// //                   animate={{ opacity: 1, height: 'auto' }}
// //                   exit={{ opacity: 0, height: 0 }}
// //                   className="bg-slate-800/50 border-t border-cyan-500/30"
// //                 >
// //                   <div className="divide-y divide-cyan-500/30">
// //                     {playlist.songs.length > 0 ? (
// //                       playlist.songs.map((song) => (
// //                         <div key={song.id} className="p-4 hover:bg-cyan-500/10 transition-colors">
// //                           <div className="flex items-center gap-4">
// //                             <div className="relative">
// //                               <img
// //                                 src={song.thumbnail_url}
// //                                 alt={song.title}
// //                                 className="w-12 h-12 rounded-lg object-cover"
// //                               />
// //                               <button className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/50 rounded-lg transition-opacity">
// //                                 <Play className="text-cyan-400" size={16} />
// //                               </button>
// //                             </div>
// //                             <div className="flex-1">
// //                               <h4 className="font-medium text-gray-300">{song.title}</h4>
// //                               <p className="text-xs text-gray-400 mt-1">
// //                                 Added: {new Date(song.added_at).toLocaleDateString()}
// //                               </p>
// //                             </div>
// //                             <a
// //                               href={song.url}
// //                               target="_blank"
// //                               rel="noopener noreferrer"
// //                               className="text-xs text-cyan-400 hover:text-cyan-300"
// //                             >
// //                               View
// //                             </a>
// //                           </div>
// //                         </div>
// //                       ))
// //                     ) : (
// //                       <div className="p-4 text-center text-gray-400">
// //                         No songs in this playlist yet
// //                       </div>
// //                     )}
// //                   </div>
// //                 </motion.div>
// //               )}
// //             </motion.div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Playlists;

