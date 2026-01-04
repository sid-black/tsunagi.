
import React from 'react';
import { Link } from 'react-router-dom';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <nav className="sticky top-0 z-[60] glass-effect px-8 py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 bg-[#6366f1] rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-indigo-600/20 group-hover:rotate-12 transition-transform">T</div>
          <span className="font-black text-3xl tracking-tighter text-white uppercase">Tsunagi</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-12">
          {!user && (
            <div className="hidden md:flex gap-10">
              <Link to="/discover" className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors">Discover</Link>
              <Link to="/how-it-works" className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors">Process</Link>
            </div>
          )}

          {user?.role === UserRole.CLIENT && (
            <div className="hidden md:flex gap-10 items-center">
              <Link to="/discover" className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white">Discover</Link>
              <button className="text-xs font-black uppercase tracking-[0.2em] text-[#6366f1] hover:text-indigo-400">
                My Shortlist
              </button>
            </div>
          )}

          {user?.role === UserRole.EDITOR && (
            <div className="hidden md:flex gap-10 items-center">
              <Link to="/dashboard" className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white">Dashboard</Link>
              <Link to={`/profile/${user.id}`} className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white">My Profile</Link>
            </div>
          )}
          
          {user ? (
            <div className="flex items-center gap-6 pl-8 border-l border-zinc-800">
              <div className="relative group cursor-pointer">
                <img 
                  src={user.profilePhoto || user.avatar} 
                  alt={user.name} 
                  className="w-12 h-12 rounded-2xl border-2 border-zinc-800 p-0.5 object-cover group-hover:border-[#6366f1] transition-all" 
                />
                <div className="absolute top-full right-0 mt-4 w-48 bg-[#2a2a2a] border border-zinc-800 rounded-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-3xl">
                  <div className="text-sm font-bold text-white mb-2">{user.name}</div>
                  <button onClick={onLogout} className="w-full text-left text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-red-400 transition-colors py-2">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors">Login</Link>
              <Link to="/signup" className="px-10 py-4 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-2xl hover:bg-zinc-200 active:scale-95">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
