// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
export const ENVIRONMENT = {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret',
  API_KEY_AI: process.env.API_KEY_AI,
};
