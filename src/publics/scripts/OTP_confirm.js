let message = document.getElementById("message")

const form = document.getElementById("OTP_confirm")

let OTP = document.getElementById("OTP")

const getQueryParams = ( params, url ) => {
    let href = url;
    // this is an expression to get query strings
    let regexp = new RegExp( '[?&]' + params + '=([^&#]*)', 'i' );
    let qString = regexp.exec(href);
    return qString ? qString[1] : null;
  };

let email = getQueryParams('email', window.location.href)

form.addEventListener('submit', function(e) {
    e.preventDefault();

    fetch('/check-OTP', {
        method: 'GET',
        body: JSON.stringify({email: email, OTP: OTP.value}),
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
            location.replace('./re_pass_page' + "?email=" + email.value)
        }
    })
})