
import React, { useState, useRef } from 'react';
import { animateThumbnail } from '../services/geminiService';

interface Props {
  editorName: string;
}

const VeoAnimator: React.FC<Props> = ({ editorName }) => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setVideoUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnimate = async () => {
    if (!image || !prompt) return;
    
    // Check for API key selection
    if (typeof window.aistudio !== 'undefined') {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
        // Billing info: ai.google.dev/gemini-api/docs/billing
      }
    }

    setLoading(true);
    try {
      const url = await animateThumbnail(image, prompt, setStatus);
      setVideoUrl(url);
    } catch (err) {
      console.error(err);
      alert("Video generation encountered an error. Please try again.");
    } finally {
      setLoading(false);
      setStatus('');
    }
  };

  return (
    <div className="p-8 rounded-3xl bg-purple-900/10 border border-purple-500/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
          <i className="fa-solid fa-film text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Veo Motion Animate</h3>
          <p className="text-sm text-purple-300">Turn a static frame into a living video sequence.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="aspect-video rounded-2xl bg-zinc-900 border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 transition-colors group overflow-hidden"
        >
          {image ? (
            <img src={image} className="w-full h-full object-cover" />
          ) : (
            <>
              <i className="fa-solid fa-image text-3xl text-zinc-700 group-hover:text-purple-500 mb-2" />
              <span className="text-zinc-500 font-medium">Upload starting frame</span>
            </>
          )}
          <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
        </div>

        <div className="aspect-video rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center overflow-hidden">
          {videoUrl ? (
            <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
          ) : (
            <div className="text-zinc-600 flex flex-col items-center px-6 text-center">
              {loading ? (
                <>
                  <i className="fa-solid fa-circle-notch animate-spin text-3xl mb-4 text-purple-500" />
                  <span className="text-purple-400 font-medium">{status}</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-clapperboard text-3xl mb-2" />
                  <span>Your animated preview will appear here</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'The camera pans slowly around the neon car'"
          className="flex-grow bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
        />
        <button 
          onClick={handleAnimate}
          disabled={loading || !image || !prompt}
          className="px-8 py-4 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 text-white rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap"
        >
          Generate Video (Veo)
        </button>
      </div>
    </div>
  );
};

export default VeoAnimator;
