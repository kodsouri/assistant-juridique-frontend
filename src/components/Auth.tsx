import React, { useState } from 'react';
import { translations } from '../App';
import { Scale, Mail, Lock } from 'lucide-react';

interface AuthProps {
  lang: string;
  setLang: (lang: string) => void;
  onLoginSuccess: () => void;
}

export const Auth: React.FC<AuthProps> = ({ lang, setLang, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const t = translations[lang];
  const isRtl = lang === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: brancher l'authentification reelle (Keycloak / Spring Boot -> JWT).
    if (email.trim() && password.trim()) onLoginSuccess();
  };

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center bg-[#F2F5FA] px-4 relative"
      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
    >
      {/* Selecteur de langue en haut a droite */}
      <div className="absolute top-6 right-6 bg-white border border-[#E1E7F0] rounded-xl px-3 py-1.5 text-xs font-semibold">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="bg-transparent outline-none cursor-pointer text-[#5A6B85] font-semibold"
        >
          <option value="fr">Français</option>
          <option value="ar">العربية</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="w-full max-w-sm bg-white border border-[#E1E7F0] p-8 rounded-2xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#15294D] flex items-center justify-center text-white mx-auto mb-3">
            <Scale size={24} />
          </div>
          <h2 className="text-xl font-semibold text-[#15294D] tracking-tight">{t.title}</h2>
          <p className="text-xs text-[#7A89A6] mt-1 font-medium">{t.sub}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-[#7A89A6] px-0.5">{t.email}</label>
            <div className="flex items-center gap-2 bg-[#F6F8FC] border border-[#E1E7F0] rounded-xl px-3.5 focus-within:border-[#2F5BAC] transition">
              <Mail size={15} className="text-[#7A89A6]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="me.kods@jurisconsult.tn"
                className="flex-1 bg-transparent py-2.5 text-sm outline-none"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-[#7A89A6] px-0.5">{t.pass}</label>
            <div className="flex items-center gap-2 bg-[#F6F8FC] border border-[#E1E7F0] rounded-xl px-3.5 focus-within:border-[#2F5BAC] transition">
              <Lock size={15} className="text-[#7A89A6]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="flex-1 bg-transparent py-2.5 text-sm outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2F5BAC] hover:bg-[#264d8a] text-white font-semibold text-xs py-3.5 rounded-xl transition uppercase tracking-wider mt-2"
          >
            {t.connect}
          </button>
        </form>
      </div>

      <p className="text-[10px] text-[#9AA8C2] mt-5 font-medium">© 2026 JurisConsult — Horizon University</p>
    </div>
  );
};