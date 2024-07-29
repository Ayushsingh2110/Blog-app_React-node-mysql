import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Blog = sequelize.define(
    "Blog", 
    {
        blogId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        authorId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        likes: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
        },
        dislikes: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
        },
    },
    {
        timestamps: true,
    },
) 
// class Blog{
//     static GET_ALL_BLOGS_ByID(userID){
//         const q = "SELECT * FROM blog WHERE userid =?"

//         return new Promise((res, rej) => {
//             db.query(q, userID, (err, result) => {
//                 if(err) rej(err)
//                 else res(result)
//             })
//         })
//     }
// }

export default Blog;