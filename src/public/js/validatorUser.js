window.addEventListener("load", function () {
    let formulario = document.querySelector("formulario");

    formulario.addEventListener("submit", function (e) {

        let errores = [];

        let fullname = document.querySelector("fullName");
        let email = document.querySelector("email");
        let password = document.querySelector("password");

        if (fullname.value == "") {
            errores.push("Tienes que escribir un nombre")
        } else if (fullname.value.length < 6) {
            errores.push("Escribir nombre y apellido de 6 caracteres como minimo");
        };

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
        } else if (password.value.length < 6) {
            errores.push("Escribir contraseña de 8 caracteres como minimo");
        };

        var $input = $('#file');
        var valid_extensions = ['png', 'jpg', 'jpeg', 'gif'];
        $input.on('change', function (e) {
            var $this = this;
            var files = $this.files;

            // If there is more than one file
            if (files) {
                if ($this.files.length > 1) {

                    // TODO: loop for more one file

                } else {

                    var file = this.files[0];
                    if (!validar_extension(file)) {
                        errores.push('Extension invalida');
                    }

                }
            }
        });

        if(errores.length > 0){
            e.preventDefault();

            let ulErrores = document.querySelector("div.errores.ul");
            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>";
                
            }
        }

        function validar_extension(file) {
            var file_name = file.name,
                file_extension = file_name.split('.').pop();

            return valid_extensions.includes(file_extension);
        }
    });
})