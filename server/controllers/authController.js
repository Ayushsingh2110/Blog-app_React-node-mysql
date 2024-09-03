// controllers/AuthController.js
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
    async login(req, res) {
        try {

            //STEP 1 - destructure object and get values

            const { input, password } = req.body


            //STEP 2- check if any value is missing

            if (!input || !password) {
                return res.status(400).json({ success: false, message: "input field(s) are missing" })
            }

            const getUser = new Promise(async (res, rej) => {
                let user;

                const usernameRegex = /^[a-zA-Z0-9]{3,8}$/;
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


                //STEP 3 - check if input is email or username, and execute query accroding to that

                if ((typeof input === 'string' && usernameRegex.test(input))) {
                    user = await User.findAll({
                        where: {
                            userName: input,
                        }
                    });

                    res(user)
                } else if ((typeof input === 'string' && emailRegex.test(input))) {
                    user = await User.findAll({
                        where: {
                            email: input,
                        }
                    });

                    res(user)
                } else {
                    rej({ status: 400, success: false, message: "Invalid credentials" })
                }
            })

            getUser.then((user) => {

                //STEP 4 - check if user exist or not

                if (!user[0]?.dataValues?.userId) {
                    return res.status(404).json({ success: false, message: "User is not registered" });
                }


                //STEP 5 - if user exists, match password
                
                const isPassMatch = bcrypt.compareSync(password, user[0].dataValues.hashPassword);
                if (!isPassMatch) {
                    return res.status(400).json({ success: false, message: "wrong password entered" });
                }


                //STEP 6 - if password matches, generate token
                
                const token = jwt.sign({ userId: user[0].dataValues.userId }, process.env.JWT_SECRET);


                //STEP 7 - send token, status code and message as response
                
                return res.cookie("Lekha_accessToken", token, {
                    httpOnly: true
                }).status(200).json({ success: true, message: "logged in successfully!!" });

            })
            .catch((err) => {

                return res.status(err.status).json({ success: err.success, message: err.message})

            })
        } catch (err) {

            return res.status(500).json({ success: false,  error: err.message });
        
        }
    }

    async register(req, res) {
        try {

            //STEP 1 - get data from request body

            const { email, firstName, lastName, username, password } = req.body

            if (!email || !username || !password || !firstName || !lastName) {
                return res.status(400).json({ success: false, message: "input field(s) are missing" })
            }

            const usernameRegex = /^[a-zA-Z0-9]{3,8}$/;
            const nameRegex = /^[a-zA-Z]{3,8}$/;
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


            //STEP 2 - check data

            if (!(typeof username === 'string' && usernameRegex.test(username))) {
                return res.status(400).json({
                    success: false,
                    message: "Provided username is not valid, username must contain only alphabets and numbers and can have 3 to 8 chanarcters only"
                })
            }
            if (!(typeof email === 'string' && emailRegex.test(email))) {
                return res.status(400).json({ success: false, message: "Provided email is not valid." })
            }
            if (!(typeof password === 'string' && password.length < 6)) {
                return res.status(400).json({ success: false, message: "Provided password doesn't meet criteria." })
            }
            if (!(typeof firstName === 'string' && nameRegex.test(firstName))) {
                return res.status(400).json({
                    success: false,
                    message: "Provided first name is not valid, first name must contain only alphabets and can have 3 to 8 chanarcters only"
                })
            }
            if (!(typeof lastName === 'string' && nameRegex.test(lastName))) {
                return res.status(400).json({
                    success: false,
                    message: "Provided last name is not valid, last name must contain only alphabets and can have 3 to 8 chanarcters only"
                })
            }

            //STEP 3 - insert user data in DB

            const insertedData = await User.create({
                firstName: firstName,
                lastName: lastName,
                userName: username,
                email: email,
                hashPassword: password, //hashing will happen in setter function in Schema
            });


            //STEP 4 - check if data is inserted successfully or not

            if (!insertedData.dataValues.userId) {
                return res.status(300).json({ success: false, status: 300, message: "An error occured while inserting data" });
            }


            //STEP 5 - after success, generate token

            const token = jwt.sign({ userId: insertedData.dataValues.userId }, process.env.JWT_SECRET);


            //STEP 6 - return response

            return res.cookie("Lekha_accessToken", token, {
                httpOnly: true
            }).status(200).json({ success: true, message: "User registered successfully" });

        } catch (err) {

            if (err.name === "SequelizeUniqueConstraintError" && Object.keys(err.fields)[0] === "userName") {
                return res.status(409).json({ success: false, message: "username is already in use" })
            } else if (err.name === "SequelizeUniqueConstraintError" && Object.keys(err.fields)[0] === "email") {
                return res.status(409).json({ success: false, message: "Email ID is already in use" })
            }
            return res.status(500).json({ success: false, message: err.message });

        }
    }
}

export default new AuthController();
