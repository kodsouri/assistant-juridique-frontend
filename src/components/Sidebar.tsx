import React from 'react';
import { translations } from '../App';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  lang: string;
  setLang: (lang: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, lang, setLang }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  return (
    <aside className="w-64 bg-white border-x border-slate-200 flex flex-col justify-between p-5 h-screen select-none">
      <div>
        <div className={`flex items-center gap-2.5 pb-5 border-b border-slate-100 ${isRtl ? 'justify-start' : ''}`}>
          <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center font-bold text-white text-xs">J</div>
          <span className="text-base font-bold text-slate-900 tracking-tight">{t.title}</span>
        </div>

        <nav className="mt-6 flex flex-col gap-1">
          <button onClick={() => setActiveTab('chat')} className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${activeTab === 'chat' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'}`}>
            <span>💬</span> {t.chat}
          </button>
          <button onClick={() => setActiveTab('docs')} className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${activeTab === 'docs' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'}`}>
            <span>📂</span> {t.docs}
          </button>
        </nav>
      </div>

      <div className="flex flex-col gap-3">
        {/* منتقي لغة مدمج وأنيق أسفل القائمة */}
        <div className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl flex items-center justify-between text-[11px] font-bold">
          <span className="text-slate-400">Langue:</span>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent outline-none cursor-pointer text-slate-700 font-bold">
            <option value="fr">FR</option>
            <option value="ar">AR</option>
            <option value="en">EN</option>
          </select>
        </div>

        <button onClick={onLogout} className="w-full bg-white hover:bg-slate-50 text-slate-500 border border-slate-200 font-bold text-[11px] py-2.5 rounded-xl transition">
          {t.logout}
        </button>
      </div>
    </aside>
  );
};