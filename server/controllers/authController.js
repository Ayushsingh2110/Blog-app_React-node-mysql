// controllers/AuthController.js
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
    async login(req, res) {
        try {
            const user = await User.findByEmail(req.body.email);
            if (user.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            const isPassMatch = bcrypt.compareSync(req.body.password, user[0].password);
            if (!isPassMatch) {
                return res.status(400).json({ message: "Wrong credentials" });
            }

            const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET);

            return res.cookie("Lekha_accessToken", token).status(200);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async register(req, res) {
        try {
            const existingUser = await User.findByEmailOrUsername(req.body.email, req.body.username);
            if (existingUser.length !== 0) {
                return res.status(409).json({ status: 409, message: "User already exists !!" });
            }

            const insertData = await User.create(req.body.username, req.body.email, req.body.password);
            if (insertData.affectedRows !== 1) {
                return res.status(300).json({ status: 300, message: "An error occured while inserting data"});
            }

            const newUser = await User.findByEmailOrUsername(req.body.email, req.body.username);
            if (newUser.length === 0) {
                throw new Error("User retrieval after registration failed");
            }

            const token = jwt.sign({ id: newUser[0].id }, process.env.JWT_SECRET);

            return res.cookie("Lekha_accessToken", token).status(200);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

export default new AuthController();
