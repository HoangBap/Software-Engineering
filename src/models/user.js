import pool from '../database.js'

//Lay het cac data 
export async function getAllData() {
    const [rows] = await pool.query("SELECT * FROM user")
    return rows
}

//Get user's information by using email
export async function getUser(email) {
    const [rows] = await pool.query(`
    SELECT *
    FROM user
    WHERE email = ?
    `, [email])

    if(rows[0] == null)
        return null

    return rows[0]
}

//Get user's information by using ID
export async function getUserByID(ID) {
    const [rows] = await pool.query(`
    SELECT *
    FROM user
    WHERE ID = ?
    `, [ID])

    if(rows[0] == null)
        return null

    return rows[0]
}

//Tao them mot user vao database
export async function createUser(email, user_password) {
    const [result] = await pool.query(`
    INSERT INTO user(email, user_password)
    VALUES (?, ?)`
    , [email, user_password])

    return result.insertId
}

// doi mat khau
export async function updatePassword(email, user_password) {
    const [result] = await pool.query(`
        UPDATE User
        SET user_password = ?
        WHERE email = ?`
        , [user_password, email]);

    // Kiểm tra xem có bản ghi nào được cập nhật không
    if (result.affectedRows > 0) {
        return true; // Trả về true nếu có bản ghi được cập nhật
    } else {
        return false; // Trả về false nếu không có bản ghi nào được cập nhật (email không tồn tại)
    }
}
