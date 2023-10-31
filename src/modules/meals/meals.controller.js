import { AppError, catchAsync } from "../../errors/index.js";
import { MealsServices } from "./meals.services.js";

const mealsServices = new MealsServices()

export const findAllMeals = catchAsync(async(req, res, next) => {

    const meals = await mealsServices.findAllMeals()
    return res.status(200).json(meals)
})

export const findAllMealsId = catchAsync(async(req, res, next) => {

    const { id } = req.params
    const meals = await mealsServices.findOneMeals(id)

    if (!meals) {
        return next(AppError(`Comida con el id: ${id} no fue encontrado`, 404))
    }
    return res.json(meals)
})

export const createMealsToRestaurant = catchAsync(async(req, res, next) =>{
    const { name, price } = req.body
    const { id } = req.params

    const meals = await mealsServices.createMeals({
        name,
        price,
        restaurantId: id,
    })
    return res.status(201).json(meals)
})



export const updateMeals = catchAsync(async(req, res, next) =>{
    const { name, price } = req.body

    const updatemeals = await mealsServices.updateMeals(name, price)

    return res.status(200).json(updatemeals)
})


export const deleteMeals = catchAsync(async(req, res, next) =>{
    const { id } = req.params;
    
    const meals = await mealsServices.findOneMeals(id)

    if (!meals) {
            return res.status(404).json({
            status: 'error',
            message: `Comida con el id: ${id} no fue encontrado`
        })
    }
    await mealsServices.deleteMeals(meals)
    return req.status(204).json(null)
})