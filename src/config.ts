import dotenv from "dotenv"
import env from "require-env"

dotenv.config()

export default {
  isProduction: env.require("NODE_ENV") === "production",
  secret: env.require("SECRET"),
  serverPort: process.env.SERVER_PORT
    ? parseInt(process.env.SERVER_PORT)
    : 8080,
}
