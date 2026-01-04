
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_EDITORS } from '../constants';
import ProjectBriefModal from '../components/ProjectBriefModal';

const Profile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = MOCK_EDITORS.find(e => e.id === id);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);

  if (!editor) return <div className="p-20 text-center">Editor not found</div>;

  return (
    <div className="bg-[#1a1a1a] min-h-screen text-[#e5e5e5]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#1a1a1a]/80 backdrop-blur-lg border-b border-zinc-800 px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
          <i className="fa-solid fa-arrow-left" />
        </button>
        <span className="font-black uppercase tracking-widest text-xs text-zinc-500">Back to Discovery</span>
      </div>

      {/* Hero Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto flex flex-col items-center text-center">
         <div className="relative mb-10">
           <img src={editor.profilePhoto} alt={editor.name} className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-zinc-800 shadow-2xl object-cover" />
           <div className="absolute bottom-2 right-2 w-8 h-8 md:w-12 md:h-12 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-[#1a1a1a]">
             <i className="fa-solid fa-check text-white text-xs md:text-lg" />
           </div>
         </div>
         <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">{editor.name}</h1>
         <div className="flex gap-4 mb-8">
            <span className="px-4 py-1.5 bg-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest border border-zinc-700">{editor.specialty}</span>
            <span className="px-4 py-1.5 bg-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest border border-zinc-700">{editor.location}</span>
         </div>
         <div className="flex flex-wrap justify-center gap-4 mb-12">
           <button 
             onClick={() => setIsBriefModalOpen(true)}
             className="px-10 py-5 bg-white text-black font-black rounded-full hover:bg-zinc-200 transition-all text-lg shadow-xl"
            >
              Book Consultation
            </button>
           <button className="px-10 py-5 bg-zinc-800 text-white font-black rounded-full hover:bg-zinc-700 transition-all border border-zinc-700 text-lg shadow-xl">Message</button>
         </div>

         {/* Stats Bar */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl p-1 bg-zinc-900 border border-zinc-800 rounded-[32px] overflow-hidden shadow-2xl">
            <div className="p-8 text-center border-r border-zinc-800">
               <div className="text-3xl font-black">{editor.completedProjects}</div>
               <div className="text-[10px] font-black uppercase text-zinc-500 tracking-tighter mt-1">Projects Done</div>
            </div>
            <div className="p-8 text-center border-r border-zinc-800">
               <div className="text-3xl font-black text-indigo-500">{editor.rating}★</div>
               <div className="text-[10px] font-black uppercase text-zinc-500 tracking-tighter mt-1">Rating</div>
            </div>
            <div className="p-8 text-center border-r border-zinc-800">
               <div className="text-3xl font-black">98%</div>
               <div className="text-[10px] font-black uppercase text-zinc-500 tracking-tighter mt-1">Response</div>
            </div>
            <div className="p-8 text-center">
               <div className="text-3xl font-black">${editor.rate}</div>
               <div className="text-[10px] font-black uppercase text-zinc-500 tracking-tighter mt-1">Hourly Rate</div>
            </div>
         </div>
      </section>

      {/* Content Grid */}
      <section className="px-6 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20">
        <div className="lg:col-span-2 space-y-20">
          {/* About */}
          <div>
            <h2 className="text-2xl font-black mb-6 uppercase tracking-widest">About</h2>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">{editor.bio}</p>
            <div className="flex flex-wrap gap-2 mt-10">
              {editor.skills?.map(s => <span key={s} className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-300">{s}</span>)}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div>
            <h2 className="text-2xl font-black mb-8 uppercase tracking-widest">Selected Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {editor.portfolioItems?.map(item => (
                <div key={item.id} className="group relative aspect-video bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 cursor-pointer" onClick={() => setActiveVideo(item.video)}>
                   <img src={item.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.title} />
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black">
                        <i className="fa-solid fa-play" />
                      </div>
                   </div>
                   <div className="absolute bottom-6 left-6 right-6">
                      <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Client: {item.client}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="text-2xl font-black mb-8 uppercase tracking-widest">Reviews</h2>
            <div className="space-y-6">
              {editor.reviews?.map((r, i) => (
                <div key={i} className="p-10 rounded-[40px] bg-zinc-900/40 border border-zinc-800">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="font-black text-lg">{r.clientName}</div>
                      <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{r.company} • {r.projectType}</div>
                      {r.date && <div className="text-zinc-600 text-[10px] font-bold mt-1 uppercase tracking-widest">{r.date}</div>}
                    </div>
                    <div className="text-indigo-500 font-bold">{r.rating}★</div>
                  </div>
                  <p className="text-lg italic text-zinc-300">"{r.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Sticky */}
        <div className="space-y-8">
           <div className="sticky top-24 p-10 rounded-[48px] bg-zinc-900 border border-zinc-800">
              <h3 className="text-xl font-black mb-8 uppercase tracking-widest">Packages</h3>
              <div className="space-y-6">
                {editor.packages?.map((pkg, i) => (
                  <div key={i} className="p-6 bg-zinc-950 border border-zinc-800 rounded-3xl group hover:border-indigo-500 transition-all cursor-pointer">
                    <div className="flex justify-between items-center mb-2">
                       <span className="font-bold text-white">{pkg.name}</span>
                       <span className="font-black text-indigo-500">${pkg.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest">{pkg.delivery} Delivery</div>
                      {pkg.revisions && <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{pkg.revisions} Revisions</div>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-10 border-t border-zinc-800 text-center">
                 <div className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-2">Next Availability</div>
                 <div className="text-xl font-black text-white">October 14th, 2024</div>
              </div>
              <button 
                onClick={() => setIsBriefModalOpen(true)}
                className="w-full mt-10 py-5 bg-indigo-600 text-white font-black rounded-[24px] shadow-2xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all"
              >
                Shortlist Editor
              </button>
           </div>
        </div>
      </section>

      {/* Video Lightbox */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-20" onClick={() => setActiveVideo(null)}>
           <div className="relative w-full max-w-6xl aspect-video bg-zinc-900 rounded-[40px] overflow-hidden shadow-3xl" onClick={e => e.stopPropagation()}>
              <video src={activeVideo} className="w-full h-full object-contain" autoPlay controls />
              <button onClick={() => setActiveVideo(null)} className="absolute top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md">
                <i className="fa-solid fa-xmark" />
              </button>
           </div>
        </div>
      )}

      {/* Project Brief Modal */}
      <ProjectBriefModal 
        isOpen={isBriefModalOpen} 
        onClose={() => setIsBriefModalOpen(false)} 
        editor={editor}
      />
    </div>
  );
};

export default Profile;
