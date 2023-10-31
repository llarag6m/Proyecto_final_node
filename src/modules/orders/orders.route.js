import express from 'express'

import { createOrder, deleteOrder, findAllOrderByUser, updateOrder } from './orders.controller.js'


export const router = express.Router()

router.route('/')
.post(createOrder)

router.route('/me')
.get(findAllOrderByUser)

router.route('/:id')
.patch(updateOrder)
.delete(deleteOrder)

