import { veryPassword } from "../../config/plugins/encrytedPassword.js"
import generateJWT from "../../config/plugins/generate-jwt.js"
import { AppError, catchAsync } from "../../errors/index.js"
import { loginValidation, updateUserValidation, validateRegister } from "./user.schema.js"
import { UsersServices } from "./users.services.js"

const userServices = new UsersServices()

export const login = catchAsync(async(req, res, next) =>{
    const {hasError, errorMessages, userData } = loginValidation(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }
    const user = await userServices.findUserByEmail(userData.email)

    if (!user) {
        return next(new AppError("La cuenta no existe intenta con otra cuenta" ,404))
    }

    const isCorrectPassword = veryPassword(userData.password, user.password)

    if (!isCorrectPassword) {
        return next(new AppError("El email o la contraseña son incorrectos", 401))
    }

    const token = await generateJWT(user.id)


    return res.status(200).json({
        token,
        user: {
           name: user.name,
           email: user.email 
        }
    })
})

export const register = catchAsync(async(req, res, next) =>{
    const { hasError, errorMessages, userData } = validateRegister(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const user = await userServices.createUser(userData)

    const token = await generateJWT(user.id)

    return res.status(201).json({
        token,
        user: {
           name: user.name,
           email: user.email 
        }
    })
})

export const updateUser = catchAsync(async(req, res, next) =>{
    const { hasError, errorMessages, userData } =  updateUserValidation(req.body)
    
    if(hasError){
        return res.status(422).json({
          status: 'error',
          message: errorMessages
        })
      }

      const { id } = req.params;

      const user = await userServices.findOneUserById(id)

      if (!user) {
        return res.status(404).json({
            status: 'error',
            message: `Usuario con el id: ${id} no fue encontrado`
          })
      }

    const updateUser = await userServices.updateUser(user, userData)

    return res.status(200).json(updateUser)
})

export const deleteUser = catchAsync(async(req, res, next) =>{
    const { id } = req.params;

    const user = await userServices.findOneUserById(id)

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: `Usuario con el id: ${id} no fue encontrado`
        })
    }
    await userServices.deleteUser(user)
    
    return res.status(204).json(null)
})

