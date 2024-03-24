import express from "express";
import "dotenv/config.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", (req, res) => {
    res.json({ message: "server running"})
})

app.listen(process.env.PORT || 5003, () => console.log(`server is running at ${process.env.PORT || 5003}`));