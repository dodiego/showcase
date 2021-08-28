import dotenv from "dotenv"
import env from "require-env"

dotenv.config()

export default {
  databaseConnectionString: env.require("DB_CONNECTION_STRING"),
}
