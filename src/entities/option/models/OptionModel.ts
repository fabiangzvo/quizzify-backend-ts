import { Schema, Document } from "mongoose";

import { db } from "@configs/DatabaseConfig";

const schema = new Schema(
  {
    description: {
      type: Schema.Types.String,
    },
    isCorrect: {
      types: Schema.Types.Boolean,
    },
    createdAt: { type: Date },
  },
  {
    collection: "options",
    timestamps: true,
  }
);

export interface Option extends Document {
  description: string;
  createdAt: Date;
  isCorrect: boolean;
}

export const OptionModel = db.model<Option>("options", schema);
