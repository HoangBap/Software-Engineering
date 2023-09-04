let Email = document.getElementById('email')
let Password = document.getElementById('password')

let message = document.getElementById('message')

addForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
})

fetch ('/login', {
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
    if (data.flag == false){
        message.style.display = "block"
    }
    else{
        message.style.display = "none"
    }
})

