import Users from "../users/users.model.js";
import Review from "./review.model.js";

export class ReviewServices {

    static async findOneReview(id){
        return Review.findOne({
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
    
 
    
    static async create(data){
        return await Review.create(data)
    }

    static async updateReview(review, data){
        return await review.update(data)
    }

    static async deleteReview(review, data){
        return await review.delete(data)
    }
}