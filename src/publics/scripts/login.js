let Email = document.getElementById('email')
let Password = document.getElementById('password')
let message = document.getElementById('message')

const form = document.getElementById('check-login')

form.addEventListener('submit', function(e) {
    e.preventDefault();

    fetch('/check-login', {
        method: 'POST',
        body: JSON.stringify({email: Email.value, password: Password.value}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res =>{
        return res.json()
    })
    .then(data =>{
        console.log(data.flag)
        if (data.flag == false){
            message.style.display = "block"
        }
        else{
            message.style.display = "none"
            location.replace('/mainpage')
        }
    })
})
