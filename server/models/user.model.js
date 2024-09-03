import db from "../db.js";
import bcrypt from "bcrypt";

import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
    'User',
    {
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value){
                this.setDataValue("firstName", value.toLowerCase())
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value){
                this.setDataValue("lastName", value.toLowerCase())
            }
        },
        fullName: {
            type: DataTypes.VIRTUAL,
            get(){
                return `${this.firstName} ${this.lastName}`
            },

            set(){
                throw new Error("Do not set fullName, fullName will give you value of `[firstName] [lastName]`, it is predefined.")
            },
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        hashPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profileImage: {
            type: DataTypes.STRING,
        },
        subscriberCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
        },
    },
    {
        timestamps: true,
        hooks: {
            beforeCreate: async (user) => {
                if (user.hashPassword) {
                    const salt = await bcrypt.genSalt(10);
                    user.hashPassword = await bcrypt.hash(user.hashPassword, salt);
                }
            },
            beforeUpdate: async (user) => {
                if (user.hashPassword && user.changed('hashPassword')) {
                    const salt = await bcrypt.genSalt(10);
                    user.hashPassword = await bcrypt.hash(user.hashPassword, salt);
                }
            }
        }
    }
)

export default User;