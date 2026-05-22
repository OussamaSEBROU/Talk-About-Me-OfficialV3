import { BoycottCompany } from '../types';

export const boycottCompanies: BoycottCompany[] = [
  {
    id: 'mcdonalds',
    name: "McDonald's",
    name_ar: "ماكدونالدز",
    category: 'food',
    reason: "Provided free meals to Israeli soldiers during the assault on Gaza.",
    reason_ar: "قدّمت وجبات مجانية للجنود الإسرائيليين أثناء العدوان على غزة.",
    source: "https://www.bdsmovement.net",
    alternative: "Local restaurants & burger shops",
    alternative_ar: "المطاعم المحلية ومحلات البرغر"
  },
  {
    id: 'starbucks',
    name: "Starbucks",
    name_ar: "ستاربكس",
    category: 'food',
    reason: "CEO publicly expressed pro-Israel stance and sued workers' union for solidarity posts.",
    reason_ar: "المدير التنفيذي أعلن دعمه لإسرائيل ورفع دعوى ضد نقابة العمال بسبب منشورات تضامنية.",
    source: "https://www.bdsmovement.net",
    alternative: "Local coffee shops & roasters",
    alternative_ar: "المقاهي المحلية ومحامص القهوة"
  },
  {
    id: 'cocacola',
    name: "Coca-Cola",
    name_ar: "كوكا كولا",
    category: 'food',
    reason: "Operates a bottling plant in illegal Israeli settlement in occupied territory.",
    reason_ar: "تدير مصنع تعبئة في مستوطنة إسرائيلية غير شرعية في الأراضي المحتلة.",
    source: "https://www.bdsmovement.net",
    alternative: "Local beverages & juices",
    alternative_ar: "المشروبات والعصائر المحلية"
  },
  {
    id: 'puma',
    name: "Puma",
    name_ar: "بوما",
    category: 'clothing',
    reason: "Sponsored the Israel Football Association which includes teams from illegal settlements.",
    reason_ar: "رعت الاتحاد الإسرائيلي لكرة القدم الذي يضم فرقاً من مستوطنات غير شرعية.",
    source: "https://www.bdsmovement.net",
    alternative: "New Balance, Asics, local brands",
    alternative_ar: "نيو بالانس، أسيكس، العلامات المحلية"
  },
  {
    id: 'hp',
    name: "HP (Hewlett-Packard)",
    name_ar: "إتش بي",
    category: 'tech',
    reason: "Provides technology used in the Israeli military's surveillance of Palestinians at checkpoints.",
    reason_ar: "توفر تقنيات تُستخدم في مراقبة الفلسطينيين عند الحواجز العسكرية الإسرائيلية.",
    source: "https://www.bdsmovement.net",
    alternative: "Lenovo, Acer, ASUS",
    alternative_ar: "لينوفو، إيسر، أسوس"
  },
  {
    id: 'siemens',
    name: "Siemens",
    name_ar: "سيمنز",
    category: 'tech',
    reason: "Provides infrastructure to the Israeli occupation, including power systems for settlements.",
    reason_ar: "توفر بنية تحتية للاحتلال الإسرائيلي، بما في ذلك أنظمة طاقة المستوطنات.",
    source: "https://www.bdsmovement.net",
    alternative: "ABB, Schneider Electric",
    alternative_ar: "إيه بي بي، شنايدر إلكتريك"
  },
  {
    id: 'nestle',
    name: "Nestlé",
    name_ar: "نستله",
    category: 'food',
    reason: "Major shareholder in Osem, one of the largest food manufacturers in Israel.",
    reason_ar: "مساهم رئيسي في أوسيم، أحد أكبر مصنّعي الأغذية في إسرائيل.",
    source: "https://www.bdsmovement.net",
    alternative: "Local dairy & food brands",
    alternative_ar: "العلامات المحلية للألبان والأغذية"
  },
  {
    id: 'disney',
    name: "Disney",
    name_ar: "ديزني",
    category: 'entertainment',
    reason: "Produced content normalizing occupation and donated to pro-Israel lobbying groups.",
    reason_ar: "أنتجت محتوى يُطبّع مع الاحتلال وتبرّعت لمجموعات ضغط مؤيدة لإسرائيل.",
    source: "https://www.bdsmovement.net",
    alternative: "Studio Ghibli, independent films",
    alternative_ar: "ستوديو جيبلي، الأفلام المستقلة"
  },
  {
    id: 'carrefour',
    name: "Carrefour",
    name_ar: "كارفور",
    category: 'food',
    reason: "Franchise operates in illegal Israeli settlements in the occupied West Bank.",
    reason_ar: "تعمل فروعها في مستوطنات إسرائيلية غير شرعية في الضفة الغربية المحتلة.",
    source: "https://www.bdsmovement.net",
    alternative: "Local supermarkets & grocery stores",
    alternative_ar: "المتاجر والسوبرماركت المحلية"
  },
  {
    id: 'booking',
    name: "Booking.com",
    name_ar: "بوكينغ.كوم",
    category: 'tech',
    reason: "Lists properties in illegal Israeli settlements as legitimate accommodations.",
    reason_ar: "تدرج عقارات في مستوطنات إسرائيلية غير شرعية كمساكن شرعية.",
    source: "https://www.bdsmovement.net",
    alternative: "Local travel agencies, Airbnb alternatives",
    alternative_ar: "وكالات السفر المحلية، بدائل للحجز"
  },
  {
    id: 'zara',
    name: "Zara (Inditex)",
    name_ar: "زارا",
    category: 'clothing',
    reason: "Published ads mocking the destruction in Gaza and Palestinian suffering.",
    reason_ar: "نشرت إعلانات تسخر من الدمار في غزة ومعاناة الفلسطينيين.",
    source: "https://www.bdsmovement.net",
    alternative: "Local fashion brands, thrift shopping",
    alternative_ar: "العلامات المحلية للأزياء، التسوق المستدام"
  },
  {
    id: 'sabra',
    name: "Sabra Hummus",
    name_ar: "صبرا حمص",
    category: 'food',
    reason: "Joint venture with Strauss Group which openly supports the Israeli military (Golani Brigade).",
    reason_ar: "شراكة مع مجموعة شتراوس التي تدعم الجيش الإسرائيلي علنياً (لواء غولاني).",
    source: "https://www.bdsmovement.net",
    alternative: "Homemade hummus, local brands",
    alternative_ar: "حمص منزلي الصنع، العلامات المحلية"
  }
];

export const categoryLabels: Record<string, { en: string; ar: string; icon: string }> = {
  food: { en: 'Food & Beverage', ar: 'أغذية ومشروبات', icon: '🍔' },
  tech: { en: 'Technology', ar: 'تكنولوجيا', icon: '💻' },
  clothing: { en: 'Clothing & Fashion', ar: 'ملابس وأزياء', icon: '👕' },
  finance: { en: 'Finance & Banking', ar: 'تمويل ومصارف', icon: '🏦' },
  entertainment: { en: 'Entertainment', ar: 'ترفيه', icon: '🎬' },
  other: { en: 'Other', ar: 'أخرى', icon: '📦' },
};
