import joi from "joi";

const paymentSchema = joi.object({
  cardId: joi.number().required(),
  password: joi
    .string()
    .length(4)
    .pattern(/^[0-9]+$/)
    .required(),
  businessId: joi.number().required(),
  amount: joi.number().positive().required(),
});

export default paymentSchema;
