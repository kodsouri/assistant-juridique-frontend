import React from 'react';
import { translations } from '../App';
import {
  LayoutDashboard,
  MessageCircle,
  FolderOpen,
  Users,
  LineChart,
  Settings,
  History,
  Plus,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  lang: string;
  setLang: (lang: string) => void;
}

const navItems = [
  { key: 'dashboard', Icon: LayoutDashboard, label: 'Tableau de bord' },
  { key: 'chat', Icon: MessageCircle, label: 'Discussion' },
  { key: 'docs', Icon: FolderOpen, label: 'Fichiers Actifs' },
  { key: 'users', Icon: Users, label: 'Utilisateurs' },
  { key: 'analyses', Icon: LineChart, label: 'Analyses IA' },
  { key: 'settings', Icon: Settings, label: 'Paramètres' },
];

const history = [
  { titre: 'Licenciement abusif', meta: 'Code du travail · 4 min' },
  { titre: "Création d'une SARL", meta: 'Sociétés · 12 min' },
  { titre: 'Délai de préavis CDI', meta: 'Code du travail · 23 min' },
  { titre: 'Divorce consentement mutuel', meta: 'Statut personnel · 31 min' },
  { titre: 'Congé de maternité', meta: 'Code du travail · 1 h' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, lang, setLang }) => {
  const t = translations[lang];

  return (
    <aside className="w-64 bg-[#15294D] flex flex-col h-screen select-none p-3">
      <div className="flex items-center gap-2.5 px-2 pb-3 border-b border-[#2A406B]">
        <div className="w-8 h-8 rounded-lg bg-[#2F5BAC] flex items-center justify-center text-white text-base">⚖️</div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white tracking-tight">{t.title}</p>
          <p className="text-[10px] text-[#8FA0BE]">{t.sub}</p>
        </div>
      </div>

      <button
        onClick={() => setActiveTab('chat')}
        className="mt-3 flex items-center justify-center gap-2 bg-[#2F5BAC] hover:bg-[#264d8a] text-white text-xs font-semibold py-2.5 rounded-xl transition"
      >
        <Plus size={15} /> {t.newChat}
      </button>

      <nav className="mt-3 flex flex-col gap-1">
        {navItems.map(({ key, Icon, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
              activeTab === key ? 'bg-[#2F5BAC] text-white' : 'text-[#AEBDD6] hover:bg-[#1D3A66]'
            }`}
          >
            <Icon size={17} /> {label}
          </button>
        ))}
      </nav>

      <div className="mt-4 px-2 mb-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider text-[#7E8DA8] font-semibold">{t.history}</span>
        <History size={13} className="text-[#7E8DA8]" />
      </div>
      <div className="flex flex-col gap-0.5 overflow-y-auto flex-1">
        {history.map((h, i) => (
          <button
            key={i}
            className={`text-start px-3 py-2 rounded-lg transition ${
              i === 0 ? 'bg-[#1D3A66]' : 'hover:bg-[#1D3A66]'
            }`}
          >
            <p className={`text-[11.5px] truncate ${i === 0 ? 'text-white' : 'text-[#C9D4E8]'}`}>{h.titre}</p>
            <p className="text-[10px] text-[#7E8DA8] truncate">{h.meta}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 pt-3 border-t border-[#2A406B] mt-2">
        <div className="bg-[#1D3A66] px-3 py-2 rounded-xl flex items-center justify-between text-[11px] font-semibold">
          <span className="text-[#8FA0BE]">{t.langLabel} :</span>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-transparent outline-none cursor-pointer text-white font-semibold"
          >
            <option className="text-[#15294D]" value="fr">FR</option>
            <option className="text-[#15294D]" value="ar">AR</option>
            <option className="text-[#15294D]" value="en">EN</option>
          </select>
        </div>

        <button
          onClick={onLogout}
          className="w-full bg-transparent hover:bg-[#1D3A66] text-[#AEBDD6] border border-[#2A406B] font-semibold text-[11px] py-2.5 rounded-xl transition"
        >
          {t.logout}
        </button>
      </div>
    </aside>
  );
};