
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, UserRole } from '../types';
import { storage } from '../services/storageService';

interface Props {
  type: 'login' | 'signup';
  onAuth: (user: User) => void;
}

const Auth: React.FC<Props> = ({ type, onAuth }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>(UserRole.CLIENT);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', specialty: 'Motion Design' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      role: role,
      profilePhoto: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`,
      specialty: role === UserRole.EDITOR ? formData.specialty : undefined,
      portfolioItems: [],
      rate: 75,
      completedProjects: 0,
      rating: 5.0,
      location: "Global"
    };
    
    // Consistent storage key: 'user'
    await storage.set('user', JSON.stringify(newUser));
    onAuth(newUser);
    
    if (role === UserRole.CLIENT) navigate('/discover');
    else navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-88px)] bg-[#1a1a1a] flex items-center justify-center p-8 py-20">
      <div className="w-full max-w-[500px] p-16 bg-[#2a2a2a] border border-zinc-800 rounded-[64px] shadow-3xl">
        <h1 className="text-4xl font-black mb-3 text-center tracking-tighter text-white">
          {type === 'login' ? 'Welcome Back' : 'Join the Collective'}
        </h1>
        <p className="text-zinc-500 text-center mb-12 font-black uppercase tracking-[0.3em] text-[10px]">
          {type === 'login' ? 'Continue your production' : 'Connect with world-class talent'}
        </p>
        
        {type === 'signup' && (
          <div className="flex p-1.5 bg-[#1d1d1d] border border-zinc-800 rounded-[28px] mb-12">
            <button 
              onClick={() => setRole(UserRole.CLIENT)}
              className={`flex-grow py-4 rounded-[22px] font-black text-[10px] uppercase tracking-widest transition-all ${role === UserRole.CLIENT ? 'bg-[#6366f1] text-white shadow-xl' : 'text-zinc-500 hover:text-white'}`}
            >
              Client
            </button>
            <button 
              onClick={() => setRole(UserRole.EDITOR)}
              className={`flex-grow py-4 rounded-[22px] font-black text-[10px] uppercase tracking-widest transition-all ${role === UserRole.EDITOR ? 'bg-[#6366f1] text-white shadow-xl' : 'text-zinc-500 hover:text-white'}`}
            >
              Editor
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {type === 'signup' && (
            <div>
              <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-4 px-2">Identity</label>
              <input 
                type="text" required
                placeholder="Full Name"
                className="w-full bg-[#3a3a3a] border border-zinc-700/50 rounded-2xl px-6 py-5 outline-none focus:border-[#6366f1] transition-all font-medium text-white placeholder:text-zinc-600 shadow-inner"
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          
          <div>
            <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-4 px-2">Access</label>
            <input 
              type="email" required
              placeholder="Email Address"
              className="w-full bg-[#3a3a3a] border border-zinc-700/50 rounded-2xl px-6 py-5 outline-none focus:border-[#6366f1] transition-all font-medium text-white placeholder:text-zinc-600 shadow-inner"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-4 px-2">Secret</label>
            <input 
              type="password" required
              placeholder="••••••••"
              className="w-full bg-[#3a3a3a] border border-zinc-700/50 rounded-2xl px-6 py-5 outline-none focus:border-[#6366f1] transition-all font-medium text-white placeholder:text-zinc-600 shadow-inner"
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full py-6 bg-[#6366f1] hover:bg-indigo-500 text-white font-black rounded-3xl transition-all shadow-3xl shadow-indigo-600/30 text-xl tracking-tight"
          >
            {type === 'login' ? 'Authorize' : 'Initialize Account'}
          </button>
        </form>

        <div className="mt-12 text-center text-zinc-600 font-bold text-sm">
          {type === 'login' ? (
            <p>New to the collective? <Link to="/signup" className="text-white hover:text-[#6366f1] transition-colors underline underline-offset-8 decoration-zinc-800">Sign up</Link></p>
          ) : (
            <p>Already joined? <Link to="/login" className="text-white hover:text-[#6366f1] transition-colors underline underline-offset-8 decoration-zinc-800">Log in</Link></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
