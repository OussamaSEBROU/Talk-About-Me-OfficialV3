import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import * as XLSX from 'xlsx';
import fs from 'fs';

let cachedVictimsData: any[] | null = null;

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  // API route to read local file or provide fallback
  app.get('/api/victims', async (req, res) => {
    if (cachedVictimsData) {
      return res.json(cachedVictimsData);
    }

    try {
      const githubUrl = 'https://raw.githubusercontent.com/OussamaSEBROU/TalkAboutMe/main/victims_data.xlsx';
      let data: any[] = [];
      
      try {
        console.log('Fetching data from GitHub...');
        const response = await fetch(githubUrl);
        if (response.ok) {
           const arrayBuffer = await response.arrayBuffer();
           const workbook = XLSX.read(arrayBuffer, { type: 'array' });
           const sheetName = workbook.SheetNames[0];
           data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { range: 1 });
        } else {
           throw new Error(`GitHub fetch failed: ${response.status}`);
        }
      } catch (err) {
        console.error('Failed to fetch from github, falling back to local files...', err);
        
        const possiblePaths = [
          path.join(process.cwd(), 'public', 'victims_data.xlsx'),
          path.join(process.cwd(), 'dist', 'victims_data.xlsx'),
          path.join(process.cwd(), 'victims_data.xlsx')
        ];
        
        const xlsxPath = possiblePaths.find(p => fs.existsSync(p));
        
        if (xlsxPath) {
          console.log('Found local excel file at:', xlsxPath);
          const workbook = XLSX.readFile(xlsxPath);
          const sheetName = workbook.SheetNames[0];
          data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { range: 1 });
        } else {
          console.log('No local file found, using mock data.');
          // Send high-quality mock data so the UI can be showcased immediately!
          data = Array.from({length: 150}).map((_, i) => ({
            Index: String(i+1),
            Name: "Mock Data (Please upload file)",
            الاسم: "بيانات تجريبية (يرجى رفع الملف يسار الشاشة)",
            Age: i % 7 === 0 ? "10" : (i % 3 === 0 ? "65" : "25"),
            Born: "2000-01-01",
            Sex: i % 2 === 0 ? "m" : "f",
            ID: "00000"
          }));
        }
      }
      
      // Pre-generate offset lat/lng for mapping
      data = data.map(p => {
         const t = Math.random();
         const w = (Math.random() - 0.5) * 0.08;
         return {
           ...p,
           lat: p.lat ?? (31.23 + (t * 0.34) + w * -0.66), 
           lng: p.lng ?? (34.22 + (t * 0.30) + w * 0.75)
         };
      });

      cachedVictimsData = data;
      res.json(data);
    } catch (error) {
      console.error('Server error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch or parse data' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

