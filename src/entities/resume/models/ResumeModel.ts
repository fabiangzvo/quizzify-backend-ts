import { Schema, Document, Types } from "mongoose";

import { Test } from "@test/models/TestModel";
import { db } from "@configs/DatabaseConfig";

const schema = new Schema(
  {
    time: {
      type: Schema.Types.Number,
    },
    correctAnswers: {
      type: Schema.Types.Number,
    },
    rating: {
      type: Schema.Types.Number,
    },
    test: { type: Schema.Types.ObjectId, ref: "tests" },
    presentedAt: { type: Date },
  },
  {
    collection: "resume",
    timestamps: true,
  }
);

export interface Resume extends Document {
  time: number;
  correctAnswers: number;
  rating: number;
  test: Types.ObjectId | Test;
  presentedAt: Date;
}

export const ResumeModel = db.model<Test>("resume", schema);
