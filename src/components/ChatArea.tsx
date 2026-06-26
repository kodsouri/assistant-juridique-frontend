import React, { useState } from 'react';
import { translations } from '../App';

interface ChatAreaProps {
  lang: string;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ lang }) => {
  const t = translations[lang];
  const [messages, setMessages] = useState([
    { id: '1', text: lang === 'ar' ? "مرحباً سيادة المحامي، كيف يمكنني مساعدتك اليوم؟" : "Bonjour Maître, comment puis-je vous aider aujourd'hui ?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), text: inputValue, sender: 'user' }]);
    setInputValue('');
  };

  return (
    <div className="flex-1 flex flex-col h-full relative bg-slate-50">
      <div className="flex-1 overflow-y-auto px-8 py-6 pb-28 flex flex-col gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[65%] p-3.5 rounded-2xl text-sm leading-relaxed ${
              msg.sender === 'user' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-800 shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-5 left-6 right-6 bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm flex items-center gap-2">
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder={t.placeholder} className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 px-3 py-2" />
        <button onClick={handleSend} className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-lg transition">➔</button>
      </div>
    </div>
  );
};