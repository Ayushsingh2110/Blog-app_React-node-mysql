import express from "express";
import "dotenv/config.js";
import indexRoutes from "./routes/indexRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    cors(
        {
            origin: [
                "http://localhost:3000"
            ],
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        }
    )
)
app.use("/api", indexRoutes)

app.listen(process.env.PORT || 5003, () => console.log(`server is running at ${process.env.PORT || 5003}`));