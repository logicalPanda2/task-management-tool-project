import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

if(
    !process.env.DB_USER ||
    !process.env.DB_PASSWORD ||
    !process.env.DB_HOST ||
    !process.env.DB_PORT ||
    !process.env.DB_NAME
) throw new Error("Incomplete env variables. Check .env.example for more information.");

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
});

export default pool;
