import jwt from "jsonwebtoken";

async function checkAuth(req, res, next){
    const token = req.cookies.Lekha_accessToken;

    if(!token) res.status(401).send("User is unauthorized! Please login or register.")

    const verified = await jwt.verify(token, process.env.JWT_SECRET)

    if(verified.length)
}