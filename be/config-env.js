import dotenv from 'dotenv';
dotenv.config();

const configEnv = {
  port: process.env.PORT,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  database_uri: process.env.MONGODB_URI
};

export default configEnv;