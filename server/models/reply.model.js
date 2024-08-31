import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Reply = sequelize.define(
    'Reply',
    {
        replyId: {
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
        userName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        userImgUrl:{
            type: DataTypes.STRING,
        },
        commentId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        message:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timeStamps: true,
    }
)

export default Reply;