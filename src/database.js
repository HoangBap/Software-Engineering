import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getAllData() {
    const [rows] = await pool.query("SELECT * FROM info")
    return rows
}

export async function getUser(username) {
    const [rows] = await pool.query(`
    SELECT *
    FROM info
    WHERE username = ?
    `, [username])
    return rows[0]
}

export async function createUser(username, password, email, phone_number = null) {
    const [result] = await pool.query(`
    INSERT INTO info(username, password, email, phone_number)
    VALUES (?, ?, ?, ?)`
    , [username, password, email, phone_number])

    return result.insertId
}

