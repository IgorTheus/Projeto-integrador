const form = document.querySelector("form");
const cod = document.querySelector("#cod");

Welcome();

function Welcome(){
    const regexAdmin = /^role=admin$/;
    const regexUser = /^role=user$/;
    let content = document.querySelector('.nav-bar ul').lastElementChild;
    const regexBasic = /role=[a-z]+/;

    setInterval(()=>{ // Valida se o usuário possui um cookie de sessão valido a cada segundo
        let cookie = document.cookie;
        const roleSearch = cookie.match(regexBasic);
        const role = roleSearch ? roleSearch[0] : "Sem autorização!";

        if(role == 'Sem autorização!'){
            document.location.href = 'http://localhost:5500/PI/Projeto integrador/login-admin.html'
        }
        if(regexAdmin.test(cookie)){
            content.innerHTML = `Olá, admin!`;
        } 
        if(regexUser.test(cookie)) {
            content.innerHTML = `Olá, colaborador!`;
        }
    }, 1000);

}

form.addEventListener('submit', (e)=>{ // Envia o formulário com todas as validações
    const isNameValid = checkName();
    const isCodValid = codError();
    const isDescValid = checkDesc();
    const isAmtValid = checkAmt();
    
    if(!(isNameValid && isCodValid && isDescValid && isAmtValid)){
        e.preventDefault();
    }
})

function checkName(){ // Valida se é um nome válido
    let name = document.querySelector("#name");
    const nameP = document.querySelectorAll(".invalid-name");
    let nameVal = name.value;
    const regexName = /^[a-zA-Z0-9\u00C0-\u00FF]+?\s?[a-zA-Z0-9\u00C0-\u00FF]+?\s?[a-zA-Z0-9\u00C0-\u00FF]+$/g;
    const regexNum = /^[0-9]+?\s?[0-9]+?\s?[0-9]+$/g;

    let regexTest = regexName.test(nameVal);
    let regexTestNum = regexNum.test(nameVal);
    console.log(nameVal)

    if(regexTest == true){
        if(regexTestNum){
            invalidName(1);
        } else {
            nameP.forEach((nameInd)=>{
                nameInd.classList.remove('err-msg');
                name.classList.remove("invalid-input");
            });
            return true;
        }
    }
    
    if(nameVal == ""){
        invalidName(0);
        return false;
    }

    else if(regexTest == false){
        invalidName(1);
        return false;
    }
}

function invalidName(val){ // Utilizado para add ou rem a classe de err-msg
    const nameP = document.querySelectorAll(".invalid-name");
    let name = document.querySelector("#name");

    nameP.forEach((nameInd)=>{
        nameInd.classList.remove('err-msg');
        name.classList.remove("invalid-input");
    })
    nameP[val].classList.add('err-msg');
    name.classList.add("invalid-input");
}

function codFormat(){ // Utilizado para formatar o campo de cod assim q o usuario sair do campo
    cod.addEventListener('blur', ()=>{
        if(cod.value.length == 8){
            const codeVal = cod.value.split(""); // Transforma em array de caracteres
            codeVal.splice(4, 0, "-"); // No  indice 4 adiciona o "-"
            cod.value = `${codeVal.join("")}`; // Constroi o array em string
        }
    })
}
codFormat();

function codError(){ // Adiciona ou remove erros do input código
    const regexCod = /^[0-9]+$/g;
    const codInp = document.querySelectorAll(".invalid-code");
    let codVerify = cod.value;

    if(!regexCod.test(cod.value) && codVerify[4] != "-"){
        if(cod.value.length == 0){
            removeErr(codInp);
            codInp[0].classList.add("err-msg");
            cod.classList.add("invalid-input");
            return false;
        } else {
            removeErr(codInp);
            codInp[2].classList.remove("err-msg");
            codInp[1].classList.add("err-msg");
            cod.classList.add("invalid-input");
            return false;
        }
        
    } else {
        if(cod.value.length < 8){
            codInp[1].classList.remove("err-msg");
            codInp[2].classList.add("err-msg");
            cod.classList.add("invalid-input");
            return false;
        } else {
            removeErr(codInp);
            return true;
        }
    }
}

function removeErr(codInp, inp){ // Remove erros do input código
    codInp.forEach((code)=>{
        code.classList.remove("err-msg");
    })
    cod.classList.remove("invalid-input");
}

function checkDesc(){ // Checa se é uma descrição sem caracteres
    const descInp = document.querySelector("#desc");
    const regexDesc = /^[a-zA-Z\u00C0-\u00FF.,-]+$/g;
    let validate = regexDesc.test(descInp.value);
    const pInvalid = document.querySelector(".invalid-desc");

    if(validate == false){
        if(descInp.value != ""){
            pInvalid.classList.add('err-msg');
            descInp.classList.add("invalid-input");
            return false;
        } else {
            pInvalid.classList.remove('err-msg');
            descInp.classList.remove("invalid-input");
            return true;
        }

    } else {
        pInvalid.classList.remove('err-msg');
        descInp.classList.remove("invalid-input");
        return true;
    }

}

function checkAmt(){ // Checa se o input amount está vazio ou não
    const amtInp = document.querySelector("#amt");
    const pInvalid = document.querySelector(".invalid-amt");
    if(amtInp.value == ""){
        pInvalid.classList.add("err-msg");
        amtInp.classList.add("invalid-input");
        return false;
    } else {
        pInvalid.classList.remove("err-msg");
        amtInp.classList.remove("invalid-input");
        return true;
    }
}