import { getReport } from './report.controller.js' // Asegúrate de que la ruta sea correcta
import { Router } from 'express';

const api = Router();
api.get('/download-report', getReport);

export default api;
