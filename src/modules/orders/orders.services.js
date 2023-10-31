import Users from "../users/users.model.js";
import Orders from "./orders.model.js";

export class OrdersSerivices {
 
    async createOrder(data){
        return await Orders.create(data)
    }

    async findAllOrderByUser(){
        return await Orders.findAll({
            where:{
                id: id,
                status: 'active'
            },
            include:[
                {
                    model: Users
                }
            ]
        })
    }


    async updateOrder(order, data){
        return await order.update(data)
    }

    async deleteRestaurant(order, data){
        return await order.update(data)
    }
}