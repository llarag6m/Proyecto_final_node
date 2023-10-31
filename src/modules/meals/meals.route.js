import express from 'express'
import { createMealsToRestaurant, deleteMeals, findAllMeals, findAllMealsId, updateMeals } from './meals.controller.js'


export const router = express.Router()

router.route('/')
    .get(findAllMeals)

router.route('/:id')
    .post(createMealsToRestaurant)
    .get(findAllMealsId)
    .patch(updateMeals)
    .delete(deleteMeals)