let date = document.getElementById("Date_of_birth")

let currentDay = new Date()
// let num_year = 

date.onkeyup = function() {
    let input_year = parseInt(date.value.substr(0, 4))
    let current_year = currentDay.getFullYear()
    if (isNaN(input_year)){
        
    }
    else{
        if (input_year > current_year){
        }
        else{
            if ((current_year - input_year > 6) && (current_year - input_year < 120)){
                date.classList.remove("is-invalid")
                date.classList.add("is-valid")
            }
            else{
                date.classList.remove("is-valid")
                date.classList.add("is-invalid")
            }
        }
        
    }
}