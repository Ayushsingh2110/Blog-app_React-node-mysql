import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Subscription = sequelize.define(
    'Subscription',
    {
        subscriptionId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        authorId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        subscriberId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        timeStamps: true,
        updatedAt: false,
    }
)

export default Subscription;