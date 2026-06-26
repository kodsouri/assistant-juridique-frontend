import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { Auth } from './components/Auth';

export const translations: any = {
  fr: { title: "JurisConsult", sub: "Espace Avocats", chat: "Discussion", docs: "Fichiers Actifs", logout: "Déconnexion", email: "Adresse Email", pass: "Mot de passe", connect: "Se connecter", placeholder: "Posez votre question juridique..." },
  ar: { title: "جريس-كونسلت", sub: "بوابة المحامين", chat: "المحادثة الآلية", docs: "الملفات النشطة", logout: "تسجيل الخروج", email: "البريد الإلكتروني", pass: "كلمة المرور", connect: "دخول", placeholder: "اسأل سؤالك القانوني هنا..." },
  en: { title: "JurisConsult", sub: "Lawyer Portal", chat: "Chat Assistant", docs: "Active Files", logout: "Log Out", email: "Email Address", pass: "Password", connect: "Sign In", placeholder: "Ask your legal question..." }
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('chat');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [lang, setLang] = useState<string>('fr');
  
  // خاصية ذكية لمعرفة هل المستخدم يفتح من الهاتف أم لا
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

  // 📱 أولاً: لو الشاشة شاشة هاتف (Mobile View) - ستايل فائق البساطة
  if (isMobile) {
    return (
      <div className="w-screen h-screen flex flex-col bg-slate-50" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
        {/* Header الهاتف العلوي النظيف */}
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center font-bold text-white text-xs">J</div>
            <span className="text-sm font-bold text-slate-900">{t.title}</span>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
            {t.logout}
          </button>
        </header>

        {/* منطقة محادثة الموبايل الفاتحة */}
        <div className="flex-1 overflow-hidden relative flex flex-col">
          <ChatArea lang={lang} />
        </div>
      </div>
    );
  }

  // 💻 ثانياً: لو الشاشة شاشة حاسوب (Desktop View) - الـ الويب العادي متاعنا
  return (
    <div className={`flex w-screen h-screen overflow-hidden bg-slate-50 text-slate-800 ${isRtl ? 'flex-row-reverse' : ''}`} style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setIsAuthenticated(false)} lang={lang} setLang={setLang} />
      <main className="flex-1 flex flex-col h-full bg-slate-50">
        {activeTab === 'chat' && <ChatArea lang={lang} />}
        {activeTab === 'docs' && (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
            <span className="text-xs font-bold tracking-wider uppercase bg-slate-200/60 text-slate-600 px-3 py-1.5 rounded-lg">{t.docs}</span>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;