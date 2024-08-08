import dotenv from 'dotenv';
dotenv.config();

const configEnv = {
  port: process.env.PORT,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  db_username: process.env.API_DB_USERNAME,
  db_password: process.env.API_DB_PASSWORD,
  db_Name: process.env.API_DB_NAME,
  db_name: process.env.API_DB_name,
  db_id: process.env.API_DB_ID
};

export default configEnv;