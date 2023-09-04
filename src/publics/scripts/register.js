let password_input = document.getElementById("password_1")
let password_confirm = document.getElementById("password_2")
let messege = document.getElementById("messege")
let button = document.querySelector('.button')

let length_input = document.getElementById("length")
let number_input = document.getElementById("number")

// fetch('/register')
// .then(res => {
//     return res.json()
// })
// .then(data => {
//     console.log('Data:', data)
//     mes = data
// })


password_input.onblur = function() {
    messege.style.display = "none";
    // console.log(document.querySelectorAll('#login_to'))

    document.querySelectorAll('#login_to').forEach((query) => {
        query.classList.add("mt-5")
    })
}

password_input.onfocus = function() {
    messege.style.display = "block";
    document.querySelectorAll('#login_to').forEach((query) => {
        query.classList.remove("mt-5")
    })
    // document.getElementById("login_to").classList.add("mt-1")
  }

let numbers = /[0-9]/g;
number = false

console.log(button)

password_input.oninput = function(){
    let valid_flag = 0
    let input_data = password_input.value
    length = input_data.length
    
    if (password_input.value.match(numbers)){
        number = true
    }
    if (length < 8){
        length_input.classList.remove("text-success")
        length_input.classList.add("text-danger")
    }
    else {
        length_input.classList.add("text-success")
        length_input.classList.remove("text-danger")
        valid_flag = valid_flag + 1
    }
    if (number == false){
        number_input.classList.remove("text-success")
        number_input.classList.add("text-danger")
    }
    else{
        number_input.classList.add("text-success")
        number_input.classList.remove("text-danger")
        valid_flag = valid_flag + 1
    }
    // console.log(password_input.value)
    // console.log(valid_flag)
    if (valid_flag == 2){
        password_input.classList.remove("is-invalid")
        password_input.classList.add("is-valid")
        button.removeAttribute("disabled")
    }
    else{
        password_input.classList.remove("is-valid")
        password_input.classList.add("is-invalid")
        button.setAttribute("disabled", "")
    }
}


password_confirm.oninput = function(){
    let input_data = password_input.value
    let confirm_data = password_confirm.value
    console.log(input_data)
    console.log(confirm_data)
    if (input_data == confirm_data){
        button.removeAttribute("disabled")
        password_confirm.classList.remove("is-invalid")
        password_confirm.classList.add("is-valid")
    }
    else{
        button.setAttribute("disabled", "")
        password_confirm.classList.remove("is-valid")
        password_confirm.classList.add("is-invalid")
    }
}
  