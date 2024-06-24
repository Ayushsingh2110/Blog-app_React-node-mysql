import { db } from "../db.js";
import User from "../models/userModel.js";

class UserController{
    async getUser(req, res){
        const userID = req.params.userID;

        const user = await User.findByID(userID);

        if(!user[0].id){
            return res.status(404).json({message: "User not found"})
        }

        return res.status(200).json(user[0])

    }
}

export default new UserController();