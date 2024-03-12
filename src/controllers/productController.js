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

  //Procesos API
  listAPI: (req, res) => {
    db.Producto.findAll({
      include: [{
        association: "genero"
      }],
    }).then((products) => {
      return res.status(200).json({
        meta: {
          count: products.length,
          countByCategory: "",
          detail: "api/products/:id",
        },
        data: products,
      });
    });
    //return res.send('Devuelve datos de los artistas.');
  },
  detailAPI: (req, res) => {
    db.Producto.findByPk(req.params.id, {
      include: [{
        association: "genero"
      }],
    }).then((producto) => {
      return res.status(200).json({
        meta: {
          status: 200,
          url: "api/products/:id",
        },
        data: producto,
      });
    });
    //return res.send('Devuelve el detalle de un album asociado a un (" id ") de un artista indicado en la ruta o en la query string.');
  },
  lastProduct: (req, res) => {
    db.Producto.findAll({
        order: [
          ['id', 'DESC']
        ],
        limit: [1],
        raw: true
      }) //, nest: true, include: 'variety' 
      .then(products => {
        let appPath = 'http://localhost:5001/images/products/'
        let imageURL = appPath + products[0].image;
        let lastProduct = products[0];
        lastProduct.imageURL = imageURL;
        if (product) {
          res.status(200).json({
            meta: {
              url: req.originalUrl,
              status: 200,
              count: 1

            },
            data: lastProduct
          });
        } else {
          res.status(400).json({
            error: 'No results found'
          });
        }
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({
          error: 'Could not connect to database'
        });;
      })
  },
  createAPI: (req, res) => {
    return res.send(
      "Puedes agregar un nuevo producto a nuestra base de datos. Para porder utilizar esta API, debes ejecutar la ruta /productos/create/id desde la plataforma POSTMAN"
    );
  },
  updateAPI: (req, res) => {
    return res.send(
      "Puedes modifcar el nombre del producto en nuestra base de datos. Para porder utilizar esta API, debes ejecutar la ruta /productos/update/id desde la plataforma POSTMAN"
    );
  },
  destroyAPI: (req, res) => {
    return res.send(
      "Puedes eliminar un producto a nuestra base de datos. Para porder utilizar esta API, debes ejecutar la ruta /productos/delete/id desde la plataforma POSTMAN"
    );
  },
};

module.exports = productsController;