
import React, { useState } from 'react';

const HowItWorks: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "How much does Tsunagi cost?", a: "Clients can join and browse for free. We charge a flat 10% marketplace fee on completed projects." },
    { q: "How do payments work?", a: "Payments are held in escrow until the final delivery is approved by the client. We support Stripe and bank transfers." },
    { q: "Can I hire for long-term projects?", a: "Absolutely. Many of our editors work on both short campaigns and long-term retainer agreements." },
    { q: "What defines a 'World-Class' editor?", a: "We manually vet every editor for portfolio quality, industry experience, and professional response times." },
    { q: "Is there a limit to how many reels I can upload?", a: "Editors can showcase up to 12 featured projects on their profile to keep the experience focused." }
  ];

  return (
    <div className="bg-[#1a1a1a] text-[#e5e5e5]">
      {/* Hero */}
      <section className="px-6 py-32 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">How Tsunagi Works</h1>
        <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
          The elite bridge between vision and high-end post-production. <br/> Built for speed, designed for luxury.
        </p>
      </section>

      {/* Two-Column Explainer */}
      <section className="px-6 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Clients */}
        <div className="p-12 md:p-20 bg-zinc-900 border border-zinc-800 rounded-[60px] space-y-16">
           <h2 className="text-4xl font-black uppercase tracking-tighter">For Clients</h2>
           <div className="space-y-12">
              <div className="space-y-4">
                 <h4 className="text-xl font-bold">1. Browse Portfolios</h4>
                 <div className="aspect-video bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-800">
                    <img src="https://picsum.photos/seed/tsu_cl1/600/400" className="w-full h-full object-cover opacity-60" />
                 </div>
                 <p className="text-zinc-500 leading-relaxed">Swipe through curated reels optimized for high-res playback.</p>
              </div>
              <div className="space-y-4">
                 <h4 className="text-xl font-bold">2. Shortlist Favorites</h4>
                 <p className="text-zinc-500 leading-relaxed">Build your dream team with a single tap. Save talent for later or book now.</p>
              </div>
              <div className="space-y-4">
                 <h4 className="text-xl font-bold">3. Book or Message</h4>
                 <p className="text-zinc-500 leading-relaxed">Direct lines to editors. No intermediaries, just collaboration.</p>
              </div>
           </div>
           <button className="w-full py-5 bg-indigo-600 text-white font-black rounded-3xl shadow-xl">Start Hiring</button>
        </div>

        {/* Editors */}
        <div className="p-12 md:p-20 bg-indigo-950/10 border border-indigo-500/30 rounded-[60px] space-y-16">
           <h2 className="text-4xl font-black uppercase tracking-tighter text-indigo-500">For Editors</h2>
           <div className="space-y-12">
              <div className="space-y-4">
                 <h4 className="text-xl font-bold">1. Create Profile</h4>
                 <div className="aspect-video bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-800">
                    <img src="https://picsum.photos/seed/tsu_ed1/600/400" className="w-full h-full object-cover opacity-60" />
                 </div>
                 <p className="text-zinc-500 leading-relaxed">Build a luxury showcase that highlights your best signature work.</p>
              </div>
              <div className="space-y-4">
                 <h4 className="text-xl font-bold">2. Upload Reel</h4>
                 <p className="text-zinc-500 leading-relaxed">Native video hosting ensures your work looks as intended on every screen.</p>
              </div>
              <div className="space-y-4">
                 <h4 className="text-xl font-bold">3. Get Hired</h4>
                 <p className="text-zinc-500 leading-relaxed">Focus on the craft while we handle the discovery and discovery.</p>
              </div>
           </div>
           <button className="w-full py-5 bg-white text-black font-black rounded-3xl shadow-xl">Join the Elite</button>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="px-6 py-40 max-w-3xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-16 tracking-tighter uppercase">Frequently Asked</h2>
        <div className="space-y-4">
           {faqs.map((faq, i) => (
             <div key={i} className="border border-zinc-800 rounded-3xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center bg-zinc-900/50 hover:bg-zinc-800 transition-colors"
                >
                  <span className="font-bold text-lg">{faq.q}</span>
                  <i className={`fa-solid fa-chevron-down transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-8 py-6 bg-zinc-900/30 text-zinc-400 leading-relaxed border-t border-zinc-800">
                    {faq.a}
                  </div>
                )}
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
