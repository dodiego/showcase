import dotenv from "dotenv"
import env from "require-env"

dotenv.config()

export default {
  isProduction: env.require("NODE_ENV") === "production",
}
