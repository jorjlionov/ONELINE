import express from 'express'
import cors from 'cors'
import path from 'path'

import {CONFIG} from './config/config.js'
import { getLocalIP, printStartupInfo } from './utils/network.js';
import { ensureMediaDirs } from './utils/media.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { initDatabase } from './database/db.js';

import apiRoutes from './routes/api.js';
import mediaRoutes from './routes/media.js';

async function startServer() {
    const app = express();
    const LOCAL_IP = getLocalIP();

    ensureMediaDirs();
    await initDatabase();

    app.use(cors());
    app.use(express.json());

    app.use('/api', apiRoutes);
    app.use('/api/media', mediaRoutes);

    app.use(express.static(CONFIG.FRONTEND_DIST));
    app.get('*', (req, res) => {
    res.sendFile(path.join(CONFIG.FRONTEND_DIST, 'index.html'));
    });

    app.use(notFoundHandler);
    app.use(errorHandler);

    app.listen(CONFIG.PORT, CONFIG.HOST, () => {
        printStartupInfo(CONFIG.PORT, LOCAL_IP, CONFIG.MEDIA_DIR);
  });
}

startServer().catch(console.error)