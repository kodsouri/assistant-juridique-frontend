import React, { useState } from 'react';
import {
  Scale, Search, Bell, FileText, Users, MessageSquare, CircleCheck,
  Download, SlidersHorizontal, Zap, ListChecks, BookOpen, Eye,
} from 'lucide-react';

const metrics = [
  { Icon: FileText, label: 'Documents', value: '1 248', note: '+34 / semaine', up: true },
  { Icon: Users, label: 'Utilisateurs', value: '312', note: '47 actifs', up: true },
  { Icon: MessageSquare, label: 'Questions IA', value: '2 905', note: "186 aujourd'hui", up: false },
  { Icon: CircleCheck, label: 'Taux de réponse', value: '96,4%', note: 'avec sources', up: false },
];

const modes = [
  { key: 'simple', Icon: Zap, label: 'Simple', desc: 'Réponse courte et directe', width: '33%' },
  { key: 'moyen', Icon: ListChecks, label: 'Moyen', desc: 'Explication équilibrée', width: '66%' },
  { key: 'detaille', Icon: BookOpen, label: 'Détaillé', desc: 'Analyse juridique complète', width: '100%' },
];

const apercu: Record<string, { wc: string; txt: string }> = {
  simple: {
    wc: '≈ 25 mots',
    txt: "Le préavis pour un CDI est généralement d'un mois. Il dépend de votre ancienneté et de votre convention collective.",
  },
  moyen: {
    wc: '≈ 55 mots',
    txt: "Pour un CDI, le délai de préavis est fixé par le Code du travail et la convention collective applicable. Il est souvent d'un mois pour les employés et peut atteindre trois mois pour les cadres. Le préavis commence à la notification écrite du licenciement ou de la démission.",
  },
  detaille: {
    wc: '≈ 110 mots',
    txt: "Le délai de préavis d'un CDI en Tunisie est encadré par le Code du travail (art. 14 et suivants) et précisé par chaque convention collective. À défaut, il est d'un mois pour les employés et jusqu'à trois mois pour les cadres. Le décompte débute à la notification écrite. Pendant cette période, le salarié bénéficie d'heures pour recherche d'emploi. En cas de non-respect, une indemnité compensatrice est due. Des exceptions existent en cas de faute grave.",
  },
};

const domaines = [
  { label: 'Droit du travail', value: 38, color: '#2F5BAC' },
  { label: 'Droit des sociétés', value: 26, color: '#3E73C9' },
  { label: 'Statut personnel', value: 21, color: '#6A9AE0' },
  { label: 'Droit pénal', value: 15, color: '#9FBEEC' },
];

const activite = [
  { jour: 'L', value: 45 }, { jour: 'M', value: 65 }, { jour: 'M', value: 56 },
  { jour: 'J', value: 80 }, { jour: 'V', value: 100 }, { jour: 'S', value: 39 }, { jour: 'D', value: 31 },
];

const systeme = [
  { label: 'Base vectorielle', etat: 'En ligne', ok: true },
  { label: 'Service RAG', etat: 'En ligne', ok: true },
  { label: 'Keycloak', etat: 'En ligne', ok: true },
  { label: 'Latence moyenne', etat: '1,4 s', ok: false },
];

