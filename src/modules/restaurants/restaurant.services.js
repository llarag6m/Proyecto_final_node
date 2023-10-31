import Restaurant from "./user.model.js";

export class RestaurantServices {

    async findAllRestaurants(){
        return await Restaurant.findAll({
            where:{
                status: 'active'
            }
        })
    }

    async findOneRestaurantid(){
        return await Restaurant.findOne({
            where:{
                id:id
            }
        })
    }

    async createRestaurant(data){
        return await Restaurant.create(data)
    }

    async updateRestaurant(restaurant, data){
        return await restaurant.update(data)
    }

    async deleteRestaurant(restaurant, data){
        return await restaurant.update(data)
    }

}