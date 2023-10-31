import { AppError, catchAsync } from "../../errors/index.js";
import { OrdersSerivices } from "./orders.services.js";

export const validateExistMeal = catchAsync(async(req, res, next) =>{

    const { id } = req.params

    const meal = await OrdersSerivices.findAllOrderByUser(id)

    if (!meal) {
        return next(new AppError("Review no encotrado",404))
    }

    next()


})