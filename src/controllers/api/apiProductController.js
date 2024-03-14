const db = require("../../database/models");
const sequelize = db.sequelize;

const apiProductsController = {
  listAPI: (req, res) => {
    db.Producto.findAll({
      include: [
        {
          association: "genero",
        },
      ],
      attributes: {
        exclude: [
          "alt,",
          "author",
          "category",
          "descriptionD",
          "discount",
          "genre_id",
          "imgTop",
          "imgBack",
          "publisher",
          "stock",
        ],
      },
    })
      .then((products) => {
        if (products) {
          return res.status(200).json({
            meta: {
              count: products.length,
              countByCategory: "",
            },
            data:
            {
              datos: products,
              URLdetail: `http://localhost:3002/api/products/detail/:${products.id}`,
            },
          });
        } else {
          res.status(400).json({ error: "No results found" });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ error: "Could not connect to database" });
      });
  },

  detailAPI: (req, res) => {
    db.Producto.findByPk(req.params.id, {
      include: [
        {
          association: "genero",
        },
      ],
    })
      .then((producto) => {
        if (producto) {
          return res.status(200).json({
            meta: {
              status: 200,
              url: `http://localhost:3002/img/${producto.imgTop}`,
            },
            data: producto,
          });
        } else {
          res.status(400).json({ error: "No results found" });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ error: "Could not connect to database" });
      });
  },

  lastProduct: (req, res) => {
    db.Producto.findAll({
      order: [
        ['id', 'DESC']
      ],
      limit: [1],
      raw: true
    })
      .then(products => {
        let appPath = 'http://localhost:3002/img/'
        let imageURL = appPath + products[0].imgTop;
        let lastProduct = products[0];
        console.log(lastProduct);
        lastProduct.imageURL = imageURL;
        if (products) {
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

module.exports = apiProductsController;
