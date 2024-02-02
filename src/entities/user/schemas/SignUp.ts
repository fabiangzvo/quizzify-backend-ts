export default {
  additionalProperties: false,
  type: "object",
  required: ["userName", "email", "password", "fullName"],
  properties: {
    userName: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string" },
    fullName: { type: "string" },
  },
};
