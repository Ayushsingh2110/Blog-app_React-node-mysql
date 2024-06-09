import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
    async login(req, res) {
        const searchQuery = "SELECT * FROM users WHERE email=?"

        db.query(searchQuery, req.body.email, (err, user) => {
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
            const CheckUser = new Promise((resolve, reject) => {
                const searchQuery = "SELECT * FROM users WHERE email=? OR username=?"
                db.query(searchQuery, [req.body.email, req.body.username], (err, data) => {
                    if (err) {
                        reject(err)
                    } else if (data.length !== 0) {
                        return res.status(409).json({ staus: 409, message: "user already exists !!" })
                    } else {
                        resolve(data)
                    }
                })
            })

            CheckUser.then((data) => {
                const salt = bcrypt.genSaltSync(10)
                const hashPass = bcrypt.hashSync(req.body.password, salt)
                const insertQuery = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)"
                const values = [
                    req.body.username,
                    req.body.email,
                    hashPass
                ]
                db.query(insertQuery, [values], (err, insert_data) => {
                    if (err) {
                        return res.status(500).json({ error: err.message })
                    }else if(insert_data.affectedRows === 1){
                        return insert_data;
                    }
                })
            })
            .then(() => {
                const searchQuery = "SELECT * FROM users WHERE email=? OR username=?"
                db.query(searchQuery, [req.body.email, req.body.username], (err, user_data) => {
                    if (err) {
                        return res.status(500).json({ error: err.message })
                    } else if (user_data.length !== 0) {
                        const {password, ...other} = user_data[0];
                        return res.status(200).json({message: "registraion successful !!", data: other })
                    }
                })
            })
            .catch((err) => {
                return res.status(501).json({ error: err.message })
            })
    }
}

export default new AuthController();