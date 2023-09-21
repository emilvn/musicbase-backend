import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const dbconfig = {
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
}
if (process.env.MYSQL_CERT) {
	dbconfig.ssl = {cs: fs.readFileSync("DigiCertGlobalRootCA.crt.pem")};
}

export const connection = await mysql.createConnection(dbconfig);