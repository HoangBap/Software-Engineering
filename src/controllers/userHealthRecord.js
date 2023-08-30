import { createUserHealthRecord, getUserHealthRecord, editUserHealthRecord, deleteUserHealthRecord } from '../models/healthRecord.js';
import { getUser } from '../models/user.js';
import { getLastSubmitDate } from '../models/healthRecord.js';

const healthRecordController = {};

healthRecordController.pun = async (req, res) => {
    const {submit_date} = req.query
    const lastSubmitDate = await getLastSubmitDate("2"); // Lấy ngày gửi cuối cùng của người dùng

    const currentDateFromForm = new Date(submit_date); // Chuyển đổi ngày từ form thành đối tượng Date
    const currentDateWithoutTime = new Date(currentDateFromForm.getFullYear(), currentDateFromForm.getMonth(), currentDateFromForm.getDate());

    const lastSubmitDateWithoutTime = new Date(lastSubmitDate.getFullYear(), lastSubmitDate.getMonth(), lastSubmitDate.getDate());

    if (lastSubmitDateWithoutTime.getTime() === currentDateWithoutTime.getTime()) {
        res.json({ flag: 3 }); // Trả về flag exist
        return;
    }
    res.send("ok")
}


healthRecordController.createUserHealthRecord = async (req, res) => {
    const {height_value, weight_value, blood_sugar, heart_rate, heart_pressure_systolic, heart_pressure_diastolic } = req.body;
    
    console.log('hjhj', req.body)

    const {userID, email} = req.cookies

    // Kiểm tra xem user có tồn tại k
    const cur_user = await getUser(email); 
    if (!cur_user) {
        console.log(`User with email ${email} not found!`);
        res.json({ flag: 2 }); // Trả về fail vì user không tồn tại / lỗi hệ thống 
    }

    // const last_submit = await getLastSubmitDate(userID)

    // Kiểm tra xem user đã có health record cho ngày đó chưa
    const lastSubmitDate = await getLastSubmitDate(userID); // Lấy ngày gửi cuối cùng của người dùng

    const currentDateFromForm = new Date(); // Chuyển đổi ngày từ form thành đối tượng Date
    const currentDateWithoutTime = new Date(currentDateFromForm.getFullYear(), currentDateFromForm.getMonth(), currentDateFromForm.getDate());

    const lastSubmitDateWithoutTime = new Date(lastSubmitDate.getFullYear(), lastSubmitDate.getMonth(), lastSubmitDate.getDate());

    if (lastSubmitDateWithoutTime.getTime() == currentDateWithoutTime.getTime()) {
        console.log(`Health record for user ${cur_user.email} on ${currentDateFromForm} already exists!`);
        res.json({ flag: 3 }); // Trả về flag exist
        return;
    }


    // Nếu không có health record cho ngày đó, tạo mới

    await createUserHealthRecord(userID, parseInt(height_value), parseInt(weight_value), parseInt(blood_sugar), parseInt(heart_rate), parseInt(heart_pressure_systolic), parseInt(heart_pressure_diastolic), currentDateFromForm);
    console.log(`Created health record for user ${cur_user.email} on ${currentDateFromForm}`);
    res.json({ flag: 1 }); // successfully nhó
};

// Xem health rec
healthRecordController.viewHealthRecord = async (req, res) => {
    const { userID } = req.cookies;

    if (!userID) {
        console.log("User not logged in!");
        return res.redirect("/login");
    }

    const healthRecords = await getUserHealthRecord(userID);

    res.json(healthRecords)
};


healthRecordController.editHealthRecord = async (req, res) => {
    const {recordID, height_value, weight_value, blood_sugar, heart_rate, heart_pressure_systolic, heart_pressure_diastolic} = req.body;
    const {userID, email} = req.cookies
    
    // Kiểm tra xem người dùng có tồn tại không, dựa vào mail
    const cur_user = await getUser(email);
    if (!cur_user) {
        console.log(`User ${email} not found!`);
        res.json({ flag: 2 }); // Trả về fail vì user không tồn tại / lỗi hệ thống 
        // return res.redirect('/login'); // Chuyển hướng về login
    }

    // Cập nhật, trả về để có gì muốn view thì view luôn
    await editUserHealthRecord(userID, recordID, parseInt(height_value), parseInt(weight_value), parseInt(blood_sugar), parseInt(heart_rate), parseInt(heart_pressure_systolic), parseInt(heart_pressure_diastolic));

    console.log(`Updated health record ${recordID} for user ${cur_user.email}`);
    
    // Gửi json thông báo chỉnh sửa thành công
    res.json({ flag: 1 });
    // res.redirect('/homepage'); // Chuyển hướng người dùng đến trang hồ sơ
};

// Delete
healthRecordController.deleteHealthRecord = async (req, res) => {
    const { recordID } = req.body;
    const {userID, email} = req.cookies

    // Kiểm tra xem người dùng có tồn tại không, dựa vào mail
    const cur_user = await getUser(email);
    if (!cur_user) {
        console.log(`User ${email} not found!`);
        res.json({ flag: 2 }); // Trả về fail vì user không tồn tại / lỗi hệ thống 
        // return res.redirect('/login'); // Chuyển hướng về login
    }

    // delete ko trả về gì hết
    await deleteUserHealthRecord(userID, recordID);

    console.log(`Deleted health record with ID ${recordID} for user ${cur_user.email}`);
    res.json({ flag: 1 });

};

export default healthRecordController;