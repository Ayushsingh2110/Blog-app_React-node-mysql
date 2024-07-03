// controllers/AuthController.js
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
    async login(req, res) {
        try {
            console.log(req.body)
            const { input , password } = req.body
            if (!input || !password) {
                return res.status(400).json({ error: "input field(s) are missing" })
            }

            let username;
            let email;

            const usernameRegex = /^[a-zA-Z0-9]{3,8}$/;
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if((typeof input === 'string' && usernameRegex.test(input))){
                username = input;
            }else if((typeof input === 'string' && emailRegex.test(input))){
                email = input
            }else{
                return res.status(400).json({ error: "invalid credentials"})
            }

            const user = await User.findByEmailOrUsername(email, username);
            if (user.length === 0) {
                return res.status(404).json({ message: "User not registered" });
            }

            const isPassMatch = bcrypt.compareSync(password, user[0].password);
            if (!isPassMatch) {
                return res.status(400).json({ message: "invalid credentials" });
            }

            const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET);

            return res.cookie("Lekha_accessToken", token, {
                httpOnly: true
            }).status(200).json({ message: "user login is successful"});
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async register(req, res) {
        try {
            const { email, username, password } = req.body
            if (!email || !username || !password) {
                return res.status(400).json({ error: "input field(s) are missing" })
            }

            const usernameRegex = /^[a-zA-Z0-9]{3,8}$/;
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

            if (!(typeof username === 'string' && usernameRegex.test(username)) ||
                !(typeof email === 'string' && emailRegex.test(email)) ||
                !(typeof password === 'string' && password.length < 6)) {
                return res.status(400).json({ error: "provided input doesn't meet the criteria" })
            }

            const existingUser = await User.findByEmailOrUsername(req.body.email, req.body.username);
            if (existingUser.length !== 0) {
                return res.status(409).json({ status: 409, message: "User already exists !!" });
            }

            const insertData = await User.create(req.body.username, req.body.email, req.body.password);
            if (insertData.affectedRows !== 1) {
                return res.status(300).json({ status: 300, message: "An error occured while inserting data" });
            }

            const newUser = await User.findByEmailOrUsername(req.body.email, req.body.username);
            if (newUser.length === 0) {
                throw new Error("User retrieval after registration failed");
            }

            const token = jwt.sign({ id: newUser[0].id }, process.env.JWT_SECRET);
            
            return res.cookie("Lekha_accessToken", token, {
                httpOnly: true
            }).status(200).json({ message: "User registered successfully"});
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

export default new AuthController();
