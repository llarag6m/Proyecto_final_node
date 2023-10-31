import { Sequelize } from "sequelize";
import { envs } from "../enviroments/enviroments.js";

const sequelize = new Sequelize(envs.BD_URI,{
    logging: false
})

export async function authenticatedDataBase(){
    try {
        await sequelize.authenticate();
        console.log("Conexion a sido establecida correctamente 🤩")
    } catch (error) {
        throw new Error("Error al autenticar la base de datos 😢", error)
    }
}

export async function sincronizeDataBase(){
try {
    await sequelize.sync()
        console.log("Base de datos sincronizada correctamente 😁")
} catch (error) {
    throw new Error("Error al sincronizar la base de datos 😥", error)
    }
}

export default sequelize