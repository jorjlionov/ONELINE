import { initDatabase } from '../database/db.js';
import { MovieModel } from '../models/movieModel.js';

async function seed() {
  await initDatabase();
  
  // ← ПРОВЕРКА: если данные уже есть — не добавляем
  const existing = await MovieModel.getAll();
  if (existing.length > 0) {
    console.log('✅ Данные уже есть, пропускаем');
    process.exit(0);
  }

  // Добавление начальных данных...
  await MovieModel.createMovie({
    title: "Твоё имя",
    poster: "/api/media/posters/yourname.webp",
    file: "your-name.mp4"
  });

  await MovieModel.createSeries({
    title: "Атака титанов",
    poster: "/api/media/posters/aot.webp",
    folder: "attack-on-titan",
    episodes: [
      { id: 1, title: "1 серия", file: "ep01.mp4" },
      { id: 2, title: "2 серия", file: "ep02.mp4" },
      { id: 3, title: "3 серия", file: "ep03.mp4" }
    ]  
  }); 

  await MovieModel.createSeries({
    title: "Клинок рассекающий демонов",
    poster: "/api/media/posters/Demon_Slayer.webp",
    folder: "attack-on-titan",
    episodes: [
      { id: 1, title: "1 серия", file: "ep01.mp4" },
      { id: 2, title: "2 серия", file: "ep02.mp4" },
      { id: 3, title: "3 серия", file: "ep03.mp4" }
    ]  
  }); 

  // ... остальные фильмы ...

  console.log('✅ Начальные данные добавлены');
  process.exit(0);
}

seed().catch(console.error);