import { createUserHealthRecord, getUserHealthRecord, updateUserHealthRecord, deleteUserHealthRecord } from '../models/userHealthRecord.js';
import { getUser } from '../models/user.js';

const healthRecordController = {};

// Xem bản ghi sức khỏe
healthRecordController.viewHealthRecord = async (req, res) => {
    const { userID } = req.cookies;

    if (!userID) {
        console.log("User not logged in!");
        return res.redirect("/login");
    }

    const healthRecords = await getUserHealthRecord(userID);

    res.render("healthRecords", { healthRecords });
};

// Chỉnh sửa bản ghi sức khỏe
healthRecordController.editHealthRecord = async (req, res) => {
    const { record_ID, user_ID, height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure, submit_date } = req.body;

    // Kiểm tra xem người dùng có tồn tại không
    const cur_user = await getUser(user_ID);
    if (!cur_user) {
        console.log(`User with ID ${user_ID} not found!`);
        return res.redirect('/profile'); // Chuyển hướng người dùng đến trang hồ sơ
    }

    // Cập nhật bản ghi sức khỏe
    await updateUserHealthRecord(record_ID, user_ID, height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure, submit_date);

    console.log(`Updated health record with ID ${record_ID} for user ${cur_user.email}`);
    
    // Đặt cookie thông báo chỉnh sửa thành công
    res.cookie('editSuccess', 'true');

    res.redirect('/profile'); // Chuyển hướng người dùng đến trang hồ sơ
};

// Xóa bản ghi sức khỏe
healthRecordController.deleteHealthRecord = async (req, res) => {
    const { record_ID } = req.body;

    // Xóa bản ghi sức khỏe
    await deleteUserHealthRecord(record_ID);

    console.log(`Deleted health record with ID ${record_ID}`);
    
    // Đặt cookie thông báo xóa thành công
    res.cookie('deleteSuccess', 'true');

    res.redirect('/profile'); // Chuyển hướng người dùng đến trang hồ sơ
};

export default healthRecordController;
