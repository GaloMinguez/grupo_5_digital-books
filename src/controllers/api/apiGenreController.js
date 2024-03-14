const db = require("../../database/models");
const sequelize = db.sequelize;

const apiGenreController = {
  listAPI: (req, res) => {
    db.Genero.findAll()
      .then((genres) => {
        if (genres) {
          return res.status(200).json({
            meta: {
              count: genres.length,
              detail: `http://localhost:3002/api/genres/:id`,
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
