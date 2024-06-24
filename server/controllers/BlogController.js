import { db } from "../db.js";
import Blog from "../models/blogModel.js";

class BlogController{
    async getBlogData(req, res){

    }

    async searchBlogs(req, res){

    }

    async userBlogList(req, res){
        try {
            const userid = req.params.userid;
            const blogs = await Blog.Get_All_Blogs_ByID(userid)
            return res.status(200).json(blogs)
        } catch (err) {
            return res.status(500).json({ error: err.message})
        }
    }
}