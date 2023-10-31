import express from 'express'

export const router = express.Router()

import { findAllRestaurant, createRestaurant, findOneRestaurant, updateRestaurant, deleteRestaurant, createReviewToRestaurant, updateReview, deleteReview } from './restaurant.controller.js'
import { validateExistRestaurant } from './restaurant.middleware.js'
import { validateExistReview } from '../reviews/review.middleware.js'
import { protectAccountOwner } from '../users/auth.middleware.js'

router.route('/')
    .get(findAllRestaurant)
    .post(createRestaurant)

router
    .route('/:id')
    .get(findOneRestaurant)
    .patch(updateRestaurant)
    .delete(deleteRestaurant)

router.post('/reviews/:id', validateExistRestaurant, createReviewToRestaurant)

router
    .route('/reviews/:restaurantId/:id')
    .patch(validateExistRestaurant, validateExistReview, protectAccountOwner, updateReview)
    .delete(validateExistRestaurant, validateExistReview, protectAccountOwner, deleteReview)