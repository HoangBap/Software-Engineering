let message = document.getElementById("message")
const form = document.getElementById("email_forgot")
let Email = document.getElementById('email')

form.addEventListener('submit', function(e) {
    e.preventDefault();

    fetch('/check-forgot-email', {
        method: 'POST',
        body: JSON.stringify({email: Email.value}),
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
            location.replace('/OTP_confirm')
        }
    })
})