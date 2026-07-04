import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';

export const translations: any = {
  fr: {
    title: "JurisConsult",
    sub: "Espace Avocats",
    chat: "Discussion",
    docs: "Fichiers Actifs",
    logout: "Déconnexion",
    email: "Adresse Email",
    pass: "Mot de passe",
    connect: "Se connecter",
    placeholder: "Posez votre question juridique...",
    history: "Historique",
    newChat: "Nouvelle question",
    langLabel: "Langue",
    lawyer: "Avocat",
    sourcesBadge: "Sources vérifiées",
    useful: "Utile",
    copy: "Copier",
    summarize: "Résumer",
    levelTitle: "Niveau de réponse",
    simple: "Simple",
    medium: "Moyen",
    detailed: "Détaillé",
    simpleDesc: "Réponse courte et directe",
    mediumDesc: "Explication équilibrée",
    detailedDesc: "Analyse juridique complète",
    docsEmpty: "Aucun fichier actif pour le moment",
    botWelcome: "Bonjour, comment puis-je vous aider ?",
    simReply: "D'après le Code du travail tunisien, l'indemnité est fixée par le conseil de prud'hommes selon votre ancienneté.",
    sampleRef: "Code du travail, art. 23 bis",
    sampleDesc: "Indemnité de licenciement abusif",
    dashboard: "Tableau de bord",
    samples: ["Licenciement abusif", "Création d'une SARL", "Délai de préavis CDI"],
  },
  ar: {
    title: "جريس-كونسلت",
    sub: "بوابة المحامين",
    chat: "المحادثة الآلية",
    docs: "الملفات النشطة",
    logout: "تسجيل الخروج",
    email: "البريد الإلكتروني",
    pass: "كلمة المرور",
    connect: "دخول",
    placeholder: "اسأل سؤالك القانوني هنا...",
    history: "السجل",
    newChat: "سؤال جديد",
    langLabel: "اللغة",
    lawyer: "محامٍ",
    sourcesBadge: "مصادر موثّقة",
    useful: "مفيد",
    copy: "نسخ",
    summarize: "تلخيص",
    levelTitle: "مستوى الإجابة",
    simple: "مبسّط",
    medium: "متوسط",
    detailed: "مفصّل",
    simpleDesc: "إجابة قصيرة ومباشرة",
    mediumDesc: "شرح متوازن",
    detailedDesc: "تحليل قانوني كامل",
    docsEmpty: "لا توجد ملفات نشطة حالياً",
    botWelcome: "مرحباً، كيف يمكنني مساعدتك؟",
    simReply: "وفقاً لمجلة الشغل التونسية، يحدّد التعويض من طرف مجلس الأعراف حسب أقدميتك.",
    sampleRef: "مجلة الشغل، الفصل 23 مكرر",
    sampleDesc: "تعويض الطرد التعسفي",
    dashboard: "لوحة القيادة",
    samples: ["الطرد التعسفي", "تأسيس شركة ذات مسؤولية محدودة", "مدة الإشعار المسبق"],
  },
  en: {
    title: "JurisConsult",
    sub: "Lawyer Portal",
    chat: "Chat Assistant",
    docs: "Active Files",
    logout: "Log Out",
    email: "Email Address",
    pass: "Password",
    connect: "Sign In",
    placeholder: "Ask your legal question...",
    history: "History",
    newChat: "New question",
    langLabel: "Language",
    lawyer: "Lawyer",
    sourcesBadge: "Verified sources",
    useful: "Useful",
    copy: "Copy",
    summarize: "Summarize",
    levelTitle: "Answer level",
    simple: "Simple",
    medium: "Medium",
    detailed: "Detailed",
    simpleDesc: "Short and direct answer",
    mediumDesc: "Balanced explanation",
    detailedDesc: "Full legal analysis",
    docsEmpty: "No active files yet",
    botWelcome: "Hello, how can I help you?",
    simReply: "According to the Tunisian Labor Code, compensation is set by the labor council based on your seniority.",
    sampleRef: "Labor Code, art. 23 bis",
    sampleDesc: "Unfair dismissal compensation",
    dashboard: "Dashboard",
    samples: ["Unfair dismissal", "Setting up an LLC", "Notice period"],
  },
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('chat');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [lang, setLang] = useState<string>('fr');

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const t = translations[lang];
  const isRtl = lang === 'ar';

  if (!isAuthenticated) {
    return <Auth lang={lang} setLang={setLang} onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  if (isMobile) {
    return (
      <div className="w-screen h-screen flex flex-col bg-[#F2F5FA]" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
        <header className="bg-[#15294D] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#2F5BAC] flex items-center justify-center font-bold text-white text-xs">J</div>
            <span className="text-sm font-semibold text-white">{t.title}</span>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-[10px] font-semibold text-[#AEBDD6] bg-[#1D3A66] px-2.5 py-1 rounded-md">
            {t.logout}
          </button>
        </header>

        <div className="flex-1 overflow-hidden relative flex flex-col">
          <ChatArea lang={lang} />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex w-screen h-screen overflow-hidden bg-[#F2F5FA] text-[#15294D] ${isRtl ? 'flex-row-reverse' : ''}`} style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setIsAuthenticated(false)} lang={lang} setLang={setLang} />
      <main className="flex-1 flex flex-col h-full bg-[#F2F5FA]">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'chat' && <ChatArea lang={lang} />}
        {activeTab === 'docs' && (
          <div className="flex-1 flex flex-col items-center justify-center text-[#7A89A6] p-8">
            <span className="text-xs font-semibold tracking-wider uppercase bg-[#E8EEF8] text-[#2F5BAC] px-3 py-1.5 rounded-lg">{t.docsEmpty}</span>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;