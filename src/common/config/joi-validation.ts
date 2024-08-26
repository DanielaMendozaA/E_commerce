import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  JWT_SECRET: Joi.string().required(),
  EXECUTE_SEEDS: Joi.boolean().required(),
  SALT_ROUNDS: Joi.number().default(10),
});
