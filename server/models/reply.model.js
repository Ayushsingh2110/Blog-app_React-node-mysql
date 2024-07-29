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
        commentId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        timeStamps: true,
    }
)

export default Reply;