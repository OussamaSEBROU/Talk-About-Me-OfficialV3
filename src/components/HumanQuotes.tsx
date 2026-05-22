import { useMemo } from 'react';
import { floatingQuotes } from '../data/humanStories';

export default function HumanQuotes({ lang, theme = 'dark' }: { lang: 'ar'|'en', theme?: 'light'|'dark' }) {
  const isAr = lang === 'ar';
  const isDark = theme === 'dark';

  const quoteElements = useMemo(() => {
    const positions = [12, 28, 45, 62, 78];
    return floatingQuotes.slice(0, 5).map((q, i) => ({
      text: isAr ? q.ar : q.en,
      top: positions[i],
      duration: 18 + i * 5,
      delay: i * 4,
      reverse: i % 2 === 1,
      size: i === 2 ? 'text-3xl md:text-4xl' : (i % 2 === 0 ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'),
    }));
  }, [isAr]);

  return (
    <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
      {quoteElements.map((q, i) => (
        <div
          key={i}
          className={`floating-quote ${q.size} ${isDark ? 'text-white' : 'text-slate-900'}`}
          style={{
            top: `${q.top}%`,
            animation: `${q.reverse ? 'floatQuoteReverse' : 'floatQuote'} ${q.duration}s linear ${q.delay}s infinite`,
            opacity: 0,
          }}
        >
          {q.text}
        </div>
      ))}
    </div>
  );
}
