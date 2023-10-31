import { AppError, catchAsync } from "../../errors/index.js";
import { RestaurantServices } from "./restaurant.services.js";

const restaurantServices = new RestaurantServices()

export const validateExistRestaurant = catchAsync(async(req, res, next) =>{

    const { id, restaurantId } = req.params
    const restaurant = await restaurantServices.findOneRestaurant(id, restaurantId)

    if (!restaurant) {
        return next(new AppError("Restaurante no encontrado", 404))
    }

    req.restaurant = restaurant
    next()
})