'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import { limiter } from '../middlewares/rate.limit'

const configs = (app) =>{
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cors())
    app.use(helmet())
    app.use(limiter)
    app.use(morgan)
}

const routes = (app)=> {
    
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