import { createUserHealthRecord, getUserHealthRecord, updateUserHealthRecord, deleteUserHealthRecord } from '../models/userHealthRecord.js';
import { getUser } from '../models/user.js';

const healthRecordController = {};


healthRecordController.createUserHealthRecord = async (req, res) => {
    const { record_ID, user_ID, height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure, submit_date } = req.body;

    // Kiểm tra xem user có tồn tại k
    const cur_user = await getUserByEmail(email); 
    if (!cur_user) {
        console.log(`User with email ${email} not found!`);
        res.json({ flag: 2 }); // Trả về fail vì user không tồn tại / lỗi hệ thống 
    }


    // Kiểm tra xem user đã có health record cho ngày đó chưa
    if (cur_user.user_ID == user_ID && cur_user.submit_date == submit_date){
        console.log(`Health record for user ${cur_user.email} on ${submit_date} already exists!`);
        res.json({ flag: 3 }); // Trả về flag exist
        return;
    }

    // Nếu không có health record cho ngày đó, tạo mới

    await createUserHealthRecord(record_ID, user_ID, height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure, submit_date);
    console.log(`Created health record with ID ${record_ID} for user ${cur_user.email} on ${submit_date}`);
    res.json({ flag: 1 }); // successfully nhó
};

// Xem health rec
healthRecordController.viewHealthRecord = async (req, res) => {
    const { cur_user } = req.cookies;

    if (!cur_user) {
        console.log("User not logged in!");
        return res.redirect("/login");
    }

    const healthRecords = await getUserHealthRecord(cur_user.user_ID);

    res.render("healthRecords", { healthRecords });
};

// view health rec: không biết có nên check là có database ko
// edit đang hok biết là có cần check việc user có heath record trong database chưa á :">
// hoặc không có thì sẽ không hiện nút edit (kt rồi đặt flag để làm cái này)
healthRecordController.editHealthRecord = async (req, res) => {
    const { record_ID, user_ID, height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure, submit_date } = req.body;

    // Kiểm tra xem người dùng có tồn tại không, dựa vào mail
    const cur_user = await getUser(email);
    if (!cur_user) {
        console.log(`User ${email} not found!`);
        return res.redirect('/login'); // Chuyển hướng về login
    }

    // Cập nhật, trả về để có gì muốn view thì view luôn
    updated_rec = await updateUserHealthRecord(record_ID, user_ID, height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure, submit_date);

    console.log(`Updated health record with ID ${record_ID} for user ${cur_user.email}`);
    
    // Đặt cookie thông báo chỉnh sửa thành công
    res.cookie('editSuccess', 'true');

    res.redirect('/homepage'); // Chuyển hướng người dùng đến trang hồ sơ
};

// Delete
healthRecordController.deleteHealthRecord = async (req, res) => {
    const { record_ID } = req.body;

    // delete ko trả về gì hết
    await deleteUserHealthRecord(record_ID);

    console.log(`Deleted health record with ID ${record_ID}`);
    
    // Đặt cookie thông báo xóa thành công
    res.cookie('deleteSuccess', 'true');

    res.redirect('/homepage'); // Chuyển hướng người dùng đến trang hồ sơ
};

export default healthRecordController;