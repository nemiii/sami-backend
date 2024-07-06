import * as Joi from 'joi';

const schema = Joi.object({
  PORT: Joi.number().required(),
  SN_ENV: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_URL: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  SN_MONGO_URL: Joi.string().required(),
});

export default schema;
