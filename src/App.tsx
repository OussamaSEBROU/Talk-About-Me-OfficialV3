import { useState, useEffect } from 'react';
import { fetchAndParseData } from './services/dataFetcher';
import { MemorialPerson } from './types';
import MapCanvas from './components/MapCanvas';
import SidePanel from './components/SidePanel';
import StatsOverlay from './components/StatsOverlay';
import FlashCard from './components/FlashCard';
import BoycottSection from './components/BoycottSection';
import HumanQuotes from './components/HumanQuotes';
import { Globe, Menu, Moon, Sun, ShieldCheck, Users } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<MemorialPerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [mapTheme, setMapTheme] = useState<'dark'|'light'>('dark');
  
  // App States
  const [panelOpen, setPanelOpen] = useState(false);
  const [boycottOpen, setBoycottOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<MemorialPerson | null>(null);
  const [introTextVisible, setIntroTextVisible] = useState(true);
  const [uiVisible, setUiVisible] = useState(false);

  useEffect(() => {
    fetchAndParseData().then(data => {
      setData(data);
      setLoading(false);
    }).catch(e => {
        console.error(e);
        setLoading(false);
    });
  }, []);

  const handleIntroEnd = () => {
     setIntroTextVisible(false);
     setTimeout(() => {
        setUiVisible(true);
     }, 1500);
  };

  const isAr = lang === 'ar';
  const isDark = mapTheme === 'dark';

  if (loading) {
     return (
         <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#0B0F19] text-white">
             <div className="w-12 h-12 border-4 border-white/10 border-t-[#C41E3A] rounded-full animate-spin mb-4"></div>
             <p className="text-white/60 tracking-widest uppercase text-sm">Loading Memorial Data...</p>
         </div>
     );
  }

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className={`relative w-screen h-screen overflow-hidden ${isDark ? 'bg-[#0B0F19]' : 'bg-[#e5e7eb]'} selection:bg-[#C41E3A]/30 ${isAr ? 'font-ar' : 'font-en'} flex`}>
      
      {/* Background Map layer */}
      <div className="absolute inset-0 w-full h-full">
        <MapCanvas data={data} theme={mapTheme} onPersonSelect={setSelectedPerson} onIntroEnd={handleIntroEnd} />
        <HumanQuotes lang={lang} theme={mapTheme} />
        <StatsOverlay data={data} lang={lang} theme={mapTheme} />
      </div>
      
      {/* Intro Overlay Text */}
      <div className={`absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none transition-all duration-[2000ms] ${introTextVisible ? 'opacity-100' : 'opacity-0'} ${isDark ? 'text-white drop-shadow-[0_0_20px_rgba(0,0,0,1)]' : 'text-slate-900 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]'}`}>
          <h1 className="text-xl sm:text-2xl md:text-5xl lg:text-7xl font-extrabold tracking-wide md:tracking-widest text-center px-4 leading-snug md:leading-tight sm:whitespace-nowrap" dir={isAr ? 'rtl' : 'ltr'}>
             {isAr ? (
               <>فلسطين من البحر <br className="sm:hidden" />إلى النهر</>
             ) : (
               <>Palestine From The River <br className="sm:hidden" />To The Sea</>
             )}
          </h1>
      </div>

      {/* Main UI Layer (Fades in after Drone Effect) */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 z-20 ${uiVisible ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Top floating nav on desktop */}
          <div className={`hidden md:flex pointer-events-auto absolute top-6 ${isAr ? 'left-6' : 'right-6'} z-20 gap-3`}>
              <button onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')} className={`backdrop-blur-2xl rounded-full h-12 px-6 flex items-center gap-2 transition-all duration-500 shadow-xl font-bold hover:scale-105 border ${isDark ? 'bg-[#0B0F19]/60 border-white/10 text-white hover:bg-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)]' : 'bg-white/70 border-white/60 text-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:bg-white/90'}`}>
                  <Globe size={20} className={isDark ? "opacity-90" : "opacity-80"} />
                  <span>{isAr ? 'English' : 'عربي'}</span>
              </button>
              
              <button onClick={() => setBoycottOpen(true)} className={`backdrop-blur-2xl rounded-full h-12 px-6 flex items-center gap-2 transition-all duration-500 shadow-xl font-bold hover:scale-105 border ${isDark ? 'bg-[#556B2F]/60 border-[#556B2F]/30 text-white hover:bg-[#6B8E23]/60' : 'bg-[#556B2F]/10 border-[#556B2F]/20 text-[#556B2F] hover:bg-[#556B2F]/20'}`}>
                  <ShieldCheck size={20} />
                  <span>{isAr ? 'المقاطعة' : 'Boycott'}</span>
              </button>

              <button onClick={() => setMapTheme(t => t === 'light' ? 'dark' : 'light')} className={`backdrop-blur-2xl rounded-full w-12 h-12 flex items-center justify-center transition-all duration-500 shadow-xl font-bold hover:scale-105 border ${isDark ? 'bg-[#0B0F19]/60 border-white/10 text-white hover:bg-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)]' : 'bg-white/70 border-white/60 text-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:bg-white/90'}`}>
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {!panelOpen && (
                <button onClick={() => setPanelOpen(true)} className={`backdrop-blur-2xl rounded-full w-12 h-12 flex items-center justify-center transition-all duration-500 shadow-xl font-bold hover:scale-105 border ${isDark ? 'bg-[#0B0F19]/60 border-white/10 text-white hover:bg-white/10' : 'bg-white/70 border-white/60 text-slate-800'}`}>
                    <Menu size={20} />
                </button>
              )}
          </div>

          {/* Bottom Navigation Bar (Mobile) */}
          <div className={`md:hidden pointer-events-auto fixed bottom-0 left-0 right-0 z-20 pb-safe safe-bottom bg-opacity-90 backdrop-blur-xl border-t transition-transform duration-500 ${panelOpen || selectedPerson || boycottOpen ? 'translate-y-full' : 'translate-y-0'} ${isDark ? 'bg-[#0B0F19]/90 border-white/10' : 'bg-white/90 border-slate-200'}`}>
              <div className="flex items-center justify-around py-3 px-2">
                  <button onClick={() => setPanelOpen(true)} className={`flex flex-col items-center gap-1 ${isDark ? 'text-white/70 hover:text-[#C41E3A]' : 'text-slate-600 hover:text-[#C41E3A]'}`}>
                      <Users size={22} />
                      <span className="text-[10px] font-bold">{isAr ? 'الشهداء' : 'Victims'}</span>
                  </button>
                  <button onClick={() => setBoycottOpen(true)} className={`flex flex-col items-center gap-1 ${isDark ? 'text-[#6B8E23] hover:text-[#C9A84C]' : 'text-[#556B2F] hover:text-[#C9A84C]'}`}>
                      <ShieldCheck size={22} />
                      <span className="text-[10px] font-bold">{isAr ? 'المقاطعة' : 'Boycott'}</span>
                  </button>
                  <button onClick={() => setMapTheme(t => t === 'light' ? 'dark' : 'light')} className={`flex flex-col items-center gap-1 ${isDark ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                      {isDark ? <Sun size={22} /> : <Moon size={22} />}
                      <span className="text-[10px] font-bold">{isAr ? 'المظهر' : 'Theme'}</span>
                  </button>
                  <button onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')} className={`flex flex-col items-center gap-1 ${isDark ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                      <Globe size={22} />
                      <span className="text-[10px] font-bold">{isAr ? 'English' : 'عربي'}</span>
                  </button>
              </div>
          </div>
      </div>

      <SidePanel 
          data={data} 
          lang={lang}
          theme={mapTheme}
          isOpen={panelOpen} 
          onClose={() => setPanelOpen(false)} 
          onPersonSelect={(p) => {
              setSelectedPerson(p);
              if (window.innerWidth < 768) setPanelOpen(false); 
          }} 
      />

      <BoycottSection
          lang={lang}
          theme={mapTheme}
          isOpen={boycottOpen}
          onClose={() => setBoycottOpen(false)}
      />

      {selectedPerson && (
          <FlashCard 
             person={selectedPerson} 
             lang={lang} 
             theme={mapTheme}
             onClose={() => setSelectedPerson(null)} 
          />
      )}
    </div>
  );
}
