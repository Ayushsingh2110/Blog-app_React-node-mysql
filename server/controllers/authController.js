import { db } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
    async function login(req, res) {
    const searchQuery = "SELECT * FROM users WHERE email=?"

    await db.query(searchQuery, req.body.email, (err, user) => {
        if (err) return res.status(404).json({ message: "user not found" });

        const isPassMatch = await bcrypt.compareSync(req.body.password, user[0].password)

        if (!isPassMatch) {
            return res.status(400).json({ message: "wrong credentials" })
        }

        const token = await jwt.sign({ id: user[0].id }, process.env.JWT_SECRET)

        const { password, ...other } = user[0];

        res.cookie("Lekha_accessToken", token).status(200).json(other)

    })
}

async function register(req, res) {
    const searchQuery = "SELECT * FROM users WHERE email=? OR username=?"

    await db.query(searchQuery, [req.body.email, req.body.username], (err, data) => {
        if (err) throw new Error(err);
        if (data.length) {
            return res.status(409).json({ message: "User already exist !!" })
        } else {
            const salt = bcrypt.genSaltSync(10)
            const hashPass = bcrypt.hashSync(req.body.password, salt)
            const insertQuery = "INSERT INTO users('username','email','password') VALUES (?)"
            const values = {
                req.body.username,
                req.body.email,
                hash
            }
            await db.query(insertQuery, values, (err, data) => {
                if (err) res.json(err)
                return res.status(200).json("registraion successful !")
            })
        }
    })
}
}

export default AuthController;