import User from "./user.model.js";
import Blog from "./blog.model.js";
import Subscription from "./subscription.model.js";
import Comment from "./comment.model.js";
import Reply from "./reply.model.js";
import Like from "./like.model.js";

User.hasMany(Blog, {
    foreignKey: {
        name: "authorId",
        as: "blogs",
    }
})

User.hasMany(Subscription, {
    foreignKey: "subscriberId",
    as: "subscriptions",
})

User.hasMany(Like, {
    foreignKey: "userId",
    as: "likes",
})

Blog.hasMany(Comment, {
    foreignKey: "blogId",
    as: "comments",
})

Blog.hasMany(Like, {
    foreignKey: "blogId",
})

Comment.hasMany(Reply, {
    foreignKey: "commentId",
    as: "replies",
})

export { User, Blog, Subscription, Comment, Reply, Like }