let date = document.getElementById("Date_of_birth")
let button = document.querySelector('.button')

let currentDay = new Date()
// let num_year = 

date.oninput = function() {
    let input_year = parseInt(date.value.substr(0, 4))
    let current_year = currentDay.getFullYear()
    console.log(input_year)
    if (isNaN(input_year)){
        button.setAttribute("disabled", "")
    }
    else{
        if (input_year > current_year){
        }
        else{
            if ((current_year - input_year > 6) && (current_year - input_year < 120)){
                date.classList.remove("is-invalid")
                date.classList.add("is-valid")
                button.removeAttribute("disabled")
            }
            else{
                date.classList.remove("is-valid")
                date.classList.add("is-invalid")
                button.setAttribute("disabled", "")
            }
        }

    }
}

// date.addEventListener("onkeyup", function() {
//     console.log(date.value)
//     let input_year = parseInt(date.value.substr(0, 4))
//     let current_year = currentDay.getFullYear()
//     if (isNaN(input_year)){
//         button.setAttribute("disabled", "")
//     }
//     else{
//         if (input_year > current_year){
//         }
//         else{
//             if ((current_year - input_year > 6) && (current_year - input_year < 120)){
//                 date.classList.remove("is-invalid")
//                 date.classList.add("is-valid")
//                 button.removeAttribute("disabled")
//             }
//             else{
//                 date.classList.remove("is-valid")
//                 date.classList.add("is-invalid")
//                 button.setAttribute("disabled", "")
//             }
//         }

//     }
// })