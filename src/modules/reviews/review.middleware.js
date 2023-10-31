import { AppError, catchAsync } from "../../errors/index.js";
import { ReviewServices } from "./review.services.js";

export const validateExistReview = catchAsync(async(req, res, next) =>{

    const { id } = req.params

    const review = await ReviewServices.findOneReview(id)

    if (!review) {
        return next(new AppError("Review no encotrado",404))
    }

    req.user = review.user
    req.review = review
    next()
})