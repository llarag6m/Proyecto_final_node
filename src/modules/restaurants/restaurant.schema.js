import z from 'zod'
import { extracValidationData } from '../../common/extractErrorData.js'

const createRestaurantSchema = z.object({
    name: z.string().min(3, {message: 'Nombre muy corto'}),
    raiting: z.number().positive()
})


export function updateRestaurantValidate (data) {
    const result = createRestaurantSchema.safeParse(data)

    const{
        hasError,
        errorMessages,
        data: restaurantData
    } = extracValidationData(result)

    return {
        hasError,
        errorMessages,
        restaurantData
      }
}


