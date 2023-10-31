import { AppError, catchAsync } from "../../errors/index.js" 
import { ReviewServices } from "../reviews/review.services.js"
import { updateRestaurantValidate } from "./restaurant.schema.js"
import { RestaurantServices } from "./restaurant.services.js"

const restaurantServices = new RestaurantServices()

export const findAllRestaurant = catchAsync(async(req, res, next) =>{

    const restaurants = await restaurantServices.findAllRestaurants()

    
    return res.status(200).json(restaurants)
})

export const createRestaurant = catchAsync(async(req, res, next) =>{

    const { name, address, raiting } = req.body

    const restaurant = await restaurantServices.createRestaurant({ name, address, raiting })
    return res.status(201).json(restaurant)
})

export const findOneRestaurant = catchAsync(async(req, res, next) =>{

    const { id } = req.params

    const restaurant = await restaurantServices.findOneRestaurant(id)

    if (!restaurant) {
        return next(new AppError(`Restaurante con el id: ${id} no fue encontrado`, 404))
    }
    return res.json(restaurant)
})

export const updateRestaurant = catchAsync(async(req, res, next) =>{
    const { hasError, errorMessages, restaurantData } = updateRestaurantValidate(req.body)
    
    if(hasError){
        return res.status(422).json({
          status: 'error',
          message: errorMessages
        })
      }
     
    const { id } = req.params;

    const restuarant = await restaurantServices.findOneRestaurant(id)


    if(!restuarant){
        return res.status(404).json({
          status: 'error',
          message: `Restaurante con el id: ${id} no fue encontrado`
        })
      }
    
    const updateRestuarant = await restaurantServices.updateRestaurant(restuarant, restaurantData)
    return res.json(updateRestuarant)
})

export const deleteRestaurant = catchAsync(async(req, res, next) =>{
    const { id } = req.params;

    const restuarant = await restaurantServices.findOneRestaurant(id)

    if (!restuarant) {
        return res.status(404).json({
            status: 'error',
            message: `Restaurante con el id: ${id} no fue encontrado`
        })
    }
    await restaurantServices.deleteRestaurant(restuarant)
    return res.status(204).json(null)

})






export const createReviewToRestaurant = catchAsync(async(req, res, next) =>{
    const { comment, raiting } = req.body
    const { id } = req.params
    const { sessionUser } = req

    const review = await ReviewServices.create({ 
        comment, 
        raiting, 
        restaurantId: id, 
        userid: sessionUser.id 
    })

    return res.status(201).json(review)

})

export const updateReview = catchAsync(async(req, res, next) =>{
    const { comment, raiting } = req.body
    const { review } = req

    const reviewUpdate = await ReviewServices.updateReview(review, {comment, raiting})

    return res.status(200).json(reviewUpdate)
})


export const deleteReview = catchAsync(async(req, res, next) =>{
    const { status } = req.body 
    const { review } = req

    const reviewDelete = await ReviewServices.updateReview(review, { status })

    return res.status(200).json(reviewDelete)

})