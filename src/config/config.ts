require('dotenv').config();

export const enviroment = process.env.NODE_ENV || 'development';
export const serverName = "Calculadora_API";
export const timezone = process.env.TZ;
export const port = Number(process.env.PORT) || 5000;
export const mongodbConnectionString = process.env.MONGODBCONNECTIONSTRING || "";
export const rabbitmqConnectionString = process.env.RABBITMQCONNECTIONSTRING || "";