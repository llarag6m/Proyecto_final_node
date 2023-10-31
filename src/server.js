import app from "./app.js";
import { initModel } from "./config/database/assosiations.js";
import { authenticatedDataBase, sincronizeDataBase } from "./config/database/database.js";
import { envs } from "./config/enviroments/enviroments.js";


async function main(){
    try {
        await authenticatedDataBase()
        initModel()
        await sincronizeDataBase()
    } catch (error) {
        console.log(error)
    }
}

main()


app.listen(envs.PORT, () =>{
    console.log(`Servidor corriendo el puerto ${envs.PORT} 👌`)
})