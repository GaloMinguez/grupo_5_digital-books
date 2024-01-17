//const libros = require('../data/products.json');
//const now = require("date-now") ver si es necesario o no

const fs = require ('fs');
const path = require('path');

const pathLibros= path.join(__dirname, '../data/products.json');

const libros = JSON.parse(fs.readFileSync(pathLibros, 'utf-8'));

const db = require('../database/models');
const sequelize = db.sequelize;
const Op = sequelize.Op;

const controller = {
    index: (req, res) => res.render('index'),
    search: async (req, res) => {
        const Op = db.Sequelize.Op;
        palabra = (req.query.keywords).toLowerCase();
        let pedidoProducto = db.Producto.count({
            where: {
                title: {
                    [Op.like]: `%${palabra}%`
                }
          }})

        let pedidoProductos =  db.Producto.findAll({
            where: {
                title: {[Op.like]:`%${palabra}%`}
            }
        });

        Promise.all([pedidoProducto, pedidoProductos])
        .then(function([cantidad, productos]){
            res.render("../views/results", {pFound:cantidad, pToSearch:productos});
        });
	},
	productCart: (req, res) => {
        db.Producto.findAll({
            include: [{association: "genero"}]
        })
        .then(libros => {
            res.render('../views/products/productCart', { libros })    
        })
    },
    
}

module.exports = controller;