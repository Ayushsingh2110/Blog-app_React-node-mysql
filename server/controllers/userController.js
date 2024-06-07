import { db } from "../db.js";

class UserController{
    async getUser(req, res){
        const userID = req.params.userID;

        const searchQuery = "SELECT * FROM users WHERE id=?"

        await db.query(searchQuery, req.user.id, (err, user) => {
            
            if(err || !user) res.status(404).json({message: "User not found"})

            if(user.length) res.status(200).json(user)
        })

    }
}

export default new UserController();