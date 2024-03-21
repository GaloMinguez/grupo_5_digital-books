const { validationResult } = require("express-validator");

const db = require("../database/models");
const sequelize = db.sequelize;

const productsController = {
  productListAbm: (req, res) => {
    db.Producto.findAll({
      include: [
        {
          association: "genero",
        },
      ],
    }).then((libros) => {
      return res.render("../views/products/productAbm", {
        libros,
      });
    });
  },
  productList: async (req, res) => {
    try {
      let libros = await db.Producto.findAll({
        include: [
          {
            association: "genero",
          },
        ],
      });
      return res.render("../views/products/productList", {
        libros,
      });
    } catch (error) {
      console.log(error);
    }
  },
  productDetail: (req, res) => {
    let pedidoProducto = db.Producto.findByPk(req.params.id);

    let pedidoProductos = db.Producto.findAll({
      include: [
        {
          association: "genero",
        },
      ],
    });

    Promise.all([pedidoProducto, pedidoProductos]).then(function ([
      producto,
      productos,
    ]) {
      return res.render("../views/products/productDetail", {
        getBook: producto,
        libros: productos,
      });
    });
    //preguntar como envio un mensaje si el producto no existe
    //return res.send('El producto no existe');
  },

  detailProduct: (req, res) => {
    db.Producto.findByPk(req.params.id, {
      include: [
        {
          association: "genero",
        },
      ],
    }).then((producto) => {
      return res.render("../views/products/Detailproduct", {
        getBook: producto,
      });
    });
    //return res.send('El producto no existe');
  },

  //get form
  productCreate: (req, res) => {
    db.Genero.findAll().then(function (generos) {
      return res.render("../views/products/productCreate", {
        genres: generos,
      });
    });
  },

  // post form
  productSave: async (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      db.Genero.findAll().then(function (generos) {
        return res.render("../views/products/productCreate", {
          genres: generos,
          errors: resultValidation.mapped(),
          oldData: req.body,
        });
      });
    } else {
      try {
        let newProduct = req.body;
        newProduct.imgTop = "default.png";
        newProduct.imgBack = "default.png";
        if (req.files) {
          newProduct.imgTop = req.files.imgTop[0].filename;
          newProduct.imgBack = req.files.imgBack[0].filename;
        }

        await db.Producto.create({
          title: newProduct.title,
          author: newProduct.author,
          genre_id: newProduct.genre,
          description: newProduct.description,
          descriptionD: newProduct.descriptionD,
          imgTop: newProduct.imgTop,
          imgBack: newProduct.imgBack,
          price: newProduct.price,
          discount: newProduct.discount,
        });
        return res.redirect("/");
      } catch (error) {
        console.log(error);
      }
    }
  },

  productEdit: (req, res) => {
    let pedidoProducto = db.Producto.findByPk(req.params.id);

    let pedidoGeneros = db.Genero.findAll();

    Promise.all([pedidoProducto, pedidoGeneros]).then(function ([
      producto,
      generos,
    ]) {
      res.render("../views/products/productEdit", {
        libro: producto,
        genres: generos,
      });
    });
  },

  productUpDate: async (req, res) => {
    try {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            let genres = await db.Genero.findAll();
            let product = await db.Producto.findByPk(req.params.id);

            return res.render("../views/products/productEdit", {
                libro: product,
                genres: genres,
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        } else {
            let editProduct = req.body;
            let product_old_db = await db.Producto.findByPk(req.params.id);

            const imgTop = req.files['imgTop'] ? req.files['imgTop'][0] : null;
            const imgBack = req.files['imgBack'] ? req.files['imgBack'][0] : null;

            if (imgTop == null) {
                editProduct.imgTop = product_old_db.imgTop;
            } else {
                editProduct.imgTop = req.files.imgTop[0].filename;
            }

            if (imgBack == null) {
                editProduct.imgBack = product_old_db.imgBack;
            } else {
                editProduct.imgBack = req.files.imgBack[0].filename;
            }

            await db.Producto.update({
                title: editProduct.title,
                author: editProduct.author,
                genre_id: editProduct.genre,
                description: editProduct.description,
                descriptionD: editProduct.descriptionD,
                price: editProduct.price,
                imgTop: editProduct.imgTop,
                imgBack: editProduct.imgBack,
                discount: editProduct.discount,
            }, {
                where: {
                    id: req.params.id
                }
            });

            // Debería estar dentro del bloque else
        }
    } catch (error) {
        console.log(error);
    }
    return res.redirect("/"); 
},

  productDelete: async (req, res) => {
    await db.Producto.findByPk(req.params.id).then((product) => {
      res.render("../views/products/productDelete", {
        product: product,
      });
    });
  },

  productDestroy: async (req, res) => {
    try {
      await db.Producto.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productsController;
