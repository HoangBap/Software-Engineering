// Lấy tháng và năm hiện tại
const d = new Date();
let month;
if (d.getMonth() + 1 < 10) {
    month = '0' + String(d.getMonth() + 1);
}
else {
    month = String(d.getMonth() + 1);
}
let year = String(d.getFullYear());

// Biến chứa tất cả records
let records = [];
// Biến chứa records được thể hiện hiện tại
let cur_records = [];

/*
{
    recordID
    height_value
    weight_value
    blood_sugar
    heart_rate
    heart_pressure_systolic
    heart_pressure_diastolic
    submit_date: 2023-08-18
}
*/
// HÀM THỂ HIỆN RECORDS
const showTotalRecords = (month, year) => {
    const date = year + '-' + month;
    const currentRecords = records.filter(filterByMonth);
    function filterByMonth(item){
        if(item.submit_date.includes(date)){
            return item;
        }
    }
    document.getElementById('totalRecords').innerHTML = currentRecords.length;
}

const changeRecords = () => {
    var choice = document.getElementById('timeSelect').value;
    if(choice == "default"){
        cur_records = records;
    }
    else{
        const date = choice.split("/");
        const findDate = date[0] + '-' + date[1];   
        cur_records = records.filter(filterByDate);
        function filterByDate(item){
            if(item.submit_date.includes(findDate)){
                return(item)
            }
        }
    }
    displayRecords(cur_records);
}

const sortRecords = () => {
    var choice = document.getElementById('sortSelect').value;
    if(choice == "latest"){
        const sortedRecords = cur_records.sort(function(a, b){
            if(a.submit_date < b.submit_date) {
                return 1;
            }
            return -1;
        });
        displayRecords(sortedRecords);
    }
    else {
        const sortedRecords = cur_records.sort(function(a, b){
            if(a.submit_date > b.submit_date) {
                return 1;
            }
            return -1;
        });
        displayRecords(sortedRecords);
    }
}

const displayTimeSelect = () => {
    const uniqueDate = [... new Set(records.map((record) => {
        const date = record.submit_date.split('-');
        return date[0]+'/'+date[1];
    }))];
    uniqueDate.sort();
    uniqueDate.reverse();
    document.getElementById('timeSelect').innerHTML = `<option value="default">Default</option>`
    document.getElementById('timeSelect').insertAdjacentHTML('beforeend', uniqueDate.map((item) =>
    {
        var temp = item.split("/");
        return(`<option value="${item}">${temp[1]}/${temp[0]}</option>`)
    }).join(''));
}

const displayRecords = (items) => {
    document.getElementById('healthRecords').innerHTML = items.map((item) =>
    {
        var {recordID, height_value, weight_value, blood_sugar, heart_rate, heart_pressure_systolic, heart_pressure_diastolic, submit_date} = item;
        return(
            `<div class="accordion-item">
            <div class="accordion-header">
              <div class="d-flex">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${recordID}" aria-expanded="true" aria-controls="collapse${recordID}">
                    <h3>Record on ${submit_date}</h3>
                </button>
                <button class="tool-btn" type="button" data-bs-toggle="modal" data-bs-target="#updateForm" onclick="resetForm(); update(${recordID})">
                    <i class="fa-solid fa-pen fa-xl" style="color: #052b40;"></i>
                </button>
                <button class="tool-btn" type="button" data-bs-toggle="modal" data-bs-target="#deletePrompt" onclick="deleteRecord(${recordID})">
                    <i class="fa-solid fa-trash fa-xl" style="color: #052b40;"></i>
                </button>
              </div>
            </div>
            <div id="collapse${recordID}" class="accordion-collapse collapse" data-bs-parent="#healthRecords">
              <div class="accordion-body">
                <p><strong>Height:</strong> ${height_value}cm</p>
                <p><strong>Weight:</strong> ${weight_value}kg</p>
                <p><strong>Blood sugar:</strong> ${blood_sugar}mg/dL</p>
                <p><strong>Heart rate:</strong> ${heart_rate}bpm</p>
                <p><strong>Blood pressure:</strong> ${heart_pressure_systolic}/${heart_pressure_diastolic}mmHg</p>
              </div>
            </div>
        </div>`
        )
    }).join('');
}

