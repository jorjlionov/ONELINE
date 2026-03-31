import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const CONFIG = {
    PORT: 3000,
    HOST: '0.0.0.0',
    MEDIA_DIR: path.join(__dirname, '..', 'media'),
    FRONTEND_DIST: path.join(__dirname, '..', '..', 'Frontend', 'dist'),

    CONTENT_TYPES: {
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    }
};