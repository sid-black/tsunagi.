
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { User } from './types';
import Landing from './pages/Landing';
import Discover from './pages/Discover';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import HowItWorks from './pages/HowItWorks';
import Navbar from './components/Navbar';
import LiveAssistant from './components/LiveAssistant';
import { storage } from './services/storageService';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      const savedUser = await storage.get('user');
      if (savedUser) {
        try { setUser(JSON.parse(savedUser.value)); } catch(e) {}
      }
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await storage.set('user', '');
    setUser(null);
  };

  const isDiscoverPage = location.pathname === '/discover';

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#e5e5e5] flex flex-col selection:bg-[#6366f1] selection:text-white">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/login" element={<Auth type="login" onAuth={setUser} />} />
          <Route path="/signup" element={<Auth type="signup" onAuth={setUser} />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
      </main>

      <div className="fixed bottom-10 right-10 z-50">
        <LiveAssistant />
      </div>

      {!isDiscoverPage && (
        <footer className="bg-[#1d1d1d] border-t border-zinc-800/30 py-24 px-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-[#6366f1] rounded-xl flex items-center justify-center font-black">T</div>
                <span className="font-black text-2xl tracking-tighter text-white uppercase">Tsunagi</span>
              </div>
              <p className="text-zinc-500 font-light max-w-sm leading-relaxed">
                The premium bridge for high-end video production. Connecting elite creators with world-class brands.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8">Platform</h4>
              <ul className="space-y-4 text-sm text-zinc-600">
                <li><Link to="/discover" className="hover:text-white transition-colors">Discover Editors</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Apply as Editor</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8">Legal</h4>
              <ul className="space-y-4 text-sm text-zinc-600">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Copyright</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-zinc-800/20 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-zinc-700 text-xs font-black uppercase tracking-widest">© 2024 Tsunagi Collective. All Rights Reserved.</p>
            <div className="flex gap-8 text-zinc-600">
              <i className="fa-brands fa-instagram text-xl hover:text-white transition-colors cursor-pointer" />
              <i className="fa-brands fa-twitter text-xl hover:text-white transition-colors cursor-pointer" />
              <i className="fa-brands fa-vimeo-v text-xl hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
