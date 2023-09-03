let track1 = document.getElementById('track_1')
let track2 = document.getElementById('track_2')

let info_1 = document.getElementById('info_1')
let info_2 = document.getElementById('info_2')


let icon_1 = document.getElementById('icon_1')

window.addEventListener('scroll', function(){
    let value = window.scrollY;
    console.log(value)
    track1.style.marginLeft = value*0.1 + 'px';
    track1.style.opacity = value*0.001 + 0.2
    track2.style.marginLeft =  (300-value*0.1) + 'px';
    track2.style.opacity = value*0.001 + 0.2
    info_1.style.marginLeft = value*0.05 + 'px';
    info_1.style.opacity = value*0.0004 + 0.2
    info_2.style.marginLeft = (100-value*0.05) + 'px'
    info_2.style.opacity = value*0.0004 + 0.2
})

// icon_1.addEventListener('onmouseenter', function(){
//     console.log('ssssssssssssssss')
// })

