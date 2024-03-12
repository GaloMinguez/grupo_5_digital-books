window.addEventListener('load', function () {

    let errors = {};

    let formProduct = document.getElementById('formProduct');
    if (formProduct) {

        let nameProduct = document.getElementById('nameProduct');
        let descriptionProduct = document.getElementById('descriptionProduct');
        let inputProductAddImageTop = document.getElementById('inputProductAddImageTop');
        let inputProductAddImageBack = document.getElementById('inputProductAddImageBack');


        //Validaciones en Products

        let validateName = function () {
            let feedback = '';

            if (validator.isEmpty(nameProduct.value, { ignore_whitespace: true })) {
                feedback = 'Debes completar el campo de titulo';
            } else if (!validator.isLength(nameProduct.value, { min: 8 })) {
                feedback = 'El titulo debe tener al menos 5 caracteres';
            }

            handleFeedback(nameProduct, feedback)
        };
        let validateDescription = function () {
            let feedback = '';

            if (validator.isEmpty(descriptionProduct.value, { ignore_whitespace: true })) {
                feedback = 'La descripción no puede estar vacío';
            } else if (!validator.isLength(descriptionProduct.value, { min: 10 })) {
                feedback = 'La descripción debe tener al menos 20 caracteres';
            }

            handleFeedback(descriptionProduct, feedback)
        };
        let validateInputProductAddImageTop = function () {
            let feedback = '';
            if (!validator.isEmpty(inputProductAddImageTop.value)) {
                let acceptedExtensions = [".jpg", ".jpeg", ".png"];
                let ext = inputProductAddImageTop.value.substr(-4);
                if (!acceptedExtensions.includes(ext)) {
                    feedback = 'La imagen debe tener uno de los siguientes formatos: JPG, JPEG, PNG';
                };
            }
            handleFeedback(inputProductAddImageTop, feedback);
        };
        let validateInputProductAddImageBack = function () {
            let feedback = '';
            if (!validator.isEmpty(inputProductAddImageBack.value)) {
                let acceptedExtensions = [".jpg", ".jpeg", ".png"];
                let ext = inputProductAddImageBack.value.substr(-4);
                if (!acceptedExtensions.includes(ext)) {
                    feedback = 'La imagen debe tener uno de los siguientes formatos: JPG, JPEG, PNG';
                };
            }
            handleFeedback(inputProductAddImageBack, feedback);
        };


        //Eventos  
        nameProduct.addEventListener('blur', validateName);
        descriptionProduct.addEventListener('blur', validateDescription);
        inputProductAddImageTop.addEventListener('change', validateInputProductAddImageTop)
        inputProductAddImageBack.addEventListener('change', validateInputProductAddImageBack)



        // let validateCreateProduct = function (event){
        formProduct.addEventListener('submit', function (event) {

            validateName();
            validateDescription();
            validateInputProductAddImageTop();
            validateInputProductAddImageBack();

            if (Object.keys(errors).length) {
                event.preventDefault();   // prevenir el envío de formulario

            }
        });
    }


    //Funcion comun

    let handleFeedback = function (element, feedback) {
        let feedbackElement = element.nextElementSibling;

        if (feedback) {
            errors[element.name] = feedback;
        } else {
            delete errors[element.name];
        }
        feedbackElement.innerText = feedback;
    }

    //EVENTOS IMÁGENES DE PRODUCTOS-----------------------------------------------------------

    // captura de imágenes cuando el Administrador quiere cambiar una imágen de un producto
    let input_product_image_editTop = document.getElementById('inputProductImageEditTop');
    if (input_product_image_editTop) {
        input_product_image_editTop.addEventListener('change', function () {
            let imgProdTop = document.getElementById("productImageEditTop");
            let fileProdTop = this.files[0];
            imgProdTop.classList.add("obj");
            imgProdTop.file = fileProdTop;
            let readerProdTop = new FileReader();
            readerProdTop.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(imgProdTop);
            readerProdTop.readAsDataURL(fileProdTop);
        });
    };

    let input_product_image_editBack = document.getElementById('inputProductImageEditBack');
    if (input_product_image_editBack) {
        input_product_image_editBack.addEventListener('change', function () {
            let imgProdBack = document.getElementById("productImageEditBack");
            let fileProdBack = this.files[0];
            imgProdBack.classList.add("obj");
            imgProdBack.file = fileProdBack;
            let readerProdBack = new FileReader();
            readerProdBack.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(imgProdBack);
            readerProdBack.readAsDataURL(fileProdBack);
        });
    };

    // captura de imágenes cuando el Administrador crea un producto
    let input_product_image_addTop = document.getElementById('inputProductAddImageTop');
    if (input_product_image_addTop) {
        input_product_image_addTop.addEventListener('change', function () {
            let imgProdAddTop = document.getElementById("productImageAddTop");
            let fileProdAddTop = this.files[0];
            imgProdAddTop.classList.add("obj");
            imgProdAddTop.file = fileProdAddTop;
            let readerProdAddTop = new FileReader();
            readerProdAddTop.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(imgProdAddTop);
            readerProdAddTop.readAsDataURL(fileProdAddTop);
        });
    };

    let input_product_image_addBack = document.getElementById('inputProductAddImageBack');
    if (input_product_image_addBack) {
        input_product_image_addBack.addEventListener('change', function () {
            let imgProdAddBack = document.getElementById("productImageAddBack");
            let fileProdAddBack = this.files[0];
            imgProdAddBack.classList.add("obj");
            imgProdAddBack.file = fileProdAddBack;
            let readerProdAddBack = new FileReader();
            readerProdAddBack.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(imgProdAddBack);
            readerProdAddBack.readAsDataURL(fileProdAddBack);
        });
    };

});



