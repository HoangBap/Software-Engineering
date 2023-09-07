import pool from '../database.js'

//Tao profile cho user
export async function createUserProfile(user_ID) {
    const [result] = await pool.query(`
    INSERT INTO userprofile(user_ID) VALUE (?)`, [user_ID])

    console.log(`Create user profile completed!: user ${user_ID}`)
}

export async function updateUserProfile(user_ID, fullname,phone_number,gender,home_address,country,date_of_birth) {
    const [result] = await pool.query(`
    UPDATE userprofile
    SET fullname = ?, phone_number = ?, gender = ?, home_address = ?, country = ?, date_of_birth = ?
    WHERE user_ID = ?`, [fullname, phone_number, gender, home_address, country, date_of_birth, user_ID])

    if(!result) {
        console.log("Update profile failed!")
        return false
    }

    console.log("Update profile successfully!")
    return true
}

//Lay du lieu profile cua user cu the 
export async function getUserProfile(user_ID) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM 
        (SELECT userprofile.*, user.email
        FROM userprofile
        JOIN user
        WHERE userprofile.user_ID = user.ID) as profile
    WHERE profile.user_ID = ?
    `, [user_ID])

    if(rows[0] == null)
        return null

    return rows[0]
}

