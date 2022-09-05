import joi from "joi";
const createSchema = joi.object({
  cardType: joi
    .string()
    .valid("groceries", "restaurant", "transport", "education", "health")
    .required(),
  employeeId: joi.number().required(),
});

const activeSchema = joi.object({
  securityCode: joi.string().required(),
  password: joi
    .string()
    .length(4)
    .pattern(/^[0-9]+$/)
    .required(),
});

export default { createSchema, activeSchema };
