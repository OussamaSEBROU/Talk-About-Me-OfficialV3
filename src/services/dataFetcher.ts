import * as XLSX from 'xlsx';
import { MemorialPerson } from '../types';
import { humanStories } from '../data/humanStories';

export const fetchAndParseData = async (): Promise<MemorialPerson[]> => {
  try {
    const response = await fetch('/api/victims');
    if (!response.ok) throw new Error('Failed to fetch from API');
    
    let data: MemorialPerson[] = await response.json();
    
    // Enrich with micro-stories
    data = data.map((p, index) => {
       const story = humanStories[index % humanStories.length];
       return {
         ...p,
         Index: p.Index || String(index + 1),
         ID: p.ID || "00000",
         Dream: p.Dream || story.Dream,
         Dream_ar: p.Dream_ar || story.Dream_ar,
         Favorite_Place: p.Favorite_Place || story.Favorite_Place,
         Favorite_Place_ar: p.Favorite_Place_ar || story.Favorite_Place_ar,
         Last_Words: p.Last_Words || story.Last_Words,
         Last_Words_ar: p.Last_Words_ar || story.Last_Words_ar,
         MicroStory: p.MicroStory || story.MicroStory,
         MicroStory_ar: p.MicroStory_ar || story.MicroStory_ar,
       };
    });
    
    return data;
  } catch (error) {
    console.warn('Failed to fetch/parse API, using mock data:', error);
    let mockData: MemorialPerson[] = Array.from({length: 150}).map((_, i) => {
      const t = Math.random();
      const w = (Math.random() - 0.5) * 0.08;
      const story = humanStories[i % humanStories.length];
      return {
        Index: String(i+1),
        Name: "Mock Data (Please upload file)",
        الاسم: "بيانات تجريبية (تعذر الاتصال بالخادم)",
        Age: i % 7 === 0 ? "10" : (i % 3 === 0 ? "65" : "25"),
        Born: "2000-01-01",
        Sex: i % 2 === 0 ? 'm' as const : 'f' as const,
        ID: "00000",
        lat: 31.23 + (t * 0.34) + w * -0.66,
        lng: 34.22 + (t * 0.30) + w * 0.75,
        Dream: story.Dream,
        Dream_ar: story.Dream_ar,
        Favorite_Place: story.Favorite_Place,
        Favorite_Place_ar: story.Favorite_Place_ar,
        Last_Words: story.Last_Words,
        Last_Words_ar: story.Last_Words_ar,
        MicroStory: story.MicroStory,
        MicroStory_ar: story.MicroStory_ar,
      };
    });
    return mockData;
  }
};
