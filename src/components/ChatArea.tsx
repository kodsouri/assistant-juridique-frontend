import React, { useState } from 'react';
import { translations } from '../App';

interface ChatAreaProps {
  lang: string;
}

interface Source {
  ref: string;
  desc: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  sources?: Source[];
}

export const ChatArea: React.FC<ChatAreaProps> = ({ lang }) => {
  const t = translations[lang];

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: t.botWelcome, sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');

  // Niveau de detail demande a l'IA. Cette valeur sera envoyee au backend (RAG)
  // pour ajuster la longueur de la reponse : simple / moyen / detaille.
  const [level, setLevel] = useState<'simple' | 'medium' | 'detailed'>('medium');

  const levels = [
    { key: 'simple', label: t.simple, desc: t.simpleDesc, icon: '⚡' },
    { key: 'medium', label: t.medium, desc: t.mediumDesc, icon: '📋' },
    { key: 'detailed', label: t.detailed, desc: t.detailedDesc, icon: '📚' },
  ] as const;

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: inputValue, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // TODO: remplacer par un appel a l'API Spring Boot (couche RAG).
    //   POST /api/chat  { question, level }  ->  { answer, sources[] }
    // Ci-dessous : reponse simulee pour la demonstration de l'interface.
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: t.simReply,
        sender: 'bot',
        sources: [{ ref: t.sampleRef, desc: t.sampleDesc }],
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  };

  return (
    <div className="flex-1 flex flex-col h-full relative bg-[#F2F5FA]">
      {/* Zone des messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-44 flex flex-col gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 shrink-0 rounded-lg bg-[#15294D] flex items-center justify-center text-white text-sm me-2">⚖️</div>
            )}

            <div className="max-w-[68%]">
              <div
                className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#2F5BAC] text-white'
                    : 'bg-white border border-[#E1E7F0] text-[#2A3B5C]'
                }`}
              >
                {msg.text}
              </div>

              {/* Sources juridiques (uniquement pour les reponses du bot) */}
              {msg.sources && (
                <div className="mt-2 flex flex-col gap-1.5">
                  {msg.sources.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white border border-[#2F5BAC] rounded-lg px-3 py-2">
                      <span className="text-[#2F5BAC]">📄</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-[#15294D] truncate">{s.ref}</p>
                        <p className="text-[10px] text-[#7A89A6] truncate">{s.desc}</p>
                      </div>
                      <span className="text-[#7A89A6] text-xs">↗</span>
                    </div>
                  ))}
                  <div className="flex gap-4 mt-1 text-[11px] text-[#7A89A6]">
                    <button className="hover:text-[#2F5BAC] transition">👍 {t.useful}</button>
                    <button className="hover:text-[#2F5BAC] transition">⧉ {t.copy}</button>
                    <button className="hover:text-[#2F5BAC] transition">✦ {t.summarize}</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Barre basse : selecteur de niveau + champ de saisie */}
      <div className="absolute bottom-5 left-6 right-6 flex flex-col gap-2">
        {/* Selecteur du niveau de reponse */}
        <div className="flex items-center gap-2 bg-white border border-[#E1E7F0] rounded-xl px-2 py-1.5">
          <span className="text-[10px] text-[#7A89A6] font-semibold ms-1 me-1">{t.levelTitle} :</span>
          {levels.map((l) => (
            <button
              key={l.key}
              onClick={() => setLevel(l.key)}
              title={l.desc}
              className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition ${
                level === l.key ? 'bg-[#2F5BAC] text-white' : 'text-[#5A6B85] hover:bg-[#F2F5FA]'
              }`}
            >
              <span>{l.icon}</span> {l.label}
            </button>
          ))}
        </div>

        {/* Champ de saisie */}
        <div className="bg-white border border-[#E1E7F0] rounded-xl p-1.5 flex items-center gap-2">
          <span className="text-[#7A89A6] px-2">📎</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.placeholder}
            className="flex-1 bg-transparent border-none outline-none text-sm text-[#15294D] px-1 py-2"
          />
          <button
            onClick={handleSend}
            className="bg-[#2F5BAC] hover:bg-[#264d8a] text-white font-bold text-sm w-9 h-9 rounded-lg transition flex items-center justify-center"
          >
            ➔
          </button>
        </div>
      </div>
    </div>
  );
};