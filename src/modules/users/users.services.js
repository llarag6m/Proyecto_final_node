import Users from "./users.model.js";


export class UsersServices {

    async createUser(data){
        return await Users.create(data)
    }

    async findOneUserById(id){
        return await Users.findOne({
            where: {
                id,
                status: true
            }
        })
    }

    async updateUser(user, data){
        return await user.update(data)
    }

    async deleteUser(user){
        return await user.update({ status: false})
    }

    async  findUserByEmail(email){
        return await Users.findOne({
            where: {
                email,
                status: true
            }
        })
    }
}