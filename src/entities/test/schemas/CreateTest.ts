export default {
  additionalProperties: false,
  type: "object",
  required: ["title", "questions", "description"],
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    questions: {
      type: "array",
      minItems: 2,
      items: {
        type: "object",
        properties: {
          description: { type: "string" },
          options: {
            type: "array",
            minItems: 2,
            items: {
              type: "object",
              required: ["description", "isCorrect"],
              properties: {
                description: { type: "string" },
                isCorrect: { type: "boolean" },
              },
            },
          },
        },
      },
    },
  },
};