// NHẬN DỮ LIỆU
fetch('/view-records')
.then(res => {
    return res.json()
})
.then(data => {
    console.log('Data:', data)
    records = data;
    cur_records = records;
    showTotalRecords(month, year);
    sortRecords();
    displayTimeSelect();
})

// FORM VALIDATION
// Ultility functions
const isRequired = value => value === '' ? false : true;
const containsOnlyNumber = value => {return /^\d+$/.test(value)}
const isRationalInput = (value, min, max) => parseFloat(value) < min || parseFloat(value) > max ? false : true;

// Input field validation
const showError = (element) => {
    element.classList.remove('is-valid');
    element.classList.add('is-invalid');
}

const showSuccess = (element) => {
    element.classList.remove('is-invalid');
    element.classList.add('is-valid');
}

const checkHeight = (element) => {
    let valid = false;
    const min = 63, max = 272;
    const height = element.value;

    if(!isRequired(height)) {
        showError(element);
    }
    else if (!containsOnlyNumber(height)) {
        showError(element);
    }
    else if (!isRationalInput(height, min, max)) {
        showError(element);
    }
    else {
        showSuccess(element);
        valid = true;
    }
    return valid;
}

const checkWeight = (element) => {
    let valid = false;
    const min = 2.13, max = 635;
    const weight = element.value;

    if(!isRequired(weight)) {
        showError(element);
    }
    else if (!containsOnlyNumber(weight)) {
        showError(element);
    }
    else if (!isRationalInput(weight, min, max)) {
        showError(element);
    }
    else {
        showSuccess(element);
        valid = true;
    }
    return valid;
}

const checkSugar = (element) => {
    let valid = false;
    const min = 30, max = 2656;
    const sugar = element.value;

    if(!isRequired(sugar)) {
        showError(element);
    }
    else if (!containsOnlyNumber(sugar)) {
        showError(element);
    }
    else if (!isRationalInput(sugar, min, max)) {
        showError(element);
    }
    else {
        showSuccess(element);
        valid = true;
    }
    return valid;
}

const checkBPM = (element) => {
    let valid = false;
    const min = 27, max = 480;
    const bpm = element.value;

    if(!isRequired(bpm)) {
        showError(element);
    }
    else if (!containsOnlyNumber(bpm)) {
        showError(element);
    }
    else if (!isRationalInput(bpm, min, max)) {
        showError(element);
    }
    else {
        showSuccess(element);
        valid = true;
    }
    return valid;
}

const checkSystolic = (element) => {
    let valid = false;
    const min = 50, max = 370;
    const systolic = element.value;

    if(!isRequired(systolic)) {
        showError(element);
    }
    else if (!containsOnlyNumber(systolic)) {
        showError(element);
    }
    else if (!isRationalInput(systolic, min, max)) {
        showError(element);
    }
    else {
        showSuccess(element);
        valid = true;
    }
    return valid;
}

const checkDiastolic = (element) => {
    let valid = false;
    const min = 20, max = 360;
    const diastolic = element.value;

    if(!isRequired(diastolic)) {
        showError(element);
    }
    else if (!containsOnlyNumber(diastolic)) {
        showError(element);
    }
    else if (!isRationalInput(diastolic, min, max)) {
        showError(element);
    }
    else {
        showSuccess(element);
        valid = true;
    }
    return valid;
}

// ADD FORM
const addForm = document.querySelector('.add-form-validate');
const addHeight = document.querySelector('#addHeight');
const addWeight = document.querySelector('#addWeight');
const addSugar = document.querySelector('#addSugar');
const addBPM = document.querySelector('#addBPM');
const addSystolic = document.querySelector('#addSystolic');
const addDiastolic = document.querySelector('#addDiastolic');

addForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValidHeight = checkHeight(addHeight),
        isValidWeight = checkWeight(addWeight),
        isValidSugar = checkSugar(addSugar),
        isValidBPM = checkBPM(addBPM),
        isValidSystolic = checkSystolic(addSystolic),
        isValidDiastolic = checkDiastolic(addDiastolic);
    
    let isValidForm = isValidHeight && isValidWeight && isValidSugar && isValidBPM && isValidSystolic && isValidDiastolic;
    if (isValidForm) {
        // Send form
        fetch('/create-record', {
            method: 'POST',
            body: JSON.stringify({height_value: addHeight.value, weight_value: addWeight.value, blood_sugar: addSugar.value, heart_rate: addBPM.value, heart_pressure_systolic: addSystolic.value, heart_pressure_diastolic: addDiastolic.value}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.flag == 1) {
                if (confirm('Successfully added a new record, please reload the page.') == true) {
                    location.reload();
                }
            }
            else if(data.flag == 2) {
                alert('Something went wrong, please try again.');
            }
            else if(data.flag == 3) {
                alert("You have reached today's maximum number of records, please try again tommorrow.");
            }
        })
    }
});

// UPDATE FORM
const getRecordById = (id) => {
    return records.filter((record) => {return record.recordID == id})[0];
}

const updateForm = document.querySelector('.update-form-validate');
const updateHeight = document.querySelector('#updateHeight');
const updateWeight = document.querySelector('#updateWeight');
const updateSugar = document.querySelector('#updateSugar');
const updateBPM = document.querySelector('#updateBPM');
const updateSystolic = document.querySelector('#updateSystolic');
const updateDiastolic = document.querySelector('#updateDiastolic');
let cur_record;

const resetField = (element) => {
    element.value = '';
    element.classList.remove('is-valid');
    element.classList.remove('is-invalid');
}

const resetForm = () => {
    resetField(updateHeight);
    resetField(updateWeight);
    resetField(updateSugar);
    resetField(updateBPM);
    resetField(updateSystolic);
    resetField(updateDiastolic);
}

const update = (id) => {
    cur_record = getRecordById(id);
    updateHeight.value = cur_record.height_value;
    updateWeight.value = cur_record.weight_value;
    updateSugar.value = cur_record.blood_sugar;
    updateBPM.value = cur_record.heart_rate;
    updateSystolic.value = cur_record.heart_pressure_systolic;
    updateDiastolic.value = cur_record.heart_pressure_diastolic;
}

updateForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValidHeight = checkHeight(updateHeight),
        isValidWeight = checkWeight(updateWeight),
        isValidSugar = checkSugar(updateSugar),
        isValidBPM = checkBPM(updateBPM),
        isValidSystolic = checkSystolic(updateSystolic),
        isValidDiastolic = checkDiastolic(updateDiastolic);
    
    let isValidForm = isValidHeight && isValidWeight && isValidSugar && isValidBPM && isValidSystolic && isValidDiastolic;
    if (isValidForm) {
        // Send form
        fetch('/edit-record', {
            method: 'POST',
            body: JSON.stringify({recordID: cur_record.recordID, height_value: updateHeight.value, weight_value: updateWeight.value, blood_sugar: updateSugar.value, heart_rate: updateBPM.value, heart_pressure_systolic: updateSystolic.value, heart_pressure_diastolic: updateDiastolic.value}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.flag == 1) {
                if (confirm('Successfully updated a record, please reload the page.') == true) {
                    location.reload();
                }
            }
            else if(data.flag == 2) {
                alert('Something went wrong, please try again.');
            }
        })
    }
});

// DELETE FORM
const deleteRecord = (id) => {
    document.getElementById('confirmDeleteBtn').setAttribute('onclick', 'confirmDelete('+id+')');
}

const confirmDelete = (id) => {
    // Request delete
    fetch('/delete-record', {
        method: 'POST',
        body: JSON.stringify({recordID: id}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        if (data.flag == 1) {
            if (confirm('Successfully deleted a record, please reload the page.') == true) {
                location.reload();
            }
        }
        else if(data.flag == 2) {
            alert('Something went wrong, please try again.');
        }
    })
}