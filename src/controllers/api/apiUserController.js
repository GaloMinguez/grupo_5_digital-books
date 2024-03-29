const db = require("../../database/models");
const sequelize = db.sequelize;

const apiUsersController = {
  listAPI: (req, res) => {
    db.Usuario.findAll({
        attributes: {
          exclude: [
            "password",
            "category_id",
          ],
        },
    })
      .then((users) => {
        if (users) {
          users.forEach(user => {
            user.password = `http://localhost:3002/api/products/detail/${user.id}`
          });
          return res.status(200).json({
            meta: {
              count: users.length,
            },
            data: users,
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
    db.Usuario.findByPk(req.params.id, {
      include: [
        {
          association: "categoria",
        },
      ],
    })
      .then((usuario) => {
        if (usuario) {
          return res.status(200).json({
            meta: {
              status: 200,
              urlImagen: `http://localhost:3002/img/users/${usuario.avatar}`,
            },
            data: 
            {
                id: usuario.id,
                fullName: usuario.fullName,
                email: usuario.email,
                imagen: usuario.avatar
            },
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
  lastUser: (req, res) => {
    db.Usuario.findAll({
      order: [
        ['id', 'DESC']
      ],
      limit: [1],
      raw: true
    })  
      .then(users => {
        let appPath = 'http://localhost:3002/img/users/'
        let imageURL = appPath + users[0].avatar;
        let lastUser = users[0];
        console.log(lastUser);
        lastUser.imageURL = imageURL;
        if (users) {
          res.status(200).json({
            meta: {
              url: req.originalUrl,
              status: 200,
              count: 1
            },
            data: lastUser
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
      "Puedes agregar un nuevo usuario a nuestra base de datos. Para porder utilizar esta API, debes ejecutar la ruta /users/create/id desde la plataforma POSTMAN"
    );
  },
  updateAPI: (req, res) => {
    return res.send(
      "Puedes modifcar el nombre del usuario en nuestra base de datos. Para porder utilizar esta API, debes ejecutar la ruta /users/update/id desde la plataforma POSTMAN"
    );
  },
  destroyAPI: (req, res) => {
    return res.send(
      "Puedes eliminar un usuario a nuestra base de datos. Para porder utilizar esta API, debes ejecutar la ruta /users/delete/id desde la plataforma POSTMAN"
    );
  },
};

module.exports = apiUsersController;
