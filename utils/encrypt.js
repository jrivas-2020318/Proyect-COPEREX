'use strict'

import {hash, verify} from 'argon2'

export const encrypt = async (password) =>{
    try{
        return await hash(password)
    }catch(err){
        console.error(err)
        return err
    }
}

export const cheakPassword = async(hash, password) => {
    try {
        return await verify(hash, password)
    } catch (err) {
        console.error(err)
        return err
    }
}