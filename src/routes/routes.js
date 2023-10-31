import express from 'express'
import { router as usersRouter } from '../modules/users/users.route.js'
import { router as restaurantRouter } from '../modules/restaurants/restaurant.route.js'
import { protect } from '../modules/users/auth.middleware.js'
import { router as mealsRouter } from '../modules/meals/meals.route.js'
import { router as orderRouter } from '../modules/orders/orders.route.js'


export const router = express.Router()

router.use('/users', usersRouter)

router.use(protect)
router.use('/restaurants', restaurantRouter)
router.use('/meals', mealsRouter)
router.use('/orders', orderRouter)