export default {
  additionalProperties: false,
  type: "object",
  required: ["correctAnswers", "rating", "test", "presentedAt"],
  properties: {
    time: { type: "number" },
    correctAnswers: { type: "number" },
    rating: { type: "number" },
    test: { type: "string" },
    presentedAt: { type: "string", format: "date-time" },
  },
};
