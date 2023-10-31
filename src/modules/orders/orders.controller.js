import { catchAsync } from "../../errors/index.js";
import { OrdersSerivices } from "./orders.services.js";

const ordersSerivices = new OrdersSerivices()

export const createOrder = catchAsync(async(req, res, next) =>{

    const { quantity, mealdId } = req.body

    const order = await ordersSerivices.createOrder({ quantity, mealdId })
    return res.status(201).json(restaurant) 
})

export const findAllOrderByUser = catchAsync(async(req, res, next) =>{

    
})



export const deleteOrder = catchAsync(async(req, res, next) =>{


})


export const updateOrder = catchAsync(async(req, res, next) =>{

    
})