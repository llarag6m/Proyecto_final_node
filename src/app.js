import express from 'express'
import { router } from './routes/routes.js'
import { AppError } from './errors/index.js'
import { globalErrorHandler } from './errors/index.js'

const app = express()


app.use(express.json())


app.use('/api/v1', router)

app.all("*", (req, res, next) =>{
    next(new AppError(`No se encontro ${req.originalUrl} en el servidor `, 404))
})

app.use(globalErrorHandler)

export default app