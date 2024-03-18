const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const apiGenreController = {
  listAPI: (req, res) => {
    db.Genero.findAll({
      attributes: ['name', [db.sequelize.fn('COUNT', sequelize.col('productos.id')), 'total_productos']], // selecciona el nombre del género y cuenta los productos asociados
      include: [{
        model: db.Producto,
        as: 'productos',
        attributes: [],
      }],
      /*where: {
        //name: { [Op.eq]: ['Literatura']},
        total_productos: { [Op.gt]: 0 },
      },*/
      group: ['id'], 
    })
      .then((genres) => {
        if (genres) {
          return res.status(200).json({
            meta: {
              count: genres.length,
              detail: `http://localhost:3002/api/genres/detail/:id`,
            },
            data: genres,
          });
        } else {
          res.status(400).json({
            error: "No results found",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          error: "Could not connect to database",
        });
      });
  },

  detailAPI: (req, res) => {
    db.Genero.findByPk(req.params.id)
    .then((genres) => {
      if (genres) {
        return res.status(200).json({
          meta: {
            count: genres.length,
            detail: `http://localhost:3002/api/genres/detail/:id`,
          },
          data: genres,
        });
      } else {
        res.status(400).json({
          error: "No results found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "Could not connect to database",
      });
    });
  },
  genreProducts: (req, res) => {
    db.Genero.findByPk(req.params.id, {
      include: ['productos']
    })
    .then((genres) => {
      if (genres) {
        return res.status(200).json({
          meta: {
            count: genres.productos.length,
            url: `http://localhost:3002/api/genres/detail/:id/products`,
          },
          data: genres,
        });
      } else {
        res.status(400).json({
          error: "No results found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "Could not connect to database",
      });
    });
  },
};

module.exports = apiGenreController;
