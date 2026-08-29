import React, { useState, useEffect, useRef } from 'react';
import { useSimulation, SIMULATION_STATES } from '../../context/SimulationContext';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  Scale, 
  PhoneCall, 
  CheckCheck,
  RefreshCw,
  Zap,
  Volume2,
  FileCheck,
  Languages
} from 'lucide-react';

const QUICK_REPLIES = [
  { id: 'legal', label: 'I need legal help', prompt: 'I need immediate legal assistance regarding my case under SC/ST Act.' },
  { id: 'threat', label: 'I feel threatened', prompt: 'Mujhe bahut darr lag raha hai, court ke log dhamki de rahe hain.' },
  { id: 'counselor', label: 'Connect with counselor', prompt: 'I would like to speak with a clinical counselor right now.' },
  { id: 'relief', label: 'Relief & Compensation Status', prompt: 'Check the status of my government financial rehabilitation compensation.' }
];

export default function SwarajChatbot() {
  const { simulationState, statePayload, language } = useSimulation();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);
  const isInitialMount = useRef(true);

  // Auto-scroll inside the chat message container
  const scrollToBottom = (behavior = 'smooth') => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior
      });
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
      return;
    }
    scrollToBottom('smooth');
  }, [messages, isTyping]);

  // Handle Initial State & Simulation State Sync
  useEffect(() => {
    if (simulationState === SIMULATION_STATES.CRITICAL_TEXT) {
      // Set the high linguistic threat scenario
      setMessages([
        {
          id: 'bot-welcome',
          sender: 'bot',
          time: '19:10',
          text: 'Namaste Rameshwar Ji. Main Samvedna Swaraj-AI Assistant hoon. Aap bina kisi jhijhak ke bol sakte hain. Aap kaisa mehsoos kar rahe hain?'
        },
        {
          id: 'user-critical-1',
          sender: 'user',
          time: '19:12',
          text: 'Mujhe bahut darr lag raha hai, court ke log dhamki de rahe hain.',
          isThreatFlagged: true,
          transliteration: 'I am feeling extremely scared, people from the court are threatening me.',
          sentimentScore: '-0.92 (High Intimidation / Acute Terror)'
        },
        {
          id: 'bot-critical-response',
          sender: 'bot',
          time: '19:12',
          text: 'Rameshwar Ji, aap ghabrayiye mat. Aap bilkul surakshit hain. Humne District Legal Services Authority (DLSA) aur Special Atrocities Nodal Officer ko confidential escort alert bhej diya hai. Senior Counselor Dr. Anita Sharma aapko turant patch kar rahi hain.',
          isAlertResponse: true,
          actions: [
            { label: 'Connect to Dr. Anita (SOS)', icon: PhoneCall, action: 'call' },
            { label: 'DLSA Escort Status: Dispatched', icon: ShieldCheck, action: 'status' }
          ]
        }
      ]);
    } else if (simulationState === SIMULATION_STATES.CRITICAL_VOICE) {
      setMessages([
        {
          id: 'bot-welcome',
          sender: 'bot',
          time: '19:10',
          text: 'Namaste. Samvedna AI is listening. You can speak or type in any language.'
        },
        {
          id: 'user-voice-1',
          sender: 'user',
          time: '19:13',
          isAudioMessage: true,
          duration: '0:07',
          transcript: 'Sunita Devi (Voice Note): "Humare ghar pe pathrav hua hai... koi sun nahi raha..."',
          transliteration: 'Stones were pelted at our house... nobody is listening...',
          voiceAnalysis: {
            jitter: '8.7% (Severe Vocal Tremor)',
            shimmer: '15.4%',
            stressScore: 94
          }
        },
        {
          id: 'bot-voice-response',
          sender: 'bot',
          time: '19:13',
          text: 'Aapki aawaz mein teevra tanav (panic tremor) detect hua hai. Local Police Control Room aur Special Atrocity Cell ko GPS coordinates ke saath alert bhej diya gaya hai. Kripya surakshit sthan par rahein.',
          isAlertResponse: true,
          actions: [
            { label: 'PCR Emergency Dispatch: Active', icon: ShieldCheck, action: 'police' },
            { label: 'Direct Helpline Patch (14566)', icon: PhoneCall, action: 'call' }
          ]
        }
      ]);
    } else {
      // Safe Default Scenario
      setMessages([
        {
          id: 'bot-welcome-safe',
          sender: 'bot',
          time: '19:10',
          text: 'Namaste! I am your Samvedna AI companion. I am here to assist you with emotional well-being, case progress tracking, legal counsel, and rehabilitation compensation under the SC/ST (PoA) Act. How can I support you today?'
        }
      ]);
    }
  }, [simulationState]);

  // Handle User Message Submission
  const handleSendMessage = (textToSend) => {
    const messageContent = textToSend || inputText;
    if (!messageContent.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: messageContent
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate Swaraj-NLP Empathetic Bot Response
    setTimeout(() => {
      let botReply = '';

      if (messageContent.toLowerCase().includes('legal') || messageContent.toLowerCase().includes('case')) {
        botReply = 'Under Section 15A of the SC/ST (PoA) Act, you are entitled to state-sponsored legal aid and witness protection. Your next hearing at the Special Court is scheduled for 14th September 2026. Would you like a consultation with the empanelled DLSA advocate?';
      } else if (messageContent.toLowerCase().includes('darr') || messageContent.toLowerCase().includes('threat') || messageContent.toLowerCase().includes('dhamki')) {
        botReply = 'Aapki suraksha hamari prathmikta hai. Humne District Protection Cell ko notify kiya hai. Police escort aur safe shelter house facility available hai. Kya hum aapki baat abhi counselor se karwayein?';
      } else if (messageContent.toLowerCase().includes('counselor') || messageContent.toLowerCase().includes('talk')) {
        botReply = 'Dr. Anita Sharma (Senior Clinical Psychologist) is available on the secure line. We are queuing a priority session for you right now.';
      } else if (messageContent.toLowerCase().includes('relief') || messageContent.toLowerCase().includes('compensation')) {
        botReply = 'Your DBT compensation installment of ₹1,25,000 (Stage: Post-Charge Sheet) is currently being processed by the District Collector Office (Sanction Order #MOSJE/RJ/2026/891).';
      } else {
        botReply = 'Thank you for sharing. I understand this process can be challenging, but you have the full backing of the Ministry. We are constantly monitoring your well-being. Please let me know how else I can assist.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: botReply,
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="clay-card flex flex-col h-145 overflow-hidden transition-all">
      
      {/* Chatbot Top Bar with Rich Lavender Gradient */}
      <div className="px-5 py-4 bg-linear-to-r from-[#4f2bd6] via-[#6342eb] to-[#7d54f5] text-white flex items-center justify-between border-b border-white/20">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner border border-white/30">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-purple-900 shadow-xs"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold font-heading text-white">
                Swaraj-NLP Mental Health Companion
              </h2>
            </div>
            <p className="text-[11px] text-purple-200 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              24x7 Multi-Lingual Distress Screening
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setMessages([])}
            className="p-2 rounded-xl text-purple-200 hover:text-white hover:bg-white/15 transition-all active:scale-95 cursor-pointer"
            title="Reset Chat Session"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Message Stream Area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-linear-to-b from-[#faf8ff] to-[#f5f1ff]">
        
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div 
              key={msg.id} 
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-spring-pop`}
            >
              <div className={`flex items-start gap-2.5 max-w-[88%] sm:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar with Claymorphic Badge */}
                <div className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 text-xs font-bold shadow-sm ${
                  isUser 
                    ? 'bg-[#6342eb] text-white' 
                    : 'bg-linear-to-tr from-[#7d54f5] to-[#5932ea] text-white border border-purple-200'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble Container */}
                <div className="space-y-1.5">
                  
                  {/* The Clay Bubble */}
                  <div className={`px-4 py-3 text-xs sm:text-sm leading-relaxed transition-all ${
                    isUser
                      ? 'rounded-2xl rounded-tr-none bg-linear-to-br from-[#6342eb] to-[#502cd8] text-white font-medium shadow-md shadow-purple-500/20 border border-purple-400/30'
                      : 'rounded-2xl rounded-tl-none bg-white text-slate-800 border border-purple-200/80 font-normal shadow-sm shadow-purple-500/10'
                  }`}>
                    
                    {/* Audio message presentation if applicable */}
                    {msg.isAudioMessage ? (
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-purple-900/70 border border-purple-400/40 text-white">
                          <Volume2 className="w-5 h-5 text-purple-300 animate-pulse" />
                          <span className="font-mono text-xs font-bold">Audio Note ({msg.duration})</span>
                          <span className="text-[10px] text-purple-200 ml-auto bg-purple-800/80 px-2 py-0.5 rounded-full">Acoustic Stream</span>
                        </div>
                        <p className="italic text-xs text-purple-100">{msg.transcript}</p>
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}

                    {/* Threat Flag Banner for User Messages */}
                    {msg.isThreatFlagged && (
                      <div className="mt-3 p-2.5 rounded-xl bg-amber-500/20 border border-amber-300/50 text-amber-100 text-xs space-y-1.5">
                        <div className="flex items-center gap-1.5 font-bold text-amber-200 text-[11px] animate-pulse">
                          <AlertTriangle className="w-4 h-4 text-amber-300" />
                          <span>⚠️ Threat Intent Detected (Confidence 94.2%)</span>
                        </div>
                        <div className="font-mono text-[11px] text-white/95 bg-purple-950/70 p-2 rounded-lg border border-purple-700">
                          <span className="text-purple-300">[Swaraj-NLP Translation]:</span> "{msg.transliteration}"
                        </div>
                      </div>
                    )}

                    {/* Threat / Acoustic Analysis Card inside Audio Message */}
                    {msg.voiceAnalysis && (
                      <div className="mt-2.5 p-2.5 rounded-xl bg-purple-950/70 border border-purple-400/40 text-xs font-mono text-purple-200 space-y-0.5">
                        <div>Vocal Jitter: <strong className="text-rose-300">{msg.voiceAnalysis.jitter}</strong></div>
                        <div>Tremor Shimmer: <strong className="text-amber-300">{msg.voiceAnalysis.shimmer}</strong></div>
                        <div>Distress Score: <strong className="text-rose-300">{msg.voiceAnalysis.stressScore}/100</strong></div>
                      </div>
                    )}

                    {/* Action buttons inside bot response if alert triggered */}
                    {msg.actions && (
                      <div className="mt-3.5 flex flex-wrap gap-2 pt-2.5 border-t border-purple-200/60">
                        {msg.actions.map((act, i) => {
                          const IconComp = act.icon;
                          return (
                            <button
                              key={i}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#6342eb] text-white text-xs font-bold hover:bg-[#502cd8] transition-all shadow-xs cursor-pointer active:scale-95"
                            >
                              <IconComp className="w-3.5 h-3.5 text-amber-300" />
                              <span>{act.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                  </div>

                  {/* Subtext and Timestamp */}
                  <div className={`flex items-center gap-2 px-1 text-[10px] text-purple-900/60 font-medium ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <span>{msg.time}</span>
                    {msg.subText && (
                      <>
                        <span>•</span>
                        <span className="italic">{msg.subText}</span>
                      </>
                    )}
                    {isUser && <CheckCheck className="w-3.5 h-3.5 text-[#6342eb]" />}
                  </div>

                </div>
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-2.5 animate-spring-pop">
            <div className="w-8 h-8 rounded-2xl bg-linear-to-tr from-[#7d54f5] to-[#5932ea] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-white border border-purple-200/80 flex items-center gap-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#6342eb] animate-bounce [animation-delay:0ms]"></span>
              <span className="w-2 h-2 rounded-full bg-[#6342eb] animate-bounce [animation-delay:150ms]"></span>
              <span className="w-2 h-2 rounded-full bg-[#6342eb] animate-bounce [animation-delay:300ms]"></span>
              <span className="text-xs text-purple-900/70 font-medium ml-1">Swaraj-NLP is analyzing context...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Reply Clay Pills */}
      <div className="px-4 py-2.5 bg-white border-t border-purple-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 shrink-0 font-mono">Quick:</span>
        {QUICK_REPLIES.map((pill) => (
          <button
            key={pill.id}
            onClick={() => handleSendMessage(pill.prompt)}
            className="px-3.5 py-1.5 rounded-full bg-[#f6f2fe] hover:bg-[#ede5fc] hover:text-[#5932ea] border border-purple-200/80 text-xs font-semibold text-purple-900 transition-all shrink-0 shadow-2xs hover:scale-102 active:scale-95 cursor-pointer"
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Input Composer with Clay Styling */}
      <div className="p-3.5 bg-white border-t border-purple-200/80">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2.5"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type in English, Hindi (हिंदी), or Hinglish..."
            className="clay-input flex-1 px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-purple-400 focus:outline-none"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className={`p-3 rounded-2xl transition-all duration-200 shadow-md ${
              inputText.trim() 
                ? 'clay-btn-primary cursor-pointer' 
                : 'bg-purple-100 text-purple-400 cursor-not-allowed border border-purple-200'
            }`}
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
