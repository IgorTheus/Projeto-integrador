seePwd();

function seePwd(){
    let looking = document.querySelectorAll('.fa-regular');
    looking.forEach((icon)=>{
        icon.addEventListener('click', ()=> {
            const input = document.querySelector('input[name=password]')
            input.type = input.type === 'password' ? 'text' : 'password';
            icon.classList.toggle('fa-eye');
        })


    })
}