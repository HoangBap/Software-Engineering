import { createUserHealthRecord, getUserHealthRecord,
    editUserHealthRecord, deleteUserHealthRecord, 
    totalHealthRecordOneMonth, returnHeightAndWeight } from '../models/healthRecord.js';

import { getUser, getUserByID } from '../models/user.js';
import { getLastSubmitDate } from '../models/healthRecord.js';

const healthRecordController = {};

//View Health Record Page
healthRecordController.healthRecordPanel = (req, res) => {
    if(!req.signedCookies.userID || !req.cookies.email) {
        res.redirect('login')
        return 
    }

    const isRealUser = getUserByID(req.signedCookies.userID);
    if (isRealUser) {
        res.render('health_record')
    }
    else {
        res.clearCookie('userID', {path: '/'})
        res.clearCookie('email', {path: '/'})
        res.redirect('login')
    }
}

//Creating a new health record
healthRecordController.createUserHealthRecord = async (req, res) => {
    const {height_value, weight_value, blood_sugar, heart_rate, heart_pressure_systolic, heart_pressure_diastolic} = req.body;
    const userID = req.signedCookies.userID
    const email = req.cookies.email

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

//Return a total number of health records corresponding to the given month
healthRecordController.totalHealthRecordOneMonth = async(req, res) => {
    const userID = req.signedCookies.userID
    //If for some reasons, userID is invalid
    if (!userID) {
        return res.redirect("/login")
    }
    
    const today = new Date()
    const current_month = today.getMonth() + 1
    const total = await totalHealthRecordOneMonth(userID, current_month)

    res.json(total)
}

// Xem health rec (trả về hết cả list)
healthRecordController.viewHealthRecord = async (req, res) => {
    const userID = req.signedCookies.userID;
    const healthRecords = await getUserHealthRecord(userID);
    res.json(healthRecords)
};

// Trả về 7 rec gần nhất để monitoring
healthRecordController.viewHealthMonitor = async (req, res) => {
    const userID = req.signedCookies.userID;

    if (!userID) {
        console.log("User not logged in!");
        return res.redirect("/login");
    }

    const healthMonitor = await getUserHealthRecord(userID);

    if (healthMonitor.length > 7){
        res.json(healthMonitor.slice(0, 7)) // nhiều hơn 7 rec thì chỉ lấy 7 cái gần nhất
        return
    }

    res.json(healthMonitor) // nếu ít hơn 7 rec thì trả về hết 
};

//Edit a health record
healthRecordController.editHealthRecord = async (req, res) => {
    const {recordID, height_value, weight_value, blood_sugar, heart_rate, heart_pressure_systolic, heart_pressure_diastolic} = req.body;
    const userID = req.signedCookies.userID
    const email = req.cookies.email
    
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

// Delete a health record
healthRecordController.deleteHealthRecord = async (req, res) => {
    const { recordID } = req.body;
    const userID = req.signedCookies.userID
    const email = req.cookies.email

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

healthRecordController.returnLatestHeightAndWeight = async(req, res) => {
    const userID = req.signedCookies.userID

    const result = await returnHeightAndWeight(userID)

    res.json(result)
}

export default healthRecordController;