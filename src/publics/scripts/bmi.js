// DISPLAY FETCHED DATA
const displayData = (data) => {
    if (data.length == 0) {
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
    document.getElementById('height').innerHTML = data.height;
    document.getElementById('weight').innerHTML = data.weight;
    const bmiValue = (data.weight/Math.pow(data.height/100, 2)).toFixed(1)
    document.getElementById('bmiValue').innerHTML = bmiValue;
    
    if (bmiValue < 18.5) {
        document.getElementById('bmiComment').innerHTML = 'You are considered underweight';
        document.getElementById('infoZone').insertAdjacentHTML('beforeend',
            `<p>Your're considered underweight, which means you're not eating enough or you may be ill, missing out on vitamins and minerals. Being underweight can increase the risk of many serious diseases and health conditions:</p>
            <ul>
                <li>Malnutrition, vitamin deficiencies, anemia (lowered ability to carry blood vessels)</li>
                <li>Osteoporosis, a disease that causes bone weakness, increasing the risk of breaking a bone</li>
                <li>A decrease in immune function</li>
                <li>Growth and development issues, particularly in children and teenagers</li>
                <li>Possible reproductive issues for women due to hormonal imbalances that can disrupt the menstrual cycle. Underweight women also have a higher chance of miscarriage in the first trimester</li>
                <li>Potential complications as a result of surgery</li>
                <li>Generally, an increased risk of mortality compared to those with a healthy BMI</li>
            </ul>
            <p>It's important for you to aim for a healthy weight range. We suggest that you should consult a GP (general practitioner) to get tips on gaining weight and having decent food portions.</p>
            <p>Checkout our Food Portion section to find out recipes that can help you gain weight and stay healthy!</p>`
        )
        if(bmiValue >= 15) {
            document.querySelector('#bmiBar :nth-child(3)').classList.add('chosen');
        }
        else if (bmiValue >= 11.3) {
            document.querySelector('#bmiBar :nth-child(2)').classList.add('chosen');
        }
        else {
            document.querySelector('#bmiBar :nth-child(1)').classList.add('chosen');
        }
    }
    else if (bmiValue >= 18.5 && bmiValue < 25) {
        document.getElementById('bmiComment').innerHTML = 'You are considered healthy';
        document.getElementById('infoZone').insertAdjacentHTML('beforeend',
            `<p>You're considered healthy, what a relief! Now your aim is to stay within this healthy range by keeping your current healthy lifestyle. There are a ton of things that you can do to keep yourself fit, for example, having a balanced diet or try exercising with fitness videos. Most adults should get at least 30 minutes of moderate intensity physical activity on most, if not all, days.</p>
            <p>Checkout our Food Portion section to find out recipes that can help you stay healthy!</p>`
        )
        if(bmiValue >= 23.7) {
            document.querySelector('#bmiBar :nth-child(8)').classList.add('chosen');
        }
        else if (bmiValue >= 22.4) {
            document.querySelector('#bmiBar :nth-child(7)').classList.add('chosen');
        }
        else if (bmiValue >= 21.1) {
            document.querySelector('#bmiBar :nth-child(6)').classList.add('chosen');
        }
        else if (bmiValue >= 19.8) {
            document.querySelector('#bmiBar :nth-child(5)').classList.add('chosen');
        }
        else {
            document.querySelector('#bmiBar :nth-child(4)').classList.add('chosen');
        }
    }
    else if (bmiValue >= 25 && bmiValue < 30) {
        document.getElementById('bmiComment').innerHTML = 'You are considered overweight';
        document.getElementById('infoZone').insertAdjacentHTML('beforeend',
            `<p>You're considered overweight. Being overweight increases the risk of a number of serious diseases and health conditions, such as:</p>
            <ul>
                <li>High blood pressure</li>
                <li>Higher levels of LDL cholesterol, which is widely considered "bad cholesterol," lower levels of HDL cholesterol, considered to be good cholesterol in moderation, and high levels of triglycerides</li>
                <li>Type II diabetes</li>
                <li>Coronary heart disease</li>
                <li>Stroke</li>
                <li>Gallbladder disease</li>
                <li>Osteoarthritis, a type of joint disease caused by breakdown of joint cartilage</li>
                <li>Sleep apnea and breathing problems</li>
                <li>Certain cancers (endometrial, breast, colon, kidney, gallbladder, liver)</li>
                <li>Low quality of life</li>
                <li>Mental illnesses such as clinical depression, anxiety, and others</li>
                <li>Body pains and difficulty with certain physical functions</li>
                <li>Generally, an increased risk of mortality compared to those with a healthy BMI</li>
            </ul>
            <p>The list above sure is huge, right? Being overweight can be absolutely negative, even fatal, and we're sure you don't want that. Thus, we suggest that you should try to maintain a BMI in the healthy range. You can consult with a GP to get help on losing weight.</p>
            <p>Checkout our Food Portion section to find out recipes that can help you lose weight and stay healthy!</p>`
        )
        if(bmiValue >= 28.75) {
            document.querySelector('#bmiBar :nth-child(12)').classList.add('chosen');
        }
        else if (bmiValue >= 27.5) {
            document.querySelector('#bmiBar :nth-child(11)').classList.add('chosen');
        }
        else if (bmiValue >= 26.25) {
            document.querySelector('#bmiBar :nth-child(10)').classList.add('chosen');
        }
        else {
            document.querySelector('#bmiBar :nth-child(9)').classList.add('chosen');
        }
    }
    else {
        document.getElementById('bmiComment').innerHTML = 'You are considered obese';
        document.getElementById('infoZone').insertAdjacentHTML('beforeend',
            `<p>You're considered obese, and if your BMI is higher than 40, then you're severely obese. Being obese can lead to a number of serious diseases and health conditions, such as:</p>
            <ul>
                <li>High blood pressure</li>
                <li>Higher levels of LDL cholesterol, which is widely considered "bad cholesterol," lower levels of HDL cholesterol, considered to be good cholesterol in moderation, and high levels of triglycerides</li>
                <li>Type II diabetes</li>
                <li>Coronary heart disease</li>
                <li>Stroke</li>
                <li>Gallbladder disease</li>
                <li>Osteoarthritis, a type of joint disease caused by breakdown of joint cartilage</li>
                <li>Sleep apnea and breathing problems</li>
                <li>Certain cancers (endometrial, breast, colon, kidney, gallbladder, liver)</li>
                <li>Low quality of life</li>
                <li>Mental illnesses such as clinical depression, anxiety, and others</li>
                <li>Body pains and difficulty with certain physical functions</li>
                <li>Generally, an increased risk of mortality compared to those with a healthy BMI</li>
            </ul>
            <p>The list above sure is huge, right? Being obese can be absolutely negative, even fatal, and we're sure you don't want that. Thus, we suggest that you should try to maintain a BMI in the healthy range. You can consult with a GP to get a balanced calorie-controlled diet, or you can take up physical activities such as fast walking, jogging, swimming or tennis.</p> 
            <p>Checkout our Food Portion section to find out recipes that can help you lose weight and stay healthy!</p>`
        )
        if(bmiValue >= 79) {
            document.querySelector('#bmiBar :nth-child(18)').classList.add('chosen');
        }
        else if (bmiValue >= 69.2) {
            document.querySelector('#bmiBar :nth-child(17)').classList.add('chosen');
        }
        else if (bmiValue >= 59.4) {
            document.querySelector('#bmiBar :nth-child(16)').classList.add('chosen');
        }
        else if (bmiValue >= 49.6) {
            document.querySelector('#bmiBar :nth-child(15)').classList.add('chosen');
        }
        else if (bmiValue >= 39.8) {
            document.querySelector('#bmiBar :nth-child(14)').classList.add('chosen');
        }
        else {
            document.querySelector('#bmiBar :nth-child(13)').classList.add('chosen');
        }
    }
}

fetch('/get-bmi')
.then(res => {
    return res.json();
})
.then(data => {
    displayData(data);
})