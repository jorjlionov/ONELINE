import axios from "axios";

const getBaseURL = () => {
    if (import.meta.env.PROD) {
        return '';
    }
    // ← не хватало return для dev режима!
    return 'http://localhost:3000';
};

// ← api должен быть ВНЕ функции getBaseURL
export const api = axios.create({
    baseURL: getBaseURL(),
    timeout: 10000,
});

export const getMediaUrl = (path) => {  // ← не getMediaURL, а getMediaUrl (camelCase)
    if (path.startsWith('http')) {      // ← не startWith, а startsWith (с 's' на конце)
        return path;
    }
    const base = import.meta.env.PROD ? '' : 'http://localhost:3000';
    return `${base}${path}`;
};

export const MovieAPI = {
    getAll: () => api.get('/api/movies'),
    getById: (id) => api.get(`/api/movies/${id}`),
    search: (query) => api.get(`/api/search?q=${encodeURIComponent(query)}`),
    addMovie: (data) => api.post('/api/movies', data),
    addSeries: (data) => api.post('/api/series', data),
    delete: (id) => api.delete(`/api/movies/${id}`),
    health: () => api.get('/api/health'),
};