import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
    async login(req, res) {
        const searchQuery = "SELECT * FROM users WHERE email=?"

        await db.query(searchQuery, req.body.email, (err, user) => {
            if (err) {
                return res.status(404).json({ message: "user not found" });
            }

            const isPassMatch = bcrypt.compareSync(req.body.password, user[0].password)

            if (!isPassMatch) {
                return res.status(400).json({ message: "wrong credentials" })
            }

            const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET)

            const { password, ...other } = user[0];

            res.cookie("Lekha_accessToken", token).status(200).json(other)

        })
    }

    async register(req, res) {
        const searchQuery = "SELECT * FROM users WHERE email=? OR username=?"

        await db.query(searchQuery, [req.body.email, req.body.username], (err, data) => {
            if (err) {
                return res.status(500).json({message:"Internal server error", error: err});
            }
            if (data) {
                return res.status(409).json({ message: "User already exist !!" })
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hashPass = bcrypt.hashSync(req.body.password, salt)
                const insertQuery = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)"
                const values = [
                    req.body.username,
                    req.body.email,
                    hashPass
                ]

                db.query(insertQuery, values, (err, data) => {
                    if (err){
                        return res.status(500).json({error: err})
                    } 

                    return res.status(200).json({data})
                })
            }
        })
    }
}

export default new AuthController();