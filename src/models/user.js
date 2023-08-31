import pool from '../database.js'
import crypto from 'crypto';

//Lay het cac data 
export async function getAllData() {
    const [rows] = await pool.query("SELECT * FROM user")
    return rows
}

//Tim user voi email
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

//Tao them mot user vao database
export async function createUser(email, user_password) {
    const [result] = await pool.query(`
    INSERT INTO user(email, user_password)
    VALUES (?, ?)`
    , [email, user_password])

    return result.insertId
}

// // Lưu mã OTP đã mã hóa vào cơ sở dữ liệu
// export async function saveResetToken(userId, hashedOtp) {
//   const [result] = await pool.query(`
//     UPDATE User
//     SET reset_token = ?
//     WHERE ID = ?
//   `, [hashedOtp, userId]);
  
//   return result.affectedRows === 1;
// }

// // Kiểm tra mã OTP đã hết hạn
// export async function isResetTokenExpired(userId) {
//   const [rows] = await pool.query(`
//     SELECT reset_token_created_at
//     FROM User
//     WHERE ID = ?
//   `, [userId]);

//   if (rows.length === 0) {
//     return true;
//   }

//   const createdAt = new Date(rows[0].reset_token_created_at).getTime();
//   const currentTime = new Date().getTime();
//   const timeDifference = currentTime - createdAt;

//   return timeDifference > 600000; // 10 phút
// }
