import express from "express";
import { deleteUser, login, register, updateUser } from "./users.controller.js";
import { protectAccountOwner } from "./auth.middleware.js";


export const router = express.Router()

router.post('/login', login)
router.post('/register', register)

//proteger estas rutas
router.route('/:id')
.patch(protectAccountOwner, updateUser)
.delete(protectAccountOwner, deleteUser)

/*
router.route('/orders')
.get()

router.route('/orders/:id')
n

*/