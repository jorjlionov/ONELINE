export function errorHandler(err, req, res, next) {
    console.error('❌ Ошибка:', err.message);

    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        path: req.path,
        timestamp: new Date().toISOString()
    });
}

export function notFoundHandler(req, res) {
    res.status(404).json({
        error: 'Not found',
        path: req.path
    });
}