export default {
  additionalProperties: false,
  type: "object",
  required: ["userName", "password"],
  properties: {
    userName: { type: "string" },
    password: { type: "string" },
  },
};
