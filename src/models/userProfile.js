import pool from '../database.js'

//Tao profile cho user
export async function createUserProfile(user_ID) {
    const [result] = await pool.query(`
    INSERT INTO userprofile(user_ID) VALUES (${user_ID})`)

    console.log(`Create user profile completed!: user ${user_ID}`)
}

export async function updateUserProfile(user_ID,fullname=null,phone_number=null,gender=null,home_address=null,country=null,date_of_birth=null) {
    const [result] = await pool.query(`
    UPDATE userprofile
    SET fullname = ?,
    phone_number = ?,
    gender = ?,
    home_address = ?, 
    country = ?,
    date_of_birth = ?
    WHERE user_ID = ${user_ID}`, [fullname, phone_number, gender, home_address, country, date_of_birth])

    console.log(`Update user ${user_ID}'s profile`)
}

//Lay du lieu profile cua user cu the 
export async function getUserProfile(user_ID) {
    const [rows] = await pool.query(`
    SELECT *
    FROM userprofile
    WHERE user_ID = ?
    `, [user_ID])

    if(rows[0] == null)
        return null

    return rows[0]
}

const result = await getUserProfile(1)
console.log(result)

