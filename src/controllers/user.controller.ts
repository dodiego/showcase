import { Resolver, Arg, Mutation } from "type-graphql"
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import { getQueryBuilder } from "../adapters/typeorm"
import User from "../domain/user"
import logger from "../adapters/logger"
import config from "../config"

@Resolver()
export default class UserController {
  @Mutation(() => Boolean)
  async signup(
    @Arg("email", { nullable: false }) email: string,
    @Arg("password", { nullable: false }) password: string
  ) {
    const hashedPassword = await argon2.hash(password)
    await getQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          email,
          password: hashedPassword,
        },
      ])
      .execute()

    logger.info("User created")
    return true
  }
  @Mutation(() => String)
  async signin(
    @Arg("email", { nullable: false }) email: string,
    @Arg("password", { nullable: false }) password: string
  ) {
    const result = await getQueryBuilder()
      .from(User, "user")
      .where("user.email = :email", { email })
      .execute()
    const user = result[0]

    if (!user) {
      throw new Error(`Invalid user/password combination - email: ${email}`)
    }

    logger.info(user)
    const isPasswordValid = await argon2.verify(user.password, password)
    if (!isPasswordValid) {
      throw new Error(`Invalid user/password combination - email: ${email}`)
    }

    return jwt.sign({ userId: user.id }, config.secret, {
      expiresIn: "1h",
    })
  }
}
