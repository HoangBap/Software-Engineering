let height_weight;
let input_total_records;

const request1 = fetch('/get-total-records').then(res => {return res.json();});
const request2 = fetch('/get-bmi').then(res => {return res.json();});

Promise.all([request1, request2])
.then(([data1, data2]) => {
    console.log(data1)
    console.log(data2)
    total_records = data1;
    height_weight = data2;
    displayData(height_weight, total_records);
})

const displayData = (height_weight, input_total_records) => {
    if (height_weight.length == 0 || total_records.length == 0) {
        document.getElementById('main').innerHTML = 
        `<div class="d-flex flex-column align-items-center justify-content-center empty-wrap">
            <img src="./images/emptylist_yellow.svg" alt="Oops! List is empty" width="300px">
            <h1>Oops!</h1>
            <h2>Nothing to see here</h2>
            <h5>Add a new record to see the content for you</h5>
            <br>
            <a href="/healthrecord"><button class="add-btn">Add a new health record</button></a>
        </div>`
        return;
    }

    const bmiValue = (height_weight.weight/Math.pow(height_weight.height/100, 2)).toFixed(1)
    document.getElementById('bmiValue').innerHTML = bmiValue;
    if (bmiValue < 18.5) {
        document.getElementById('bmiComment').innerHTML = `You're considered underweight`;
    }
    else if (bmiValue >= 18.5 && bmiValue < 25) {
        document.getElementById('bmiComment').innerHTML = `Yay! You're healthy!`;
    }
    else if (bmiValue >= 25 && bmiValue < 30) {
        document.getElementById('bmiComment').innerHTML = `You're considered overweight`;
    }
    else {
        document.getElementById('bmiComment').innerHTML = `You're considered obese`;
    }

    document.getElementById('totalRecords').innerHTML = input_total_records.total_records;
}
