'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import { limiter } from '../middlewares/rate.limit.js'
import authRoutes from '../src/auth/auth.routes.js'
import enterpriseRoutes from '../src/enterprise/enterprise.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import reportRoutes from '../src/report/report.routes.js'

const configs = (app) =>{
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cors())
    app.use(helmet())
    app.use(limiter)
    app.use(morgan('dev'))
}

const routes = (app)=> {
    app.use('/v1/auth', authRoutes)
    app.use('/v1/enterprise', enterpriseRoutes)
    app.use('/v1/category', categoryRoutes)
    app.use('/v1/report', reportRoutes)
}

export const initServer = async () => {
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(` Server running on port ${process.env.PORT}`)
    } catch (error) {
        console.error('❌ Error on server initialization', error)
    }
}