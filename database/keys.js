import { Pool } from "pg";
const pool = new Pool({
    host: 'localhost',
    port:'5432',
    user: 'postgres',
    password: 'Harry@2112',
    database: 'pevn'
})

module.exports = pool;