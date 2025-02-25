import { Router } from 'express'
import {
    getCompanies,
    getCompany,
    registerCompany,
    updateCompany
} from './companyController.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router();

api.get('/', [validateJwt], getCompanies);

api.get('/:id', [validateJwt], getCompany);

api.post('/createCompany', [validateJwt, isAdmin, createCompanyValidator], registerCompany);

api.put('/:id', [validateJwt, isAdmin, updateCompanyValidator], updateCompany);

export default api;
