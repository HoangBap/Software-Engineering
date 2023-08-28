import { createUserHealthRecord, getUserHealthRecord, updateUserHealthRecord, deleteUserHealthRecord } from '../models/userHealthRecord.js';
import { getUser } from '../models/user.js';

// // Xử lý đặt cookie
// router.get('/set-cookie', (req, res) => {
//     const currentDate = new Date();
//     const currentDateString = currentDate.toISOString().split('T')[0]; // Lấy ngày tháng năm hiện tại
//     res.cookie('lastSubmissionDate', currentDateString);
//     res.send('Cookie has been set');
// });

const healthRecordController = {}

const submittedRecords = {}; // health record được gửi theo ngày 


healthRecordController.createUserHealthRecord = async (req, res) => {
    const { record_ID, user_ID, height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure, submit_date } = req.body;

    // Truy cập vào cookie từ request
    // const lastSubmissionDate = req.cookies.lastSubmissionDate; // Giả sử cookie tên là 'lastSubmissionDate', lấy ở đâu ta =)))))

    // Lấy tg hiện tại 
    // const currentDate = new Date();
    // const currentDateString = currentDate.toISOString().split('T')[0]; // Chuyển ngày thành chuỗi ISO 

    // // So sánh cái date lụm từ cookie với todayyyyy
    // if (lastSubmissionDate === currentDateString) {
    //     console.log(`Health record for today (${currentDateString}) has already been submitted!`);
    //     res.json({ flag: 3 }); // Trả về flag Exist
    // }

    // Kiểm tra xem user có tồn tại k
    const cur_user = await getUserByEmail(email); 
    if (!cur_user) {
        console.log(`User with email ${email} not found!`);
        res.json({ flag: 2 }); // Trả về fail vì cái gì hả m ???
    }

    // create hoyyy
    await createUserHealthRecord(record_ID, user_ID, height, weight, blood_sugar, heart_rate, systolic_pressure, diastolic_pressure, submit_date);
    console.log(`Created health record with ID ${record_ID} for user ${cur_user.email} on ${submit_date}`);

    // update lại ngày cuối truy cập
    // res.cookie('lastSubmissionDate', currentDateString);

    submittedRecords[submit_date] = true; // flag là ngày hôm nay có record rồi
    res.json({ flag: 1 }); // successfully nhó
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

export default healthRecordController;