export const Dashboard: React.FC = () => {
  const [mode, setMode] = useState<string>('moyen');

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F2F5FA]">
      <header className="bg-[#15294D] px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#2F5BAC] flex items-center justify-center text-white"><Scale size={18} /></div>
          <span className="text-sm font-semibold text-white">Assistant juridique tunisien</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#1D3A66] rounded-lg px-3 py-1.5 text-[#AEBDD6] text-xs"><Search size={14} /> Rechercher...</div>
          <span className="relative text-[#AEBDD6]"><Bell size={18} /><span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#E24B4A] rounded-full" /></span>
          <div className="w-8 h-8 rounded-full bg-[#2F5BAC] text-white text-xs font-semibold flex items-center justify-center">SH</div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-lg font-semibold text-[#15294D]">Tableau de bord</h1>
            <p className="text-xs text-[#7A89A6]">Vue d'ensemble · lundi 29 juin 2026</p>
          </div>
          <button className="flex items-center gap-1.5 bg-[#2F5BAC] text-white text-xs font-semibold px-4 py-2 rounded-lg"><Download size={14} /> Exporter</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white border border-[#E1E7F0] rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs text-[#7A89A6] mb-1"><m.Icon size={15} /> {m.label}</div>
              <p className="text-2xl font-semibold text-[#15294D]">{m.value}</p>
              <p className={`text-[11px] mt-1 ${m.up ? 'text-[#1D9E75]' : 'text-[#7A89A6]'}`}>{m.up ? '↗ ' : ''}{m.note}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#E1E7F0] rounded-xl p-5 mb-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-[#15294D]"><SlidersHorizontal size={16} className="text-[#2F5BAC]" /> Mode de réponse de l'IA</h2>
            <span className="text-[11px] text-[#7A89A6]">Choisissez le niveau de détail</span>
          </div>
          <p className="text-xs text-[#7A89A6] mb-4">Chaque utilisateur règle la longueur des réponses selon son profil (citoyen, étudiant, avocat).</p>

          <div className="flex gap-3 mb-4">
            {modes.map(({ key, Icon, label, desc, width }) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={`flex-1 text-left border rounded-xl p-3 transition ${
                  mode === key ? 'border-[#2F5BAC] bg-[#EEF3FB]' : 'border-[#E1E7F0] hover:border-[#9FB6DD]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1"><Icon size={17} className="text-[#2F5BAC]" /><span className="text-[13px] font-semibold text-[#15294D]">{label}</span></div>
                <p className="text-[11px] text-[#7A89A6] mb-2">{desc}</p>
                <div className="h-1.5 bg-[#E1E7F0] rounded-full"><div className="h-full bg-[#2F5BAC] rounded-full" style={{ width }} /></div>
              </button>
            ))}
          </div>

          <div className="bg-[#F6F8FC] border border-[#E1E7F0] rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-[11px] text-[#7A89A6]"><Eye size={13} /> Aperçu — « Délai de préavis pour un CDI ? »</span>
              <span className="text-[11px] text-[#2F5BAC] bg-[#E8EEF8] px-2 py-0.5 rounded-full">{apercu[mode].wc}</span>
            </div>
            <p className="text-[12.5px] leading-relaxed text-[#2A3B5C]">{apercu[mode].txt}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white border border-[#E1E7F0] rounded-xl p-4">
            <h2 className="text-sm font-semibold text-[#15294D] mb-3">Documents par domaine</h2>
            <div className="flex flex-col gap-3">
              {domaines.map((d, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[11px] mb-1"><span className="text-[#5A6B85]">{d.label}</span><span className="text-[#7A89A6]">{d.value}%</span></div>
                  <div className="h-1.5 bg-[#E1E7F0] rounded-full"><div className="h-full rounded-full" style={{ width: `${d.value}%`, backgroundColor: d.color }} /></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#E1E7F0] rounded-xl p-4">
            <h2 className="text-sm font-semibold text-[#15294D] mb-3">Activité (7 jours)</h2>
            <div className="flex items-end justify-between gap-2" style={{ height: 112 }}>
              {activite.map((a, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1 h-full">
                  <div className="w-full bg-[#2F5BAC] rounded-t-md" style={{ height: a.value, opacity: a.jour === 'V' ? 1 : 0.4 }} />
                  <span className="text-[10px] text-[#7A89A6]">{a.jour}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E1E7F0] rounded-xl p-4">
          <h2 className="text-sm font-semibold text-[#15294D] mb-3">État du système</h2>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {systeme.map((s, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-[#5A6B85]">{s.label}</span>
                <span className={`font-semibold ${s.ok ? 'text-[#1D9E75]' : 'text-[#15294D]'}`}>{s.ok ? '● ' : ''}{s.etat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};