import { Response } from "express";
import { hash, compare } from "bcrypt";
import { getLogger } from "log4js";

import { CustomRequest } from "../../../utilities/http/HttpUtils";
import { schemasValidation } from "../../../utilities/http/SchemasValidator";
import {
  BadRequestError,
  NotFoundError,
  ConflictError,
} from "../../../utilities/http/HttpErrors";
import { User, UserModel } from "../../user/models/UserModel";
import SignUpSchema from "../../user/schemas/SignUp";
import { UserClaims } from "../../user/models/UserModel";
import { createAccessToken } from "../services/UserService";

export interface AccessResponse extends User {
  expirationTime: number;
  accessToken: string;
}

async function getResponseUserData(
  user: User
): Promise<Partial<AccessResponse>> {
  const logger = getLogger();

  logger.info("UserController.getResponseUserData starts");

  const userClaims: UserClaims = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    userName: user.userName,
  };

  const { accessToken, exp } = createAccessToken(userClaims);

  logger.info("UserController.getResponseUserData finished");

  return {
    expirationTime: exp,
    accessToken,
    ...userClaims,
  };
}

export async function signUp(
  req: CustomRequest<null, User, User>,
  res: Response
): Promise<Response<User>> {
  const { body, logger } = req;
  logger.info("UserController.signUp starts");

  schemasValidation(SignUpSchema, body);

  const { userName, email, password, fullName } = body;

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new ConflictError("User with this email already exist");
  }

  const hashedPassword = await hash(password, 14);

  const insertedUser = await UserModel.create({
    userName,
    email,
    password: hashedPassword,
    fullName,
  });

  const accessResponse = await getResponseUserData(insertedUser);

  logger.info("UserController.signUp finished");
  return res.json(accessResponse);
}

export async function signIn(
  req: CustomRequest<
    Record<string, string>,
    void,
    { email: string; password: string }
  >,
  res: Response
): Promise<Response<User>> {
  const { body, logger } = req;
  logger.info("UserController.signIn starts");

  const { email, password } = body;

  const user = await UserModel.findOne({ email });

  if (!user) throw new NotFoundError("User not found");

  const isValid = compare(password, user.password);

  if (!isValid) throw new BadRequestError("Invalid credentials");

  const accessResponse = await getResponseUserData(user);

  logger.info("UserController.signIn finished");

  return res.json(accessResponse);
}
