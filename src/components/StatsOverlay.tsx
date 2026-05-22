import { MemorialPerson } from '../types';

export default function StatsOverlay({ data, lang, theme = 'light' }: { data: MemorialPerson[], lang: 'ar'|'en', theme?: 'light'|'dark' }) {
    const isAr = lang === 'ar';
    const isDark = theme === 'dark';
    
    let childrenCount = 0;
    let womenCount = 0;
    let menCount = 0;
    
    data.forEach(p => {
      const ageStr = String(p.Age || '').trim().toLowerCase();
      const sex = String(p.Sex || '').trim().toLowerCase();
      const ageNum = parseInt(ageStr);
      
      const isChild = ageStr.includes('less') || ageStr.includes('month') || ageStr.includes('day') || (ageNum <= 17);
      
      if (isChild && ageNum !== undefined && !isNaN(ageNum)) {
         childrenCount++;
      } else {
         if (sex === 'f' || sex === 'أنثى') womenCount++;
         else if (sex === 'm' || sex === 'ذكر') menCount++;
      }
    });

    const StatItem = ({ label, value, highlight, isLast, delay }: { label: string, value: number, highlight?: boolean, isLast?: boolean, delay: string }) => (
        <div className={`flex items-center opacity-0 animate-fade-up`} style={{ animationDelay: delay }}>
            <div className="flex flex-col items-center justify-center px-4 md:px-6 min-w-[65px] md:min-w-[90px] group cursor-default">
                <p className={`text-[15px] md:text-xl font-black transition-all group-hover:scale-110 mb-1 leading-none ${highlight ? 'text-[#C41E3A] drop-shadow-[0_0_8px_rgba(196,30,58,0.5)]' : (isDark ? 'text-white' : 'text-slate-900')}`}>
                    {value.toLocaleString()}
                </p>
                <p className={`text-[7px] md:text-[9px] uppercase tracking-widest font-bold transition-colors ${isDark ? 'text-white/40 group-hover:text-white/60' : 'text-slate-400 group-hover:text-slate-600'}`}>
                    {label}
                </p>
            </div>
            {!isLast && (
                <div className={`w-[1px] h-6 md:h-8 transition-colors ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}></div>
            )}
        </div>
    );

    return (
        <div className="absolute top-[80px] md:top-24 left-1/2 -translate-x-1/2 z-10 flex pointer-events-auto justify-center w-[95vw] md:w-auto">
            <div className={`relative backdrop-blur-2xl border rounded-full py-2.5 md:py-3.5 px-3 flex justify-center items-center shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-700 hover:scale-105 ${isDark ? 'bg-[#0B0F19]/80 border-white/10' : 'bg-white/90 border-white shadow-[0_10px_30px_rgba(0,0,0,0.06),inset_0_2px_10px_rgba(255,255,255,1)]'}`}>
                <StatItem label={isAr ? 'الشهداء' : 'VICTIMS'} value={data.length} delay="0s" />
                <StatItem label={isAr ? 'الرجال' : 'MEN'} value={menCount} delay="0.1s" />
                <StatItem label={isAr ? 'النساء' : 'WOMEN'} value={womenCount} delay="0.2s" />
                <StatItem label={isAr ? 'الأطفال' : 'CHILDREN'} value={childrenCount} highlight isLast delay="0.3s" />
                <div className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-[80%] h-[1px] olive-accent rounded-full opacity-50"></div>
            </div>
        </div>
    );
}
