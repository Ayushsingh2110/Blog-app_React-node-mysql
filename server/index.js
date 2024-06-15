import express from "express";
import "dotenv/config.js";
import indexRoutes from "./routes/indexRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS options
const allowedOrigin = "http://localhost:3001";

const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Manually handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204);
});

app.use("/api", indexRoutes)

app.listen(process.env.PORT || 5003, () => console.log(`server is running at ${process.env.PORT || 5003}`));