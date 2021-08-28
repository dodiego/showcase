import { Connection, createConnection } from "typeorm"

let connection: Connection

export async function init() {
  connection = await createConnection()
  return connection
}

export async function disconnect() {
  if (!connection) {
    throw new Error("TypeORM not initialized")
  }
  return connection?.close()
}

export function getQueryBuilder() {
  return connection.createQueryBuilder()
}
