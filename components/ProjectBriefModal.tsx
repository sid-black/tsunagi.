
import React, { useState } from 'react';
import { User } from '../types';
import { storage } from '../services/storageService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editor: User;
}

const PROJECT_TYPES = [
  { id: 'commercial', label: 'Commercial', icon: 'fa-tv' },
  { id: 'social', label: 'Social Media', icon: 'fa-hashtag' },
  { id: 'music', label: 'Music Video', icon: 'fa-music' },
  { id: 'corporate', label: 'Corporate', icon: 'fa-briefcase' },
  { id: 'wedding', label: 'Wedding', icon: 'fa-ring' },
  { id: 'other', label: 'Other', icon: 'fa-ellipsis' },
];

const ProjectBriefModal: React.FC<Props> = ({ isOpen, onClose, editor }) => {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    projectType: '',
    budget: 2500,
    deadline: '',
    revisions: '2',
    vision: '',
  });

  if (!isOpen) return null;

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    const brief = {
      ...formData,
      editorId: editor.id,
      editorName: editor.name,
      timestamp: new Date().toISOString(),
    };

    // Save to storage
    const existingBriefsRaw = await storage.get('sent_briefs');
    let briefs = [];
    if (existingBriefsRaw) {
      try { briefs = JSON.parse(existingBriefsRaw.value); } catch(e) {}
    }
    briefs.push(brief);
    await storage.set('sent_briefs', JSON.stringify(briefs));

    setIsSuccess(true);
  };

  const isStep1Valid = !!formData.projectType;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-[48px] overflow-hidden shadow-3xl animate-in fade-in zoom-in duration-300">
        {!isSuccess ? (
          <>
            {/* Header */}
            <div className="px-10 pt-10 pb-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black tracking-tighter text-white">Project Brief</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mt-1">Booking {editor.name}</p>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`h-1 w-8 rounded-full transition-colors ${step >= i ? 'bg-indigo-600' : 'bg-zinc-800'}`} />
                ))}
              </div>
            </div>

            {/* Steps Container */}
            <div className="px-10 pb-10">
              {step === 1 && (
                <div className="animate-in slide-in-from-right-8 duration-300">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">Step 1: Project Type</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {PROJECT_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setFormData({ ...formData, projectType: type.label })}
                        className={`flex flex-col items-center justify-center p-6 rounded-3xl border transition-all ${
                          formData.projectType === type.label 
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/20' 
                            : 'bg-zinc-800/50 border-zinc-700/50 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        <i className={`fa-solid ${type.icon} text-2xl mb-3`} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in slide-in-from-right-8 duration-300 space-y-8">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Step 2: Project Details</h4>
                  
                  <div className="space-y-4">
                    <label className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                      <span>Estimated Budget</span>
                      <span className="text-white">${formData.budget.toLocaleString()}{formData.budget >= 10000 ? '+' : ''}</span>
                    </label>
                    <input 
                      type="range" min="500" max="10000" step="100"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                      className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Deadline</label>
                      <input 
                        type="date"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-sm text-white focus:border-indigo-600 outline-none transition-all"
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Revisions</label>
                      <select 
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-sm text-white focus:border-indigo-600 outline-none appearance-none cursor-pointer"
                        value={formData.revisions}
                        onChange={(e) => setFormData({ ...formData, revisions: e.target.value })}
                      >
                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Rounds</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Your Vision</label>
                    <textarea 
                      placeholder="Describe the mood, pace, and goals..."
                      rows={3}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-sm text-white focus:border-indigo-600 outline-none transition-all resize-none"
                      onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-in slide-in-from-right-8 duration-300 space-y-10">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Step 3: Review & Send</h4>
                  
                  <div className="bg-zinc-950/50 rounded-3xl p-8 border border-zinc-800 space-y-4">
                    <div className="flex justify-between items-center border-b border-zinc-800/50 pb-4">
                      <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Editor</span>
                      <span className="text-xs text-white font-black uppercase tracking-widest">{editor.name}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-zinc-800/50 pb-4">
                      <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Type</span>
                      <span className="text-xs text-white font-black uppercase tracking-widest">{formData.projectType}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-zinc-800/50 pb-4">
                      <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Budget</span>
                      <span className="text-xs text-indigo-500 font-black uppercase tracking-widest">${formData.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Availability</span>
                      <span className="text-[10px] text-green-500 font-black uppercase tracking-widest bg-green-500/10 px-3 py-1 rounded-full">Available Now</span>
                    </div>
                  </div>

                  <div className="p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-2xl flex gap-4 items-center">
                    <i className="fa-solid fa-circle-info text-indigo-500" />
                    <p className="text-[10px] font-bold text-zinc-400 leading-relaxed uppercase tracking-widest">Sending this brief starts a direct line of communication with {editor.name.split(' ')[0]}.</p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-4 mt-12">
                {step > 1 && (
                  <button 
                    onClick={handleBack}
                    className="flex-grow py-5 bg-zinc-800 text-white font-black rounded-[24px] text-xs uppercase tracking-widest hover:bg-zinc-700 transition-all border border-zinc-700"
                  >
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button 
                    onClick={handleNext}
                    disabled={!isStep1Valid && step === 1}
                    className="flex-[2] py-5 bg-indigo-600 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-black rounded-[24px] text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20"
                  >
                    Next
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmit}
                    className="flex-[2] py-5 bg-white text-black font-black rounded-[24px] text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-2xl"
                  >
                    Send Brief
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="p-20 flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 text-4xl mb-10 shadow-inner">
               <i className="fa-solid fa-paper-plane" />
            </div>
            <h3 className="text-4xl font-black text-white tracking-tighter mb-4">Brief Sent!</h3>
            <p className="text-zinc-500 text-lg font-light leading-relaxed mb-12">
              Success. Your vision for a {formData.projectType.toLowerCase()} is on its way. {editor.name.split(' ')[0]} typically responds within 2 hours.
            </p>
            <button 
              onClick={onClose}
              className="w-full py-5 bg-zinc-800 text-white font-black rounded-[24px] text-xs uppercase tracking-widest hover:bg-zinc-700 transition-all border border-zinc-700"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectBriefModal;
