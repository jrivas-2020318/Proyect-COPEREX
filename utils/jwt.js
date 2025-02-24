'use strict'

import jwt from 'jsonwebtoken'

export const generateJwt = async (payload) =>{
    try {
        return jwt.sign(
            payload,
            process.env.SECRETY_KEY,
            {
                expiresIn: '3h',
                algorithm: 'HS256'
            }
        )
    } catch (err) {
        console.error(err)
        return err
    }
}

