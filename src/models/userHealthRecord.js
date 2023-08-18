import pool from '../database.js';

// Tạo mới bản ghi sức khỏe cho người dùng
export async function createUserHealthRecord(user_ID, height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure, submit_date) {
    const [result] = await pool.query(`
        INSERT INTO UserHealthRecord (user_ID, height_value, weight_value, blood_sugar, heart_rate, heart_pressure_systolic, heart_pressure_diastolic, submit_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [user_ID, height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure, submit_date]);

    return result.insertId;
}

// Lấy thông tin bản ghi sức khỏe của người dùng
export async function getUserHealthRecord(user_ID) {
    const [rows] = await pool.query(`
        SELECT *
        FROM UserHealthRecord
        WHERE user_ID = ?
    `, [user_ID]);

    return rows;
}

// Cập nhật thông tin bản ghi sức khỏe cho người dùng
export async function updateUserHealthRecord(record_ID, user_ID, height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure, submit_date) {
    const [result] = await pool.query(`
        UPDATE UserHealthRecord
        SET user_ID = ?, height_value = ?, weight_value = ?, blood_sugar = ?, heart_rate = ?, heart_pressure_systolic = ?, heart_pressure_diastolic = ?, submit_date = ?
        WHERE record_ID = ?
    `, [user_ID, height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure, submit_date, record_ID]);

    return result;
}

// Xóa bản ghi sức khỏe của người dùng
export async function deleteUserHealthRecord(record_ID) {
    const [result] = await pool.query(`
        DELETE FROM UserHealthRecord
        WHERE record_ID = ?
    `, [record_ID]);

    return result;
}