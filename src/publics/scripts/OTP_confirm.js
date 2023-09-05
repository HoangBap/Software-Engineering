let message = document.getElementById("message")

const form = document.getElementById("OTP_confirm")

let OTP = document.getElementById("OTP")

form.addEventListener('submit', function(e) {
    e.preventDefault();

    fetch('/check-OTP', {
        method: 'GET',
        body: JSON.stringify({OTP: OTP.value}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res =>{
        return res.json()
    })
    .then(data =>{
        if (data.flag == false){
            message.style.display = "block"
        }
        else{
            message.style.display = "none"
            location.replace('/re_pass')
        }
    })
})