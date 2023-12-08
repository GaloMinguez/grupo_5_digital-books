//const libros = require('../data/products.json');
//const now = require("date-now") ver si es necesario o no

const { log } = require('console');
const fs = require ('fs');
const path = require('path');

const pathLibros= path.join(__dirname, '../data/products.json');

const libros = JSON.parse(fs.readFileSync(pathLibros, 'utf-8'));

const controller = {
    index: (req, res) => res.render('index'),
    register: (req, res) => res.render('../views/users/register'),
    login: (req, res) => res.render('../views/users/login'),
    productList: (req, res) => res.render('../views/products/productList', { libros }),    
    productDetail: (req, res) => {
        const id = req.params.id;
        const getBook = libros.find(libro => libro.id == id);
        if (getBook) {
            return res.render('../views/products/productDetail', { libros, getBook })
        }
        res.send('El producto no existe');
    },
     
    productCart: (req, res) => res.render('../views/products/productCart', { libros }),
    //get form
    //productCreate:(req, res)=> res.render('../views/products/productCreate'),
    productCreate: (req, res) => {
		res.render('../views/products/productCreate.ejs')
	},
    // post form
    /*productSave: (req,res)=>{
        const libroNuevo = {
            id: Date.now(),
            ...req.body,
            imgTop: req.files.filename || 'default.png',
            imgBack: req.files.filename || 'default.png'
        }
        libros.push(libroNuevo)
        // convertir a json
        let listaLibrosJSON = JSON.stringify(libros, null, ' ')
        // escribir el json
        fs.writeFileSync(pathLibros, listaLibrosJSON)
        // redireccionamos a home
        res.redirect('/')
    },*/

    store: (req, res) => {
		//log(req.file); //para un solo archivo, para varios es req.files
		const newProduct = {
			id: uuidv4(),  //id unico uuid // npm install uuid
			//id : products.length + 1,
			imgTop: req.file.filename,
			//image: 'default-image.png',
			...req.body //spread operator // propagacion
		}	
		products.push(newProduct)
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))
		res.redirect('/')
	},

    productEdit:  (req, res) => {
        const id = req.params.id
        const libro = libros.find(libro => libro.id == id)
        if(libro){
            res.render('../views/products/productEdit', { libro: libro })
        }
        res.send('El libro que quieres editar no existe')
    },

    
    productUpDate: (req, res) => {
        const { id } = req.params
        const { title, author,genre,description,descriptionD,price,discount} = req.body

        const productoAEditar = libros.find(libro => libro.id == id)

        productoAEditar.title = title || productoAEditar.title
        productoAEditar.author = author || productoAEditar.author
        productoAEditar.description = description || productoAEditar.description
        productoAEditar.descriptionD = descriptionD || productoAEditar.descriptionD
        productoAEditar.price = price || productoAEditar.price
        productoAEditar.discount = discount || productoAEditar.discount
        productoAEditar.imgTop = req.file.filename || productoAEditar.imgTop

        fs.writeFileSync(pathPlatos, JSON.stringify(libros, null, ' '))

        res.redirect('/')
    },

    
    
    
    productDelete: (req, res) => {
        const id = req.params.id;
        const index = libros.findIndex(libro => libro.id == id);
        if (index !== -1) {
            libros.splice(index, 1);
            saveDataToFile();
            res.redirect('index');
        } else {
            res.send('El producto no existe');
        }
    },
    error: (req, res) => res.render('page_404'),
    
}

module.exports = controller;