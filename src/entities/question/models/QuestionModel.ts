import { Schema, Types, Document } from "mongoose";

import { Option } from "@option/models/OptionModel";
import { db } from "@configs/DatabaseConfig";

const schema = new Schema(
  {
    description: {
      type: Schema.Types.String,
    },
    options: {
      type: Array<Schema.Types.ObjectId>,
      ref: "questions",
    },
    createdAt: { type: Date },
  },
  {
    collection: "questions",
    timestamps: true,
  }
);

export interface Question extends Document {
  description: string;
  options: Array<Types.ObjectId> | Array<Option>;
  createdAt: Date;
}

export const QuestionModel = db.model<Question>("questions", schema);
