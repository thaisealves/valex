import joi from "joi";

const rechargeSchema = joi.object({
  amount: joi.number().positive().required(),
});

export default rechargeSchema;
