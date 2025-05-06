const form = document.querySelector("form");
const cod = document.querySelector("#cod");

const inpName = document.getElementById("name").value;
const inpAmt = document.getElementById("amt").value;
let tbody = document.querySelector("tbody");

form.addEventListener('submit', (e)=>{ // Envia o formulário com todas as validações
    const isNameValid = checkName();
    const isCodValid = codError();
    const isDescValid = checkDesc();
    const isAmtValid = checkAmt();
    
    if(isNameValid && isCodValid && isDescValid && isAmtValid){
        e.preventDefault();
        registerStock();
    } else {
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
    const invalidRegex = /[a-zA-Z\u00C0-\u00FF]+/;
    const codInp = document.querySelectorAll(".invalid-code");
    let codVerify = cod.value;

    if(!regexCod.test(codVerify) && codVerify[4] != "-"){
        if(codVerify.length == 0){
            removeErr(codInp);
            codInp[0].classList.add("err-msg");
            cod.classList.add("invalid-input");
            return false;
        } else {
            removeErr(codInp);
            codInp[1].classList.add("err-msg");
            cod.classList.add("invalid-input");
            return false;
        }
    } else {
        if(codVerify.match(invalidRegex)){
            removeErr(codInp);
            codInp[2].classList.remove("err-msg");
            codInp[1].classList.add("err-msg");
            cod.classList.add("invalid-input");
            return false;
        }
        if(codVerify.length < 8){
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

function removeErr(codInp){ // Remove erros do input código
    codInp.forEach((code)=>{
        code.classList.remove("err-msg");
    })
    cod.classList.remove("invalid-input");
}

function checkDesc(){ // Checa se é uma descrição sem caracteres
    const descInp = document.querySelector("#desc");
    const regexDesc = /^[a-zA-Z\u00C0-\u00FF.,-\s]+$/g;
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

function registerStock(){
    const formData = new FormData(form);
    const inpName = formData.get('name');
    const inpAmt = formData.get('amt');
    let date = new Date;
    let day = date.getDate();
    let month = (date.getMonth() + 1);
    let monthFormat = month < 10 ? '0' + month : month.toString();
    let dayFormat = day < 10 ? '0' + day : day;
    let year = date.getFullYear();
    let color;
    if(inpAmt == 0){
        color = '#FF0000';
        tbody.innerHTML += `
        <tr>
            <td>${inpName}</td>
            <td>${inpAmt}</td>
            <td class="status">
                <i class="fa-solid fa-circle" style="color: ${color};"></i>
                <p class="sem-estoque">Sem estoque</p>    
            </td>
            <td>${dayFormat}/${monthFormat}/${year}</td>
        </tr>`
    } else{
        color = '#32C505';
        tbody.innerHTML += `
        <tr>
            <td>${inpName}</td>
            <td>${inpAmt}</td>
            <td class="status">
                <i class="fa-solid fa-circle" style="color: ${color};"></i>
                <p class="em-estoque">Em estoque</p>    
            </td>
            <td>${dayFormat}/${monthFormat}/${year}</td>
        </tr>`
    }

    form.reset();
}