const path = require('path');
const { log } = require('console');

const db = require('../database/models');
const sequelize = db.sequelize;

const productsController = {
    productListAbm: (req, res) => {
        db.Producto.findAll({
            include: [{association: "genero"}]
        })
        .then(libros => {
            res.render('../views/products/productAbm', { libros })    
        })
    },
    productList: async (req, res) => {
        try {
            let libros = await db.Producto.findAll({
                include: [{association: "genero"}]
            })
            res.render('../views/products/productList', { libros })
        } catch (error) {
             console.log(error);            
        }
    },
    productDetail: (req, res) => {
        let pedidoProducto = db.Producto.findByPk(req.params.id);

        let pedidoProductos =  db.Producto.findAll({
            include: [{association: "genero"}]
        });

        Promise.all([pedidoProducto, pedidoProductos])
        .then(function([producto, productos]){
            res.render("../views/products/productDetail", {getBook:producto, libros:productos});
        });
        //preguntar como envio un mensaje si el producto no existe
        //res.send('El producto no existe');
    },

    detailProduct: (req, res) => {
        db.Producto.findByPk(req.params.id, {
            include: [{association: "genero"}]
            }).then(producto => {
                res.render("../views/products/Detailproduct", {getBook:producto});
            });
        //res.send('El producto no existe');
    },

    //get form
    productCreate: (req, res) => {
        db.Genero.findAll()
        .then(function(generos){
            return res.render("../views/products/productCreate", {genres: generos});
        })
    },

    // post form
    productSave: async (req, res) => {
        try {
            await db.Producto.create({
                title: req.body.title,
                author: req.body.author,
                genre_id: req.body.genre,
                description: req.body.description,
                descriptionD: req.body.descriptionD,
                imgTop: req.files.imgTop[0].filename || 'default.png',
                imgBack: req.files.imgBack[0].filename || 'default.png',   
                price: req.body.price,
                discount: req.body.discount
            });    
            res.redirect("/");            
        } catch (error) {
            console.log(error);
        }
    },

    productEdit:  (req, res) =>{
        let pedidoProducto = db.Producto.findByPk(req.params.id);

        let pedidoGeneros = db.Genero.findAll();

        Promise.all([pedidoProducto, pedidoGeneros])
        .then(function([producto, generos]){
            res.render("../views/products/productEdit", {libro:producto, genres:generos});
        });
        //res.send('El libro que quieres editar no existe')
    },
   
    productUpDate: async (req, res) => {
        try {           
            db.Producto.update({
                title: req.body.title,
                author: req.body.author,
                genre_id: req.body.genre,
                description: req.body.description,
                descriptionD: req.body.descriptionD,
                imgTop: req.files.imgTop[0].filename || 'default.png',
                imgBack: req.files.imgBack[0].filename || 'default.png',   
                price: req.body.price,
                discount: req.body.discount
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.redirect("/detail/" + req.params.id)
        } catch (error) {
            console.log(error);
        }
    },

    productDelete: (req, res) => {
        db.Producto.findByPk(req.params.id)
            .then(product => {
                res.render('../views/products/productDelete', { product:product });
            });
    },

    productDestroy: async (req, res) => {
        try {
            db.Producto.destroy({
                where: {
                    id: req.params.id
                }
            })
    
            res.redirect("/")          
        } catch (error) {
            console.log(error);
        }
    }  
}

module.exports = productsController;