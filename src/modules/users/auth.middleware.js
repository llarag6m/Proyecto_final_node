import { promisify } from "util";
import jwt from 'jsonwebtoken'
import { envs } from "../../config/enviroments/enviroments.js";
import { UsersServices } from "./users.services.js";
import { AppError, catchAsync } from "../../errors/index.js";

const userServices = new UsersServices() 


export const protect = catchAsync(async (req, res, next) =>{
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(
            new AppError("No te has logeado , Porfavor accede antes", 401)
        )
    }

    const decoded = await promisify(jwt.verify)(
        token,
        envs.SECRET_JWT_SEED
    )

    const user = await userServices.findOneUserById(decoded.id)

    if (!user) {
        return next(
            new AppError("el propietario de este token ya no está disponible", 401)
        )
    }

    req.sessionUser = user
    next()
}) 

export const restrictTo = (...roles) =>{
    return(req, res, next) =>{
        if (!roles.includes(req.sessionUser.role)) {
            return next(
                new AppError("Usted no tine permisos para realizar esta accion", 403)
            )
        }
        next()
    }
}

export const protectAccountOwner = catchAsync(async(req, res, next) =>{
    const {user, sessionUser } = req

    if (user.id !== sessionUser.id) {
        return next(new AppError("Disculpa pero no eres dueño de esta cuenta", 401))
    }
    next()
})