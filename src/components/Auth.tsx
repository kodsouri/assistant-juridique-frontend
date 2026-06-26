import React, { useState } from 'react';
import { translations } from '../App';

interface AuthProps {
  lang: string;
  setLang: (lang: string) => void;
  onLoginSuccess: () => void;
}

export const Auth: React.FC<AuthProps> = ({ lang, setLang, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const t = translations[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) onLoginSuccess();
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-50 px-4 relative">
      {/* خيار اللغة الفوقي النظيف */}
      <div className="absolute top-6 right-6 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm text-xs font-semibold">
        <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent outline-none cursor-pointer text-slate-600 font-bold">
          <option value="fr">Français</option>
          <option value="ar">العربية</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="w-full max-w-sm bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
        <div className="text-center mb-6">
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center font-bold text-white text-lg mx-auto mb-3">J</div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">{t.title}</h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">{t.sub}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-0.5">{t.email}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="me.kods@jurisconsult.tn" className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-slate-400 transition" required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-0.5">{t.pass}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-slate-400 transition" required />
          </div>
          <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3.5 rounded-xl transition shadow-sm uppercase tracking-wider mt-2">{t.connect}</button>
        </form>
      </div>
    </div>
  );
};