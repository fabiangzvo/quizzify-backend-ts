import { Schema, Document } from "mongoose";

import { db } from "../../../configs/DatabaseConfig";

const schema = new Schema(
  {
    fullName: {
      type: Schema.Types.String,
    },
    email: {
      type: Schema.Types.String,
    },
    password: {
      type: Schema.Types.String,
    },
    userName: {
      type: Schema.Types.String,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export interface User extends Document {
  fullName: string;
  email: string;
  password: string;
  userName: string;
}

export interface UserClaims {
  _id: string;
  fullName: string;
  email: string;
  userName: string;
}

export const UserModel = db.model<User>("users", schema);
