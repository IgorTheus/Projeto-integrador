let form = document.querySelector('form');
form.addEventListener('submit',()=> {
    validatePasswords();
})

function warning() {
    document.querySelector('.password-content').innerHTML += `
    <div class ="warning">
    <p>"A senha deve conter pelo menos 8 caracteres."</p>
    <p>"incluir pelo menos uma letra maiúscula></p>
    <p>"incluir pelo menos uma letra minúscula></p>
    <p>"incluir pelo menos um número></p>
    <p>"incluir pelo menos um caracter especial></p>
    </div>`
}

function validatePasswords() {
    var password = document.getElementById("password").value;
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (passwordRegex.test(password)) {
        return true; 
    }

    else {
        warning();
        clearPasswordFields();
        event.preventDefault();
        return false;
    }

function clearPasswordFields() {
    document.getElementById("password").value = "";
}
}

