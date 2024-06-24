import { db } from "../db.js";

class Blog{
    static Get_All_Blogs_ByID(userID){
        const q = "SELECT * FROM blog WHERE userid =?"

        return new Promise((res, rej) => {
            db.query(q, userID, (err, result) => {
                if(err) rej(err)
                else res(result)
            })
        })
    }
}

export default Blog;