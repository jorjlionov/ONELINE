import fs from 'fs';
import path from 'path';
import { CONFIG } from '../config/config.js';

export function ensureMediaDirs() {
    const dirs = [
        path.join(CONFIG.MEDIA_DIR, 'posters'),
        path.join(CONFIG.MEDIA_DIR, 'videos', 'movies'),
        path.join(CONFIG.MEDIA_DIR, 'videos', 'series')
    ];

    for (const dir of dirs) {
        fs.mkdirSync(dir, { recursive: true });
    }

    return dirs;
}

export function getMediaPath(relativePath) {
    return path.join(CONFIG.MEDIA_DIR, relativePath);
}

export function fileExists(filePath) {
    return fs.existsSync(filePath);
}

export function getFileStats(filePath) {
    return fs.statSync(filePath);
}

export function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return CONFIG.CONTENT_TYPES[ext] || 'application/octet-stream';
}

export function createFileStream(filePath, start, end) {
    const options = start !== undefined ? { start, end } : {};
    return fs.createReadStream(filePath, options);
}


