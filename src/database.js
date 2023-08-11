import mysql from 'mysql2'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

//Lay het cac data 
export async function getAllData() {
    const [rows] = await pool.query("SELECT * FROM users")
    return rows
}

//Tim user voi email
export async function getUser(email) {
    const [rows] = await pool.query(`
    SELECT *
    FROM users
    WHERE email = ?
    `, [email])

    if(rows[0] == null)
        return null

    return rows[0]
}
// Check if the email and password match the data in the database
export async function authenticateUser(email, user_password) {
    const [rows] = await pool.query(`
    SELECT *
    FROM users
    WHERE email = ?
    `, [email])

    if (rows.length === 0) {
        return null; // doesnt exist
    }

    const user = rows[0];
    const check = bcrypt.compare(user.user_password,user_password )
    if (!check){
        return null
    }

    return 1; // 
}

//Tao them mot user vao database
export async function createUser(email, user_password) {
    const [result] = await pool.query(`
    INSERT INTO users(email, user_password)
    VALUES (?, ?)`
    , [email, user_password])

    return result.insertId
}