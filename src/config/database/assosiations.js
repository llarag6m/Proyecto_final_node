import Restaurant from "../../modules/restaurants/user.model.js"
import Review from "../../modules/reviews/review.model.js"
import Users from "../../modules/users/users.model.js"


export const initModel = () =>{
 
    Users.hasMany(Review)
    Review.belongsTo(Users)

    Restaurant.hasMany(Review)
    Review.belongsTo(Restaurant)
}
