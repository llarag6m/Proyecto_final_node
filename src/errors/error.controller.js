import { AppError } from "./AppError.js"
import { envs } from "../config/enviroments/enviroments.js"

AppError

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      message : err.message,
      stack: err.stack,
      error: err
    })
  }


  const sendErrorProd = async(err,res) => {
    await Error.create({
      status: err.status,
      message: err.message,
      stack: err.stack,
    })
    
   if(err.isOperational){
    
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })

   }else {
    
    console.log("ERROR 🧨",err);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!'
    })
   }
  }

  export const globalErrorHandler = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail'
  
    if(envs.NODE_ENV === 'development'){
      sendErrorDev(err, res)
    }
  
    if(envs.NODE_ENV === 'production'){
      let error = err;

      sendErrorProd(error, res)
    }
  
  }