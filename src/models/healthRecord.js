import pool from '../database.js';

// create health rec
export async function createUserHealthRecord(user_ID, height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure, submit_date) {
    const [result] = await pool.query(`
        INSERT INTO UserHealthRecord (user_ID, height_value, weight_value, blood_sugar, heart_rate, heart_pressure_systolic, heart_pressure_diastolic, submit_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [user_ID, height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure, submit_date]);
}

// Lấy health rec dựa vào ID user (stt trong database)
export async function getUserHealthRecord(user_ID) {
    const [rows] = await pool.query(`
        SELECT record_ID as recordID, user_ID as userID, height_value, weight_value, blood_sugar, heart_rate, heart_pressure_systolic, heart_pressure_diastolic, DATE_FORMAT(submit_date, '%Y-%m-%d') as submit_date
        FROM UserHealthRecord
        WHERE user_ID = ${user_ID}
        ORDER BY submit_date DESC
    `);

    return rows;
}

// Update health rec
export async function editUserHealthRecord(user_ID, record_ID, height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure) {
    const [result] = await pool.query(`
        UPDATE UserHealthRecord SET height_value = ?, weight_value = ?, blood_sugar = ?, heart_rate = ?, heart_pressure_systolic = ?, heart_pressure_diastolic = ? WHERE user_ID = ${user_ID} AND record_ID = ${record_ID}`, [height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure]);
    console.log('Update health record successfully!') 
    
}

// Delete, chỉ thay đổi trong database thôi chứ không trả gì cho bên controller nữa  
export async function deleteUserHealthRecord(user_ID, record_ID) {
    const [result] = await pool.query(`
        DELETE FROM UserHealthRecord
        WHERE record_ID = ? AND user_ID = ?
    `, [record_ID, user_ID]);

    // console.log('Delete health record successfully!') // Thông báo bên server thôi
    // return True // Trả về flag thông báo đã xóa thành công
}

export async function getLastSubmitDate(user_ID){
    const[result] = await pool.query(`
        SELECT submit_date FROM UserHealthRecord
        WHERE user_ID = ${user_ID}
        ORDER BY submit_date DESC
    `)

    if (result.length){
        return result[0].submit_date
    }
    return new Date('1990-10-26');
}

//Return total health records according to the current month
export async function totalHealthRecordOneMonth(user_ID, currentMonth){
    const [result] = await pool.query(`
        SELECT COUNT(record_ID) as total_records 
        FROM userhealthrecord
        WHERE user_ID = ${user_ID} AND MONTH(submit_date) = ?
    `, [currentMonth])

    return result[0]
}

//Return latest height and weight of a user
export async function returnHeightAndWeight(user_ID) {
    const [result] = await pool.query(`
        SELECT height_value as height, weight_value as weight FROM userhealthrecord
        WHERE user_ID = ${user_ID}
        ORDER BY submit_date DESC
        LIMIT 1
    `)
    
    //If undefined
    if(result.length == 0) {
        return result
    }

    return result[0]
}



