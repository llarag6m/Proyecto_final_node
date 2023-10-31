import Restaurant from "../restaurants/user.model.js";
import Meals from "./meals.model.js";

export class MealsServices {

    async findAllMeals(){
        return await Meals.findAll({
            where:{
                status: 'active'
            }
        })
    }


    async createMeals(data){
        return await Meals.create(data)
    }

    async updateMeals(meals, data){
        return await meals.update(data)
    }

    async deleteMeals(meals, data){
        return await meals.update(data)
    }

    async findOneMeals(id, restaurantId){
        return await Meals.findOne({
            where:{
                id: restaurantId || id,
                status: 'active'
            }
        })
    }
}