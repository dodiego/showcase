import { Connection, createConnection } from "typeorm"
import config from "../domain/config"

let connection: Connection

export async function init() {
  connection = await createConnection({
    url: config.databaseConnectionString,
    type: "postgres",
  })
  return connection
}

export async function disconnect() {
  if (!connection) {
    throw new Error("TypeORM not initialized")
  }
  return connection?.close()
}
