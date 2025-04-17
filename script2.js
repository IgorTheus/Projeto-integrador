function seePwd(){
    let looking = document.querySelectorAll('.fa-solid');
    looking.forEach((eye)=>{
        eye.addEventListener('click', ()=> {
            console.log(`Clicado ${eye}`)
        })


    })
}