import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;
const DB_DATABASE =
  process.env.DB_DATABASE || "mongodb://localhost:27017/express-server";
const config = {
  jwtSecret: process.env.JWT_SECRET || "your_secret_key",
  jwtExpiresIn: "1h",
};

export { PORT, DB_DATABASE, config };
