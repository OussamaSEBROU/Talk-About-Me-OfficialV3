export interface MemorialPerson {
  Index: string;
  Name: string;
  الاسم: string;
  Age: string;
  Born: string;
  Sex: 'm' | 'f';
  ID: string;
  lat?: number;
  lng?: number;
  // Humanized fields
  Dream?: string;
  Dream_ar?: string;
  Favorite_Place?: string;
  Favorite_Place_ar?: string;
  Last_Words?: string;
  Last_Words_ar?: string;
  MicroStory?: string;
  MicroStory_ar?: string;
}

export interface BoycottCompany {
  id: string;
  name: string;
  name_ar: string;
  category: 'food' | 'tech' | 'clothing' | 'finance' | 'entertainment' | 'other';
  reason: string;
  reason_ar: string;
  source: string;
  alternative: string;
  alternative_ar: string;
  logo?: string;
}
