
import React, { useState, useRef } from 'react';
import { editImage } from '../services/geminiService';

interface Props {
  editorName: string;
}

const AIImageEditor: React.FC<Props> = ({ editorName }) => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;
    setLoading(true);
    try {
      const edited = await editImage(image, prompt);
      if (edited) setResult(edited);
    } catch (err) {
      console.error(err);
      alert("Error editing image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 rounded-3xl bg-indigo-900/10 border border-indigo-500/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
          <i className="fa-solid fa-wand-magic-sparkles text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Image Preview Architect</h3>
          <p className="text-sm text-indigo-300">Edit thumbnails using natural language prompts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="aspect-video rounded-2xl bg-zinc-900 border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors group overflow-hidden"
        >
          {image ? (
            <img src={image} className="w-full h-full object-cover" />
          ) : (
            <>
              <i className="fa-solid fa-cloud-arrow-up text-3xl text-zinc-700 group-hover:text-indigo-500 mb-2" />
              <span className="text-zinc-500 font-medium">Upload thumbnail</span>
            </>
          )}
          <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
        </div>

        <div className="aspect-video rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center overflow-hidden">
          {result ? (
            <img src={result} className="w-full h-full object-cover" />
          ) : (
            <div className="text-zinc-600 flex flex-col items-center">
              <i className="fa-solid fa-image text-3xl mb-2" />
              <span>AI Result Preview</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'Add a cinematic glow' or 'Make it retro 80s style'"
          className="flex-grow bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        />
        <button 
          onClick={handleEdit}
          disabled={loading || !image || !prompt}
          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 text-white rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap"
        >
          {loading ? (
            <>
              <i className="fa-solid fa-circle-notch animate-spin" />
              Editing...
            </>
          ) : (
            'Apply Magic'
          )}
        </button>
      </div>
    </div>
  );
};

export default AIImageEditor;
