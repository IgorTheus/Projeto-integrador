const form = document.querySelector("form");
const cod = document.querySelector("#cod");

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
    checkName();
})

function checkName(){
    const name = document.querySelector("#name").value;
    const nameP = document.querySelectorAll(".invalid-name");

    const regexName = /^[a-zA-Z0-9]+?\s?[a-zA-Z0-9]+?\s?[a-zA-Z0-9]+$/g;
    const regexNum = /^[0-9]+?\s?[0-9]+?\s?[0-9]+$/g;

    if(regexName.test(name)){
        nameP.forEach((nameInd)=> {
            if(nameInd.classList.length == 3){
                nameInd.classList.remove('err-msg');
            }
        })
    }
    
    if(name == ""){
        invalidName(0);
        
    }
    else if(regexNum.test(name)) {
        invalidName(1);
    }
}

function invalidName(val){
    const nameP = document.querySelectorAll(".invalid-name");

    nameP.forEach((nameInd)=>{
        nameInd.classList.remove('err-msg');
    })
    nameP[val].classList.add('err-msg');
}

function codFormat(){
    cod.addEventListener('blur', ()=>{
        if(cod.value.length == 8){
            const codeVal = cod.value.split(""); // Transforma em array de caracteres
            codeVal.splice(4, 0, "-"); // No  indice 4 adiciona o "-"
            cod.value = `${codeVal.join("")}`; // Constroi o array em string
        }
    })

    cod.addEventListener('change',()=>{
        const regexCod = /^[0-9]+$/g;
        const codInp = document.querySelector(".invalid-code");
        if(!regexCod.test(cod.value)){
            // terminar aqui
            codInp.classList.add("err-msg");
        } else {
            codInp.classList.remove("err-msg");
        }
    })
}

codFormat();
