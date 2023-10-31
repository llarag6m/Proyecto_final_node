import z from 'zod'
import { extracValidationData } from '../../common/extractErrorData.js'

const  createMealsSchema = z.object({
    name: z.string().min(3, {message: 'Nombre muy corto'}),
    price: z.number().positive({message: 'Precio incorrecto'})
    
})


export const validateCreate = ( data ) => {
   const result = createMealsSchema.safeParse(data)

    const {
       hasError,
       errorMessages,
       data: mealsData 
    } = extracValidationData(result)

    return{
        hasError,
        errorMessages,
        mealsData
    }
}