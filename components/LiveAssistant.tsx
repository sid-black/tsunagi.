
import React, { useState, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { GEMINI_MODELS } from '../constants';

const LiveAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [transcriptions, setTranscriptions] = useState<string[]>([]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);

  // Fix: Manual decode implementation as per guidelines
  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  // Fix: Manual encode implementation as per guidelines
  const encode = (bytes: Uint8Array) => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Fix: Manual audio decoding implementation as per guidelines
  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const stopSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close?.();
      sessionRef.current = null;
    }
    setIsActive(false);
  }, []);

  const startSession = async () => {
    try {
      // Fix: Use process.env.API_KEY directly as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: GEMINI_MODELS.VOICE,
        callbacks: {
          onopen: () => {
            setIsActive(true);
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              // Fix: CRITICAL: Solely rely on sessionPromise resolves and then call `session.sendRealtimeInput`
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              setTranscriptions(prev => [...prev, `AI: ${text}`]);
            }
            if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              setTranscriptions(prev => [...prev, `You: ${text}`]);
            }

            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && outAudioContextRef.current) {
              const ctx = outAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => {
                try { s.stop(); } catch (e) {}
              });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => { console.error("Live Error", e); stopSession(); },
          onclose: () => { setIsActive(false); }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: "You are the VidiConnect Marketplace Assistant. Help users find editors, understand video jargon, and use the platform's AI tools. Keep it concise and friendly.",
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      alert("Failed to start voice session. Check microphone permissions.");
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-600/40 hover:scale-110 transition-transform active:scale-95 group relative"
      >
        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-microphone'} text-2xl text-white`} />
        {!isOpen && (
          <span className="absolute -top-12 right-0 bg-indigo-600 text-white text-xs font-bold py-2 px-3 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Talk to Assistant
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 glass-effect rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[500px]">
          <div className="p-6 bg-indigo-600 flex justify-between items-center">
            <h3 className="font-bold text-white">Marketplace Assistant</h3>
            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-zinc-400'}`} />
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-zinc-950/50 min-h-[200px]">
            {transcriptions.length === 0 ? (
              <p className="text-zinc-500 text-sm text-center italic mt-10">Start a conversation to get help with your creative projects.</p>
            ) : (
              transcriptions.map((t, i) => (
                <div key={i} className={`text-sm p-3 rounded-2xl ${t.startsWith('You:') ? 'bg-zinc-800 text-zinc-100 ml-4' : 'bg-indigo-900/40 text-indigo-100 mr-4'}`}>
                  {t}
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-white/5 bg-zinc-900/50">
            {isActive ? (
              <button 
                onClick={stopSession}
                className="w-full py-3 bg-red-600/20 text-red-400 border border-red-600/30 rounded-xl font-bold hover:bg-red-600/30 transition-all"
              >
                Stop Assistant
              </button>
            ) : (
              <button 
                onClick={startSession}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-lg"
              >
                Start Conversation
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LiveAssistant;
