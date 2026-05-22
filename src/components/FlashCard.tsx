import { MemorialPerson } from '../types';
import { X, Share2, Copy, ExternalLink, MessageCircle } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { useRef, useState } from 'react';

export default function FlashCard({ person, lang, theme = 'light', onClose }: { person: MemorialPerson, lang: 'ar'|'en', theme?: 'light'|'dark', onClose: () => void }) {
    const isAr = lang === 'ar';
    const isDark = theme === 'dark';
    const cardRef = useRef<HTMLDivElement>(null);
    const [isSharing, setIsSharing] = useState(false);

    const handleShare = async () => {
        if (!cardRef.current || isSharing) return;
        
        try {
            setIsSharing(true);
            const elementsToHide = cardRef.current.querySelectorAll('.no-capture');
            elementsToHide.forEach((el: any) => el.style.display = 'none');

            const blob = await htmlToImage.toBlob(cardRef.current, {
                backgroundColor: isDark ? '#0a0a0a' : '#fcfbfc',
                pixelRatio: 2, 
            });

            elementsToHide.forEach((el: any) => el.style.display = '');
            
            if (!blob) {
                setIsSharing(false);
                return;
            }
            
            const file = new File([blob], `martyr-${person.ID || 'unknown'}.png`, { type: 'image/png' });
            
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        files: [file],
                        title: isAr ? person.الاسم : person.Name,
                        text: isAr ? 'الاحتلال قتلني! أرجوك تحدث عني! #TalkAboutMe' : 'IDF KILLED ME! TALK ABOUT ME! #TalkAboutMe',
                    });
                } catch (error) {
                    console.log('Share error or cancelled', error);
                }
            } else {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `martyr.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
            setIsSharing(false);
        } catch (error) {
            console.error('Error generating image', error);
            setIsSharing(false);
        }
    };

    const dream = isAr ? person.Dream_ar : person.Dream;
    const lastWords = isAr ? person.Last_Words_ar : person.Last_Words;
    const microStory = isAr ? person.MicroStory_ar : person.MicroStory;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F19]/80 backdrop-blur-md transition-opacity duration-300 ${isAr ? 'font-ar' : 'font-en'}`} onClick={onClose} dir={isAr ? 'rtl' : 'ltr'}>
            <div 
                ref={cardRef}
                className={`relative w-full max-w-[340px] story-card-ratio rounded-[2.5rem] overflow-hidden flex flex-col justify-between animate-in fade-in zoom-in-95 duration-500 shadow-[0_0_40px_rgba(196,30,58,0.4)] border border-[#C41E3A]/40 animate-pulse-glow ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#fcfbfc]'}`}
                onClick={e => e.stopPropagation()}
            >
                {/* Floating Buttons */}
                <button onClick={onClose} className="no-capture absolute top-4 right-4 bg-slate-900/40 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-slate-900/60 transition-all z-20 shadow-lg">
                    <X size={18} />
                </button>

                <div className={`px-6 pt-12 pb-6 flex flex-col items-center text-center relative z-10 flex-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    
                    <p className={`text-[#C41E3A] text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase mb-4 opacity-100 ${isAr ? 'tracking-normal' : ''}`}>
                        {isAr ? "الاحتلال قتلني! أرجوك تحدث عني!" : "IDF KILLED ME! TALK ABOUT ME!"}
                    </p>

                    <h2 className="text-2xl md:text-3xl font-black mb-4 leading-tight drop-shadow-sm px-2">
                        {isAr ? (person.الاسم || person.Name) : (person.Name || person.الاسم)}
                    </h2>

                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#556B2F] to-transparent mb-4 opacity-50"></div>

                    <div className="w-full space-y-3 px-2 mb-4">
                        <div className={`flex items-center justify-between py-1.5 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                            <span className={`text-[10px] uppercase font-bold tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{isAr ? 'المعرف' : 'ID'}</span>
                            <span className="text-sm font-black">{person.ID}</span>
                        </div>

                        <div className={`flex items-center justify-between py-1.5 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                            <span className={`text-[10px] uppercase font-bold tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{isAr ? 'العمر' : 'AGE'}</span>
                            <span className="text-sm font-black">{person.Age} <span className="text-[10px] font-medium opacity-60">{isAr ? 'سنة' : 'y'}</span></span>
                        </div>
                        
                        {person.Sex && (
                            <div className={`flex items-center justify-between py-1.5 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                                <span className={`text-[10px] uppercase font-bold tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{isAr ? 'الجنس' : 'SEX'}</span>
                                <span className="text-sm font-black">{String(person.Sex).toLowerCase() === 'm' ? (isAr ? 'ذكر' : 'Male') : (String(person.Sex).toLowerCase() === 'f' ? (isAr ? 'أنثى' : 'Female') : person.Sex)}</span>
                            </div>
                        )}
                    </div>

                    {/* Humanized Fields */}
                    {dream && (
                        <div className="w-full text-left mb-3">
                            <p className="text-sm font-bold text-[#6B8E23] flex items-start gap-1.5 leading-snug">
                                <span className="shrink-0 mt-0.5">✨</span>
                                <span>{dream}</span>
                            </p>
                        </div>
                    )}

                    {lastWords && (
                        <div className="w-full text-left mb-3">
                            <p className="text-xs italic font-medium opacity-70 flex items-start gap-1.5 leading-snug">
                                <span className="shrink-0 mt-0.5">💬</span>
                                <span>"{lastWords}"</span>
                            </p>
                        </div>
                    )}

                    {microStory && (
                        <div className="w-full text-left mt-auto">
                            <p className="text-xs leading-relaxed opacity-80 italic mb-4">
                                {microStory}
                            </p>
                        </div>
                    )}

                    {/* Ministry of Health Note */}
                    <div className="w-full mt-auto pt-2 border-t border-dashed border-slate-300/30">
                        <p className={`text-[9px] leading-tight opacity-60 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {isAr 
                                ? "أنا واحد من 60,199 ضحية تم تسجيلهم وتوثيقهم من قبل وزارة الصحة بغزة حتى 31 يوليو 2025."
                                : "I am one of 60,199 victims recorded and certified by the Gaza Ministry of Health by 31 July 2025."
                            }
                        </p>
                    </div>
                </div>

                {/* Share Actions (Hidden during screenshot) */}
                <div className={`no-capture p-4 flex items-center justify-center gap-3 border-t ${isDark ? 'border-white/10 bg-[#0d1117]' : 'border-slate-200 bg-slate-50'}`}>
                    <button 
                        onClick={handleShare} 
                        disabled={isSharing}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#C41E3A] hover:bg-[#a01830] text-white py-2.5 rounded-xl text-sm font-bold transition-colors disabled:opacity-50"
                    >
                        <Share2 size={16} className={isSharing ? "animate-pulse" : ""} />
                        {isAr ? 'مشاركة' : 'Share'}
                    </button>
                    
                    <a href={`https://wa.me/?text=${encodeURIComponent(isAr ? `تحدثوا عن ${person.الاسم}.. ${window.location.href}` : `Talk about ${person.Name}.. ${window.location.href}`)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-[#25D366] text-white rounded-xl hover:bg-[#1ebd5a] transition-colors">
                        <MessageCircle size={18} />
                    </a>
                    
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(isAr ? `تحدثوا عن ${person.الاسم} #TalkAboutMe\n${window.location.href}` : `Talk about ${person.Name} #TalkAboutMe\n${window.location.href}`)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">
                        <X size={18} />
                    </a>

                    <button onClick={() => navigator.clipboard.writeText(window.location.href)} className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'}`}>
                        <Copy size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
