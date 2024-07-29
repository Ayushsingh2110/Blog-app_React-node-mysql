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
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        hashPassword:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        profileImage:{
            type: DataTypes.STRING,
        },
        subscriberCount:{
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
        },
    },
    {
        timestamps: true,
    }
)

// class User{
//     static findByID(userid){
//         const searchQuery = "SELECT * FROM users WHERE id=?"

//         return new Promise((resolve, reject) => {
//             db.query(searchQuery, [ userid ], (err, user) => {
            
//                 if(err) reject(err) 
//                 else resolve(user) 
//             })
//         })
//     }

//     static findByEmail(email) {
//         const searchQuery = "SELECT * FROM users WHERE email=?";
//         return new Promise((resolve, reject) => {
//             db.query(searchQuery, [ email ], (err, result) => {
//                 if (err) reject(err);
//                 else resolve(result);
//             });
//         });
//     }

//     static findByEmailOrUsername(email, username) {
//         const searchQuery = "SELECT * FROM users WHERE email=? OR username=?";
//         return new Promise((resolve, reject) => {
//             db.query(searchQuery, [email, username], (err, result) => {
//                 if (err) reject(err);
//                 else resolve(result);
//             });
//         });
//     }

//     static create(username, email, password) {
//         const salt = bcrypt.genSaltSync(10);
//         const hashPass = bcrypt.hashSync(password, salt);
//         const insertQuery = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
//         const values = [username, email, hashPass];
//         return new Promise((resolve, reject) => {
//             db.query(insertQuery, [values], (err, result) => {
//                 if (err) reject(err);
//                 else resolve(result);
//             });
//         });
//     }
// }

export default User;