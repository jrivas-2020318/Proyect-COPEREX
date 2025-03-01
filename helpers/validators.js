import { body } from "express-validator";
import { validateErrors } from "./validate.error.js"
import { update } from "../src/category/category.controller.js";

export const loginValidator = [
    body('username','Username cannot be empty').optional().toLowerCase(),
    body('password', 'Password cannont be empty').notEmpty().isStrongPassword()
   .withMessage("The password must be strong").isLength({min: 8}),
   body('email', 'Email cannont be empty').optional().toLowerCase(),
    validateErrors
]

export const registerValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('lastname', 'Lastname cannot be empty').notEmpty(),
    body('username', 'Username cannot be empty').notEmpty(),
    body('email', 'Email cannot be empty').notEmpty().isEmail(),
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword()
    .withMessage("The password must be strong").isLength({min: 8}),
    
    body('phone', 'Phone cannot be empty').notEmpty().isMobilePhone(),
    validateErrors
]

export const categoryValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('description', 'Description cannot be empty').notEmpty(),
    validateErrors
]

export const enterpriseValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('impactLevel', 'Impact level cannot be empty').notEmpty(),
    body('yearsExperience', 'Years of experience cannot be empty').notEmpty().isInt(),
    body('category', 'Category cannot be empty').notEmpty().isMongoId(),
    validateErrors 
]

export const updateEnterpriseValidator = [
    body('name', 'Name cannot be empty').optional(),
    body('impactLevel', 'Impact level cannot be empty').optional(),
    body('yearsExperience', 'Years of experience cannot be empty').optional().isInt(),
    body('category', 'Category cannot be empty').optional().isMongoId(),
    validateErrors
]



