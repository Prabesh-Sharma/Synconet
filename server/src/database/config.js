import pkg from "pg";
import { config } from "dotenv";

config();

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

export default pool;