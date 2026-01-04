
import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="bg-[#1a1a1a] text-[#e5e5e5] font-sans">
      {/* Hero Section */}
      <section className="relative px-6 py-40 md:py-60 max-w-7xl mx-auto text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none -z-10" />
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-8 text-white leading-[1.05]">
          Hire Video Editors <br /> in <span className="text-[#6366f1]">60 Seconds</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 mb-16 max-w-2xl mx-auto leading-relaxed font-light">
          Swipe through portfolios. See their work instantly. Skip the resumes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/discover" className="px-12 py-5 bg-[#6366f1] hover:bg-indigo-500 text-white rounded-xl font-bold text-xl transition-all shadow-xl shadow-indigo-600/20">
            I'm Hiring
          </Link>
          <Link to="/signup" className="px-12 py-5 bg-transparent hover:bg-zinc-800 text-white rounded-xl font-bold text-xl transition-all border border-zinc-700">
            I'm an Editor
          </Link>
        </div>
      </section>

      {/* Problem/Solution Section - 120px Padding */}
      <section className="px-6 py-[120px] max-w-7xl mx-auto border-t border-zinc-800/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div className="group">
            <div className="w-20 h-20 bg-[#2a2a2a] rounded-2xl flex items-center justify-center mx-auto mb-8 border border-zinc-800 transition-all group-hover:border-[#6366f1]/50">
              <i className="fa-solid fa-file-excel text-3xl text-zinc-500 group-hover:text-[#6366f1]" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Stop Reading Resumes</h3>
            <p className="text-zinc-500 leading-relaxed font-light">Resumes tell stories. Portfolios show proof. We skip the noise and get straight to the craft.</p>
          </div>
          <div className="group">
            <div className="w-20 h-20 bg-[#2a2a2a] rounded-2xl flex items-center justify-center mx-auto mb-8 border border-zinc-800 transition-all group-hover:border-[#6366f1]/50">
              <i className="fa-solid fa-bolt text-3xl text-zinc-500 group-hover:text-[#6366f1]" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">See Work Instantly</h3>
            <p className="text-zinc-500 leading-relaxed font-light">Instant playback of full-resolution reels. No more external links, no more waiting.</p>
          </div>
          <div className="group">
            <div className="w-20 h-20 bg-[#2a2a2a] rounded-2xl flex items-center justify-center mx-auto mb-8 border border-zinc-800 transition-all group-hover:border-[#6366f1]/50">
              <i className="fa-solid fa-layer-group text-3xl text-zinc-500 group-hover:text-[#6366f1]" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">One Platform, Full Workflow</h3>
            <p className="text-zinc-500 leading-relaxed font-light">From discovery to final delivery, manage your entire video production hub here.</p>
          </div>
        </div>
      </section>

      {/* How It Works (Clients) - 120px Padding */}
      <section className="px-6 py-[120px] bg-[#1d1d1d]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="relative aspect-[4/5] bg-[#2a2a2a] rounded-[48px] border border-zinc-800 overflow-hidden shadow-2xl group transition-transform hover:scale-[1.02]">
               <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-12">
                  <div className="flex gap-4 mb-8">
                    <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-red-500 shadow-2xl transition-transform hover:scale-110">
                       <i className="fa-solid fa-heart text-2xl" />
                    </button>
                    <button className="w-16 h-16 bg-zinc-900/40 rounded-full flex items-center justify-center text-white backdrop-blur-xl border border-white/10 transition-transform hover:scale-110">
                       <i className="fa-solid fa-xmark text-2xl" />
                    </button>
                  </div>
                  <h3 className="text-3xl font-black text-white mb-2">Cinematic Brand Edit</h3>
                  <p className="text-zinc-400 text-lg uppercase tracking-widest text-xs font-bold">Alex Rivera • $95/hr</p>
               </div>
               <img src="https://picsum.photos/seed/luxury_reel/600/800" className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000" />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#6366f1]/10 blur-[80px] rounded-full" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-[#6366f1] font-black uppercase tracking-[0.2em] text-xs mb-6 block">The Client Journey</span>
            <h2 className="text-5xl md:text-6xl font-black mb-12 text-white tracking-tighter">Your Production Team, <br/><span className="text-zinc-600">Reimagined.</span></h2>
            <div className="space-y-12">
              <div className="flex gap-8 group">
                <div className="w-12 h-12 rounded-xl bg-[#2a2a2a] border border-zinc-800 flex items-center justify-center font-black text-[#6366f1] group-hover:bg-[#6366f1] group-hover:text-white transition-all">01</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-white">Browse visual portfolios</h4>
                  <p className="text-zinc-500 font-light">Experience the craft before you ever read a name. Swipe through curated edits.</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="w-12 h-12 rounded-xl bg-[#2a2a2a] border border-zinc-800 flex items-center justify-center font-black text-[#6366f1] group-hover:bg-[#6366f1] group-hover:text-white transition-all">02</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-white">Swipe right to shortlist</h4>
                  <p className="text-zinc-500 font-light">Instantly save the styles that resonate with your brand's visual language.</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="w-12 h-12 rounded-xl bg-[#2a2a2a] border border-zinc-800 flex items-center justify-center font-black text-[#6366f1] group-hover:bg-[#6366f1] group-hover:text-white transition-all">03</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-white">Book or message directly</h4>
                  <p className="text-zinc-500 font-light">Start the collaboration immediately. Direct communication, zero friction.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Showcase - 120px Padding */}
      <section className="px-6 py-[120px] bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter">Silent Luxury Design.</h2>
          <p className="text-zinc-500 text-xl font-light">No banners, no pop-ups, no noise. Just world-class video editing.</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative group overflow-hidden rounded-[40px] border border-zinc-800 bg-[#2a2a2a] p-10 opacity-60 grayscale scale-[0.98]">
            <div className="absolute top-10 left-10 bg-zinc-900 px-4 py-1.5 rounded-full text-[10px] uppercase font-black tracking-widest text-zinc-600">Legacy Platforms</div>
            <div className="mt-16 space-y-4 opacity-10">
               {[1,2,3,4].map(i => <div key={i} className="h-4 bg-white rounded w-full" />)}
               <div className="h-32 bg-white rounded w-full mt-10" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Cluttered & Fragmented</span>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-[40px] border border-[#6366f1]/30 bg-indigo-500/5 p-2">
            <div className="absolute top-10 left-10 bg-white px-5 py-2 rounded-full text-[10px] uppercase font-black tracking-widest text-[#6366f1] shadow-2xl z-10">Tsunagi</div>
            <div className="aspect-video bg-zinc-900 rounded-[34px] flex items-center justify-center overflow-hidden relative">
               <div className="w-24 h-24 bg-[#6366f1] rounded-full flex items-center justify-center shadow-3xl shadow-indigo-600/50 animate-pulse">
                 <i className="fa-solid fa-play text-white text-3xl ml-1" />
               </div>
               <div className="absolute bottom-8 left-8 right-8 h-1 bg-white/10 rounded-full overflow-hidden">
                 <div className="w-2/3 h-full bg-[#6366f1]" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - 120px Padding */}
      <section className="px-6 py-[120px] max-w-7xl mx-auto border-t border-zinc-800/30">
        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-center mb-20 text-zinc-500">Trusted by Global Creatives</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { quote: "Finally, a platform that respects the frame. I found our lead commercial editor in 48 hours.", author: "Jameson P.", role: "Creative Lead, Nike" },
            { quote: "The discovery process is addictive. It's like Tinder for world-class talent.", author: "Elena M.", role: "VP Content, Netflix" },
            { quote: "Clean, fast, and high-end. Tsunagi is the standard for the next generation of editors.", author: "Marcus K.", role: "Lead Motion Artist" }
          ].map((t, i) => (
            <div key={i} className="p-12 rounded-[40px] bg-[#2a2a2a] border border-zinc-800 hover:border-zinc-700 transition-all group">
               <div className="flex text-[#6366f1] gap-1 mb-8">
                 {[1,2,3,4,5].map(s => <i key={s} className="fa-solid fa-star text-[10px]" />)}
               </div>
               <p className="text-2xl font-light leading-relaxed mb-12 text-zinc-300 group-hover:text-white transition-colors">"{t.quote}"</p>
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-zinc-800 rounded-full" />
                 <div>
                   <div className="font-bold text-white text-lg">{t.author}</div>
                   <div className="text-zinc-600 text-xs font-black uppercase tracking-widest">{t.role}</div>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA - 120px Padding */}
      <section className="px-6 py-[120px]">
        <div className="max-w-5xl mx-auto p-20 md:p-32 rounded-[80px] bg-gradient-to-br from-[#6366f1] to-[#4f46e5] text-center relative overflow-hidden shadow-3xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[150px] rounded-full -mr-60 -mt-60" />
          <h2 className="text-5xl md:text-8xl font-black mb-12 text-white relative z-10 tracking-tighter">Join the 1% <br/>of Editing.</h2>
          <Link to="/signup" className="inline-block px-16 py-7 bg-white text-[#6366f1] hover:scale-105 transition-all rounded-2xl font-black text-2xl relative z-10 shadow-3xl">
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
