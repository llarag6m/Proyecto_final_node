import z from 'zod'
import { extracValidationData } from '../../common/extractErrorData.js'

const registerUserSchema = z.object({
    name: z.string().min(3, {message: 'Nombre muy corto'}),
    email: z.string().email({message: 'Email Invalido'}),
    password: z.string().min(8, {message: 'Contraseña muy corta'})
})

const loginUserSchema = z.object({
    email: z.string().email({message: 'Email Invalido'}),
    password: z.string().min(8, {message: 'Contraseña muy corta'})
})

const updateUserSchema = z.object({
    name: z.string().min(3, {message: 'Nombre muy corto'}),
    email: z.string().email({message: 'Email Invalido'}),
    
})

export const validateRegister = ( data ) => {
    const result = registerUserSchema.safeParse(data)

    const {
       hasError,
       errorMessages,
       data: userData 
    } = extracValidationData(result)

    return{
        hasError,
        errorMessages,
        userData
    }
}


export const loginValidation = ( data ) => {
    const result = loginUserSchema.safeParse(data)

    const {
       hasError,
       errorMessages,
       data: userData 
    } = extracValidationData(result)

    return{
        hasError,
        errorMessages,
        userData
    }
}


export const updateUserValidation = ( data ) => {
    const result = updateUserSchema.safeParse(data)

    const {
       hasError,
       errorMessages,
       data: userData 
    } = extracValidationData(result)

    return{
        hasError,
        errorMessages,
        userData
    }
}