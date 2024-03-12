const {
  validationResult
} = require("express-validator");

const db = require("../database/models");
const sequelize = db.sequelize;

const productsController = {
  productListAbm: (req, res) => {
    db.Producto.findAll({
      include: [{
        association: "genero"
      }],
    }).then((libros) => {
      return res.render("../views/products/productAbm", {
        libros
      });
    });
  },
  productList: async (req, res) => {
    try {
      let libros = await db.Producto.findAll({
        include: [{
          association: "genero"
        }],
      });
      return res.render("../views/products/productList", {
        libros
      });
    } catch (error) {
      console.log(error);
    }
  },
  productDetail: (req, res) => {
    let pedidoProducto = db.Producto.findByPk(req.params.id);

    let pedidoProductos = db.Producto.findAll({
      include: [{
        association: "genero"
      }],
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
      include: [{
        association: "genero"
      }],
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
        genres: generos
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
        newProduct.imgTop = 'default.png';
        newProduct.imgBack = 'default.png';
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
    //return res.send('El libro que quieres editar no existe')
  },

  productUpDate: async (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      db.Genero.findAll().then(function (generos) {
        return res.render("../views/products/productEdit", {
          genres: generos,
          errors: resultValidation.mapped(),
          oldData: req.body,
        });
      });
    } else {
      try {
        let editProduct = req.body;
        if (req.files) {
          editProduct.imgTop = req.files.imgTop[0].filename;
          editProduct.imgBack = req.files.imgBack[0].filename;
        } else {
          let product_old_db = await product.findByPk(req.params.id);
          editProduct.imgTop = product_old_db.imgTop;
          editProduct.imgBack = product_old_db.imgBack;
        }
        db.Producto.update({
          title: editProduct.title,
          author: editProduct.author,
          genre_id: editProduct.genre,
          description: editProduct.description,
          descriptionD: editProduct.descriptionD,
          //imgTop: editProduct.imgTop,
          //imgBack: editProduct.imgBack,
          price: editProduct.price,
          discount: editProduct.discount,
        }, {
          where: {
            id: req.params.id,
          },
        });
        return res.redirect("/detail/" + req.params.id);
      } catch (error) {
        console.log(error);
      }
    }
  },

  productDelete: (req, res) => {
    db.Producto.findByPk(req.params.id).then((product) => {
      res.render("../views/products/productDelete", {
        product: product
      });
    });
  },

  productDestroy: async (req, res) => {
    try {
      db.Producto.destroy({
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