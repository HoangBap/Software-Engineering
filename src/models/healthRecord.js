import pool from '../database.js';

// create health rec
export async function createUserHealthRecord(user_ID, height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure, submit_date) {
    const [result] = await pool.query(`
        INSERT INTO UserHealthRecord (user_ID, height_value, weight_value, blood_sugar, heart_rate, heart_pressure_systolic, heart_pressure_diastolic, submit_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [user_ID, height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure, submit_date]);

    return result.insertId; // Tự tăng ID của health rec vừa insert vào database, rồi trả về
    // vd user 1 có 1 health rec sẵn r thì cái result.insertID trả về 2
}

// Lấy health rec dựa vào ID user (stt trong database)
export async function getUserHealthRecord(user_ID) {
    const [rows] = await pool.query(`
        SELECT *
        FROM UserHealthRecord
        WHERE user_ID = ?
    `, [user_ID]);

    return rows[0];
}

// Update health rec
export async function updateUserHealthRecord(record_ID, user_ID, height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure, submit_date) {
    const [result] = await pool.query(`
        UPDATE UserHealthRecord
        SET user_ID = ?, height_value = ?, weight_value = ?, blood_sugar = ?, heart_rate = ?, heart_pressure_systolic = ?, heart_pressure_diastolic = ?, submit_date = ?
        WHERE record_ID = ?
    `, [user_ID, height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure, submit_date, record_ID]);
    // console.log('Update health record successfully!') 
    
    // UN thông báo bên controllers á do gọi hàm này bên đó, Bắp thì thông báo bên models
    // Nói chung thì thông báo cho server biết thôi nên cũng như nhao

    return result[0];
}

// Delete, chỉ thay đổi trong database thôi chứ không trả gì cho bên controller nữa  
export async function deleteUserHealthRecord(user_ID, record_ID) {
    const [result] = await pool.query(`
        DELETE FROM UserHealthRecord
        WHERE record_ID = ?, user_ID = ?
    `, [record_ID, user_ID]);

    // console.log('Delete health record successfully!') // Thông báo bên server thôi
    // return True // Trả về flag thông báo đã xóa thành công
}