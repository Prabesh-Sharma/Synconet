//packages and files import
import pool from "./src/database/config.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);//home/albert/ssd/semester-project/backend/runMigrations.js

const __dirname = path.dirname(__filename);//home/albert/ssd/semester-project/backend

async function runMigrations(file) {
    const sqlFilePath = path.join(
        __dirname,
        "src",
        "database",
        "migrations",
        file,
    ); //filepath is the path to directory migrations and file is assigned as second arg in command line 

    try {
        const sql = fs.readFileSync(sqlFilePath, "utf8");//uses unicode tranformation format -8 bit to read from a file as utf8
        //encoded string and sets the var sql as a utf8 encoded string

        //alt
        /**
         * const buffer = fs.readFileSync(sqlFilePath)
         * const sql = buffer.toString(utf8)
         * Reading as a buffer can slow down the process due to conversion overhead 
         * good for large files though
         */

        await pool.connect(); //connects to the remote database using a pool from the pg-client
        console.log("Database connected successfully.");

        await pool.query(sql);//sql decoded from the file is passed as a query on to remote database
        console.log("Migration Successful.");
        process.exit(0);
    } catch (error) {
        console.error("Database operation error:", error);
        process.exit(1);//success exit code
    } finally {
        await pool.end();//end conn
        console.log("Database connection closed.");
    }
}

const file = process.argv[2];//takes second argument of the command written e.g. node runMigrations.js <filename>

if (file) {
    runMigrations(file);

} else {
    console.error("Please provide a migration filename as an argument.");
}
