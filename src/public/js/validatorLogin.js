window.addEventListener("load", function () {
    let formulario = document.querySelector("formulario");

    formulario.addEventListener("submit", function (e) {

        let errores = [];

        let email = document.querySelector("email");
        let password = document.querySelector("password");

        if (email.value == "") {
            errores.push("Tienes que escribir un email")
        };

        document.getElementById('email').addEventListener('input', function () {
            campo = target;

            emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            //Se muestra un texto a modo de ejemplo, luego va a ser un icono
            if (!emailRegex.test(campo.value)) {
                errores.push("Debes escribir un formato de correo válido");
            }
        });

        if (password.value == "") {
            errores.push("Tienes que escribir una contraseña")
        } 

        if(errores.length > 0){
            e.preventDefault();

            let ulErrores = document.querySelector("div.errores.ul");
            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>";
                
            }
        }
    });
})