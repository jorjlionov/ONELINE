import { Router } from 'express';
import { 
  getMediaPath, 
  fileExists, 
  getFileStats, 
  getContentType,
  createFileStream 
} from '../utils/media.js';

const router = Router();

router.get('/*', (req, res) => {
  const filePath = getMediaPath(req.params[0]);
  
  if (!fileExists(filePath)) {
    return res.status(404).json({ 
      error: 'File not found',
      path: req.params[0] 
    });
  }

  const stat = getFileStats(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': getContentType(filePath),
    });
    
    createFileStream(filePath, start, end).pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': getContentType(filePath),
    });
    
    createFileStream(filePath).pipe(res);
  }
});

export default router;