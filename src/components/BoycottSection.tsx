import { useState, useEffect, useMemo } from 'react';
import { Search, X, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { boycottCompanies, categoryLabels } from '../data/boycottData';
import { BoycottCompany } from '../types';

export default function BoycottSection({ lang, theme = 'dark', isOpen, onClose }: { lang: 'ar'|'en', theme?: 'light'|'dark', isOpen: boolean, onClose: () => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [boycottCount, setBoycottCount] = useState(2_437_891);
  const isAr = lang === 'ar';
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setBoycottCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const filtered = useMemo(() => {
    return boycottCompanies.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.name_ar.includes(searchTerm);
      const matchCategory = activeCategory === 'all' || c.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [searchTerm, activeCategory]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-end md:items-center justify-center transition-all duration-300 ${isAr ? 'font-ar' : 'font-en'}`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      {/* Panel */}
      <div className={`relative w-full md:w-[600px] md:max-w-[90vw] max-h-[85vh] md:max-h-[80vh] rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col shadow-2xl border animate-[slideUpDrawer_0.4s_cubic-bezier(0.32,0.72,0,1)_forwards] ${isDark ? 'bg-[#0d1117] border-white/10' : 'bg-white border-slate-200'}`}>
        
        {/* Handle (mobile) */}
        <div className="md:hidden drawer-handle" />

        {/* Header */}
        <div className={`px-5 md:px-6 pt-4 md:pt-6 pb-3 border-b ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck size={22} className="text-[#556B2F]" />
              <h2 className={`text-lg md:text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {isAr ? 'قاطع لتصنع الفرق' : 'Boycott To Make A Difference'}
              </h2>
            </div>
            <button onClick={onClose} className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}>
              <X size={20} />
            </button>
          </div>

          {/* Social proof counter */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl mb-3 ${isDark ? 'bg-[#556B2F]/20 border border-[#556B2F]/30' : 'bg-[#556B2F]/10 border border-[#556B2F]/20'}`}>
            <div className="w-2 h-2 rounded-full bg-[#6B8E23] animate-pulse" />
            <p className={`text-xs font-bold ${isDark ? 'text-[#6B8E23]' : 'text-[#556B2F]'}`}>
              {isAr 
                ? `${boycottCount.toLocaleString()} شخص انضموا للمقاطعة` 
                : `${boycottCount.toLocaleString()} people joined the boycott`}
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className={`absolute ${isAr ? 'right-3' : 'left-3'} top-2.5 w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
            <input
              type="text"
              placeholder={isAr ? 'ابحث عن شركة...' : 'Search company...'}
              className={`w-full border rounded-xl py-2.5 text-sm ${isAr ? 'pr-10 pl-4' : 'pl-10 pr-4'} focus:outline-none focus:ring-2 transition-all font-medium ${isDark ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500 focus:ring-[#556B2F]/40' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-[#556B2F]/30'}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category filters */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap transition-all border font-bold ${activeCategory === 'all' ? (isDark ? 'bg-white text-slate-900 border-transparent' : 'bg-slate-900 text-white border-transparent') : (isDark ? 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200')}`}
            >
              {isAr ? '📋 الكل' : '📋 All'}
            </button>
            {Object.entries(categoryLabels).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap transition-all border font-bold ${activeCategory === key ? (isDark ? 'bg-white text-slate-900 border-transparent' : 'bg-slate-900 text-white border-transparent') : (isDark ? 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200')}`}
              >
                {val.icon} {isAr ? val.ar : val.en}
              </button>
            ))}
          </div>
        </div>

        {/* Company list */}
        <div className="flex-1 overflow-y-auto px-4 md:px-5 py-3 space-y-2.5 scrollbar-none">
          {filtered.length === 0 && (
            <div className={`text-center py-10 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              <p className="text-sm font-medium">{isAr ? 'لا توجد نتائج' : 'No results found'}</p>
            </div>
          )}
          {filtered.map((company, i) => (
            <div
              key={company.id}
              className={`rounded-2xl p-4 border transition-all duration-300 hover:scale-[1.01] ${isDark ? 'bg-slate-800/50 border-slate-700/50 hover:border-[#C41E3A]/40' : 'bg-white border-slate-200 hover:border-[#C41E3A]/30 shadow-sm'}`}
              style={{ 
                borderLeftWidth: '3px', 
                borderLeftColor: '#C41E3A',
                animationDelay: `${i * 60}ms` 
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {categoryLabels[company.category]?.icon} {isAr ? company.name_ar : company.name}
                  </h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium inline-block mt-1 ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-500'}`}>
                    {isAr ? categoryLabels[company.category]?.ar : categoryLabels[company.category]?.en}
                  </span>
                </div>
                <a href={company.source} target="_blank" rel="noopener noreferrer" className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-slate-500' : 'hover:bg-slate-100 text-slate-400'}`}>
                  <ExternalLink size={14} />
                </a>
              </div>

              <p className={`text-xs leading-relaxed mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {isAr ? company.reason_ar : company.reason}
              </p>

              {/* Alternative */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${isDark ? 'bg-[#556B2F]/15 border border-[#556B2F]/25' : 'bg-[#556B2F]/8 border border-[#556B2F]/15'}`}>
                <ArrowRight size={14} className="text-[#6B8E23] shrink-0" />
                <div>
                  <span className="text-[10px] font-bold text-[#6B8E23] uppercase tracking-wider block">
                    {isAr ? 'البديل' : 'ALTERNATIVE'}
                  </span>
                  <span className={`text-xs font-semibold ${isDark ? 'text-[#6B8E23]' : 'text-[#556B2F]'}`}>
                    {isAr ? company.alternative_ar : company.alternative}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
