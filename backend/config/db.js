import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1Jan,1980",
  database: "amazon_clone",
});

export default pool;