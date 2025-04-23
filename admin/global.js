const form = document.querySelector("form");
Welcome();

function Welcome(){
    let cookie = document.cookie;
    let regexAdmin = /^role=admin$/;
    let content = document.querySelector('.nav-bar ul').lastElementChild;
    
    if(regexAdmin.test(cookie)){
        content.innerHTML = `Olá, usuário admin!`;
    } else {
        content.innerHTML = `Olá, usuário visualizador!`;
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
})
