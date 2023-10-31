import { DataTypes } from "sequelize";
import sequelize from "../../config/database/database.js";

const Restaurant = sequelize.define('restaurant',{
    id:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    raiting:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status:{
        type: DataTypes.ENUM('active','disabled'),
        defaultValue: 'active',
        allowNull: false,
    }   
})

export default Restaurant