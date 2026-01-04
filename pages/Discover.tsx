
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MOCK_EDITORS } from '../constants';
import { User } from '../types';
import { Link } from 'react-router-dom';
import { storage } from '../services/storageService';
import PortfolioPlayer from '../components/PortfolioPlayer';

const Discover: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [seenEditors, setSeenEditors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    specialty: 'all',
    maxRate: 500,
    turnaround: 'any'
  });

  // Swipe State
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Persistence
  useEffect(() => {
    const loadPersistentData = async () => {
      const savedShortlist = await storage.get('shortlist');
      const savedSeen = await storage.get('seen_editors');
      if (savedShortlist) try { setShortlist(JSON.parse(savedShortlist.value)); } catch(e) {}
      if (savedSeen) try { setSeenEditors(JSON.parse(savedSeen.value)); } catch(e) {}
    };
    loadPersistentData();
  }, []);

  // Filter Logic
  const filteredEditors = useMemo(() => {
    return MOCK_EDITORS.filter(editor => {
      const matchSearch = editor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          editor.specialty?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSpecialty = filters.specialty === 'all' || editor.specialty?.toLowerCase() === filters.specialty.toLowerCase();
      const matchRate = (editor.rate || 0) <= filters.maxRate;
      return matchSearch && matchSpecialty && matchRate;
    });
  }, [filters, searchQuery]);

  const handleAction = async (type: 'pass' | 'shortlist') => {
    if (currentIndex >= filteredEditors.length) return;

    const editorId = filteredEditors[currentIndex].id;
    
    // Track seen
    const newSeen = [...new Set([...seenEditors, editorId])];
    setSeenEditors(newSeen);
    await storage.set('seen_editors', JSON.stringify(newSeen));

    if (type === 'shortlist') {
      const newList = [...new Set([...shortlist, editorId])];
      setShortlist(newList);
      await storage.set('shortlist', JSON.stringify(newList));
    }
    
    setCurrentIndex(prev => prev + 1);
    setDragOffset({ x: 0, y: 0 });
  };

  // Drag Handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const pos = 'touches' in e ? e.touches[0] : e;
    dragStart.current = { x: pos.clientX, y: pos.clientY };
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const pos = 'touches' in e ? e.touches[0] : e;
    const dx = pos.clientX - dragStart.current.x;
    const dy = pos.clientY - dragStart.current.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset.x > 120) handleAction('shortlist');
    else if (dragOffset.x < -120) handleAction('pass');
    else setDragOffset({ x: 0, y: 0 });
  };

  const currentEditor = filteredEditors[currentIndex];
  const isFinished = currentIndex >= filteredEditors.length;

  return (
    <div className="flex h-[calc(100vh-88px)] bg-[#1a1a1a] overflow-hidden">
      {/* Sidebar Filters */}
      <aside className="hidden lg:flex w-72 border-r border-zinc-800 p-8 flex-col gap-10 bg-[#1d1d1d] shrink-0">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-10">Filters</h2>
          <div className="space-y-12">
            <div>
              <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-4">Specialty</label>
              <select 
                value={filters.specialty}
                onChange={(e) => setFilters({...filters, specialty: e.target.value})}
                className="w-full bg-[#2a2a2a] border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-[#6366f1] text-xs font-bold uppercase text-white transition-all"
              >
                <option value="all">All Specialties</option>
                <option value="Motion Design">Motion Design</option>
                <option value="Color Grading">Color Grading</option>
                <option value="VFX Supervisor">VFX Supervisor</option>
                <option value="Social Content">Social Content</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-4">Max Rate: ${filters.maxRate}/hr</label>
              <input 
                type="range" min="30" max="500" step="10" 
                value={filters.maxRate}
                onChange={(e) => setFilters({...filters, maxRate: parseInt(e.target.value)})}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#6366f1]" 
              />
            </div>
          </div>
        </div>
        <button 
          onClick={() => { setFilters({ specialty: 'all', maxRate: 500, turnaround: 'any' }); setSearchQuery(''); }}
          className="mt-auto py-5 text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors text-center"
        >
          Reset Discovery
        </button>
      </aside>

      {/* Main Feed Area */}
      <main className="flex-grow flex flex-col items-center justify-between p-8 relative overflow-hidden">
        {/* Feed Header */}
        <div className="w-full flex justify-between items-center z-20 shrink-0">
          <div className="flex items-center gap-6 flex-grow max-w-xl">
             <div className="relative flex-grow">
               <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 text-sm" />
               <input 
                 type="text"
                 placeholder="Search editors..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-[#2a2a2a] border border-zinc-800 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-[#6366f1] text-xs font-medium text-white placeholder:text-zinc-600 transition-all shadow-inner"
               />
             </div>
          </div>
          <button className="flex items-center gap-4 px-8 py-4 bg-[#2a2a2a] border border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#333] transition-all shadow-xl ml-8">
             <i className="fa-solid fa-list-ul text-[#6366f1]" />
             Shortlist ({shortlist.length})
          </button>
        </div>

        {/* Card Display Area */}
        <div className="flex-grow w-full flex items-center justify-center relative my-4 overflow-hidden">
          {isFinished ? (
            <div className="text-center p-12 bg-[#2a2a2a] border border-zinc-800 rounded-[48px] max-w-lg shadow-3xl">
              <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-8 text-[#6366f1] text-3xl">
                <i className="fa-solid fa-eye-slash" />
              </div>
              <h2 className="text-2xl font-black mb-4 tracking-tighter">End of Feed</h2>
              <p className="text-zinc-500 mb-10 text-base leading-relaxed font-light">Try adjusting your filters to see more world-class talent.</p>
              <button 
                onClick={() => { setCurrentIndex(0); setFilters({ specialty: 'all', maxRate: 500, turnaround: 'any' }); setSearchQuery(''); }}
                className="w-full py-4 bg-white text-black font-black rounded-[24px] hover:bg-zinc-200 transition-all text-base shadow-2xl"
              >
                Start Over
              </button>
            </div>
          ) : (
            <div className="relative w-full h-full max-h-[600px] max-w-[450px] perspective-1000 flex flex-col justify-center">
              {/* Card Container with fixed aspect ratio relative to its own height/width */}
              <div 
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                style={{
                  transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x / 15}deg)`,
                  transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                  cursor: isDragging ? 'grabbing' : 'grab'
                }}
                className="relative w-full aspect-[4/5.5] bg-[#2a2a2a] rounded-[56px] border border-zinc-800 shadow-3xl overflow-hidden touch-none select-none z-10 mx-auto"
              >
                <div className="absolute inset-0">
                  <PortfolioPlayer 
                    videoUrl={currentEditor.portfolioVideo || ""}
                    className="w-full h-full grayscale-[5%] transition-all"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Swipe Overlays */}
                {dragOffset.x > 60 && (
                  <div className="absolute top-12 left-8 rotate-[-15deg] px-6 py-2 border-4 border-[#6366f1] rounded-2xl text-[#6366f1] font-black text-3xl uppercase tracking-[0.2em] bg-black/50 backdrop-blur-md pointer-events-none">
                    SHORTLIST
                  </div>
                )}
                {dragOffset.x < -60 && (
                  <div className="absolute top-12 right-8 rotate-[15deg] px-6 py-2 border-4 border-red-500 rounded-2xl text-red-500 font-black text-3xl uppercase tracking-[0.2em] bg-black/50 backdrop-blur-md pointer-events-none">
                    PASS
                  </div>
                )}

                {/* Bottom Card Info */}
                <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
                  <div className="flex justify-between items-end mb-4">
                     <div>
                       <h2 className="text-3xl font-black text-white tracking-tighter mb-2">{currentEditor.name}</h2>
                       <div className="flex gap-2">
                         <span className="px-3 py-1 bg-white/10 backdrop-blur-2xl rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-white border border-white/20">
                           {currentEditor.specialty}
                         </span>
                         <span className="px-3 py-1 bg-[#6366f1]/20 backdrop-blur-2xl rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-indigo-300 border border-[#6366f1]/40">
                           ${currentEditor.rate}/hr
                         </span>
                       </div>
                     </div>
                     <div className="text-right">
                        <div className="text-white font-black text-2xl mb-0.5">{currentEditor.rating}★</div>
                        <div className="text-zinc-500 text-[8px] font-black uppercase tracking-widest">Verified</div>
                     </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentEditor.tags?.slice(0, 3).map(s => (
                      <span key={s} className="text-[8px] text-zinc-500 font-black uppercase tracking-widest opacity-60">#{s.replace(/\s+/g, '')}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons - Placed relatively to ensure they fit in the flex-grow container */}
              <div className="mt-8 flex justify-center items-center gap-8 z-20 shrink-0">
                 <button 
                   onClick={() => handleAction('pass')}
                   className="w-14 h-14 bg-[#2a2a2a] border border-zinc-800 rounded-full flex items-center justify-center text-zinc-500 hover:text-red-500 hover:border-red-500 transition-all shadow-2xl active:scale-90"
                 >
                   <i className="fa-solid fa-xmark text-xl" />
                 </button>
                 <button 
                   onClick={() => handleAction('shortlist')}
                   className="w-20 h-20 bg-[#6366f1] rounded-full flex items-center justify-center text-white shadow-3xl shadow-indigo-600/50 hover:scale-110 active:scale-95 transition-all"
                 >
                   <i className="fa-solid fa-star text-3xl" />
                 </button>
                 <Link 
                   to={`/profile/${currentEditor.id}`}
                   className="w-14 h-14 bg-[#2a2a2a] border border-zinc-800 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:border-white transition-all shadow-2xl active:scale-90"
                 >
                   <i className="fa-solid fa-eye text-xl" />
                 </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Discover;
