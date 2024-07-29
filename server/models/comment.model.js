import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Comment = sequelize.define(
    'Comment',
    {
        commentId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        blogId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timeStamps: true,
    }
)

export default Comment;