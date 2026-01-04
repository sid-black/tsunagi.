
import React, { useState } from 'react';
import { User, UserRole, PortfolioItem } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  user: User | null;
}

const Dashboard: React.FC<Props> = ({ user }) => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(user?.portfolioItems || []);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-6">
        <div className="text-center p-20 bg-zinc-900 rounded-[40px] border border-zinc-800 shadow-3xl">
           <h2 className="text-2xl font-black mb-6">Unauthorized Access</h2>
           <Link to="/login" className="px-10 py-4 bg-indigo-600 rounded-full font-bold text-white shadow-xl shadow-indigo-600/20">Please Log In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#1a1a1a]">
      {/* Sidebar Nav */}
      <nav className="hidden lg:flex w-72 border-r border-zinc-800 p-8 flex-col gap-10">
        <div className="flex items-center gap-3 px-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black">T</div>
          <span className="font-black text-xl tracking-tighter uppercase">Tsunagi</span>
        </div>
        <div className="space-y-2">
          {['Dashboard', 'My Profile', 'Messages', 'Community', 'Settings'].map((item, i) => (
            <button 
              key={item} 
              className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl font-bold transition-all ${i === 0 ? 'bg-indigo-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white hover:bg-zinc-800'}`}
            >
              <span className="text-xs uppercase tracking-widest">{item}</span>
              {i > 1 && <span className="text-[8px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-500 font-black">SOON</span>}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-12">
           <div>
             <h1 className="text-4xl font-black mb-2 tracking-tighter">Editor Hub</h1>
             <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Managing Profile: {user.name}</p>
           </div>
           <button className="px-8 py-3 bg-white text-black font-black rounded-full hover:bg-zinc-200 transition-all shadow-xl">
             Public Preview
           </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           {[
             { label: 'Profile Views', value: '412', trend: '+12%', color: 'text-white' },
             { label: 'Shortlisted By', value: '28', trend: '+2', color: 'text-indigo-500' },
             { label: 'Messages', value: '0', trend: 'Waitlist', color: 'text-zinc-500' }
           ].map((s, i) => (
             <div key={i} className="p-8 bg-zinc-900 border border-zinc-800 rounded-[32px] shadow-2xl">
                <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-4">{s.label}</div>
                <div className="flex items-baseline gap-4">
                  <div className={`text-5xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-xs font-bold text-green-500">{s.trend}</div>
                </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Portfolio Manager */}
          <section className="lg:col-span-2">
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-black uppercase tracking-widest">Portfolio Manager</h2>
               <button className="px-6 py-2.5 bg-zinc-800 border border-zinc-700 rounded-full text-xs font-black uppercase tracking-widest hover:bg-zinc-700 transition-all">
                 Upload New Reel
               </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.map(item => (
                <div key={item.id} className="group relative bg-zinc-900 rounded-[32px] overflow-hidden border border-zinc-800 p-3 shadow-xl">
                   <div className="aspect-video rounded-[24px] overflow-hidden mb-4 bg-zinc-950">
                     <img src={item.thumbnail} className="w-full h-full object-cover" alt="" />
                   </div>
                   <div className="flex justify-between items-center px-2">
                      <div className="font-bold text-sm">{item.title}</div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"><i className="fa-solid fa-pen text-[10px]" /></button>
                         <button className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-500 transition-colors"><i className="fa-solid fa-trash text-[10px]" /></button>
                      </div>
                   </div>
                </div>
              ))}
              {portfolio.length === 0 && (
                <div className="col-span-2 p-20 border-2 border-dashed border-zinc-800 rounded-[32px] text-center flex flex-col items-center">
                  <i className="fa-solid fa-cloud-arrow-up text-3xl text-zinc-700 mb-4" />
                  <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">No projects uploaded yet</p>
                </div>
              )}
            </div>
          </section>

          {/* Sidebar Widgets */}
          <aside className="space-y-12">
            {/* Completeness */}
            <div className="p-10 bg-zinc-900 border border-zinc-800 rounded-[48px] shadow-2xl">
               <h3 className="text-lg font-black mb-6 uppercase tracking-widest">Complete Profile</h3>
               <div className="mb-8">
                 <div className="flex justify-between text-xs font-black uppercase mb-2">
                    <span className="text-zinc-500">Progress</span>
                    <span className="text-indigo-500">60%</span>
                 </div>
                 <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 w-[60%] shadow-lg shadow-indigo-600/20" />
                 </div>
               </div>
               <div className="space-y-4">
                  {[
                    { text: 'Profile photo uploaded', done: true },
                    { text: 'Bio written', done: true },
                    { text: 'Add 3 more portfolio pieces', done: false },
                    { text: 'Set your hourly rate', done: false }
                  ].map((task, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm">
                       <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${task.done ? 'bg-green-500/20 border-green-500 text-green-500' : 'border-zinc-700 text-zinc-700'}`}>
                          {task.done && <i className="fa-solid fa-check text-[10px]" />}
                       </div>
                       <span className={`text-xs font-bold uppercase tracking-widest ${task.done ? 'text-zinc-600 line-through' : 'text-zinc-400'}`}>{task.text}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-zinc-900/30 rounded-[32px] p-2">
               <h3 className="text-lg font-black mb-6 uppercase tracking-widest px-4 pt-4">Recent Activity</h3>
               <div className="space-y-1">
                  {[
                    '3 clients viewed your profile today',
                    'You were shortlisted by Sarah M.',
                    'Your "Nike" project got 45 likes',
                    'A recruiter from Netflix viewed your bio'
                  ].map((act, i) => (
                    <div key={i} className="px-4 py-4 border-b border-zinc-800 last:border-0 flex gap-4 items-start hover:bg-zinc-800/50 transition-colors rounded-2xl">
                       <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0" />
                       <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest leading-relaxed">{act}</p>
                    </div>
                  ))}
               </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
