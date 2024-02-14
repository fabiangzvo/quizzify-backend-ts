import { Schema, Types, Document } from "mongoose";

import { Question } from "../../question/models/QuestionModel";
import { db } from "../../../configs/DatabaseConfig";

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
    },
    description: {
      type: Schema.Types.String,
    },
    questions: {
      type: Array<Schema.Types.ObjectId>,
      ref: "questions",
    },
    createdAt: { type: Date },
  },
  {
    collection: "tests",
    timestamps: true,
  }
);

export interface Test extends Document {
  title: string;
  description: string;
  questions: Array<Types.ObjectId> | Array<Question>;
}

export const TestModel = db.model<Test>("tests", schema);
