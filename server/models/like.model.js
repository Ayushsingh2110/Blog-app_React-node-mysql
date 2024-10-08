import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Like = sequelize.define(
    "Like",
    {
        likeId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        blogId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        blogTitle:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        blogImgUrl:{
            type: DataTypes.STRING,
        },
    },
    {
        timeStamps: true,
        updatedAt: false,
    }
)

export default Like;