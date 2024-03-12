const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const dotenv = require("dotenv");

const db = require("../database/models");
const sequelize = db.sequelize;
dotenv.config();

//const User = require('../models/user');

const controller = {
  register: (req, res) => {
    return res.render("../views/users/register");
  },
  processRegister: async (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("../views/users/register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    let userInDB = await db.Usuario.findOne({
      where: {
        email: req.body.email,
      },
    });


    if (userInDB) {
      return res.render("../views/users/register", {
        errors: {
          email: {
            msg: "Este email ya está registrado",
          },
        },

        oldData: req.body,
      });
    }

    try {
      const hash = bcryptjs.hashSync(req.body.password, 10);
      await db.Usuario.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hash,
        category_id: 2,
        avatar: req.file.filename,
      });
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }

    return res.redirect("/users/login");
  },

  login: (req, res) => {
    return res.render("../views/users/login");
  },

  loginProcess: async (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("../views/users/login", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    let userToLogin = await db.Usuario.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userToLogin) {
      let password_valid = await bcryptjs.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (password_valid) {
        /*token = jwt.sign({ "id" : userToLogin.id,"email" : userToLogin.email,"full_name":userToLogin.full_name },process.env.SECRET);
				res.status(200).json({ token : token });*/

        delete userToLogin.password;
        req.session.userLogged = userToLogin;

        if (req.body.remember_user) {
          //res.cookie('userEmail', req.body.email, { maxAge: (1000 * 10) })
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 60 }); //60 minutos
        }

        return res.redirect("/users/profile");
      }
      return res.render("../views/users/login", {
        errors: {
          email: {
            msg: "Las credenciales son inválidas",
          },
        },
      });
    }

    return res.render("../views/users/login", {
      errors: {
        email: {
          msg: "No se encontro este usuario en la Base de Datos",
        },
      },
    });
  },
  profile: (req, res) => {
    return res.render("../views/users/profile", {
      user: req.session.userLogged,
    });
  },

  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },

  userListAbm: (req, res) => {
    db.Usuario.findAll({
      include: [{ association: "categoria" }],
    }).then((usuarios) => {
      res.render("../views/users/userList", { usuarios });
    });
  },

  userEdit: async (req, res) => {
    try {
      //Si necesitamos buscar por otro atributo usamos findOne
      const pedidoUsuario = await db.Usuario.findByPk(req.params.id, {
        include: ["categoria"],
      });
      const pedidoCategorias = await db.Categoria.findAll();

      res.render("../views/users/userEdit1", {
        usuario: pedidoUsuario,
        categorias: pedidoCategorias,
      });
    } catch (error) {
      console.log(error);
    }
  },
  //res.send('El libro que quieres editar no existe')

  userUpDate: async (req, res) => {

    try {
      await db.Usuario.update(
        {
          fullName: req.body.fullName,
          email: req.body.email,
          //password: bcryptjs.hashSync(req.body.password, 10),
          category_id: req.body.category_id,
          //avatar: req.file?.filename || req.body.avatar,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.redirect("/users/userlist");
    } catch (error) {
      console.log(error);
    }
  },

  userDelete: (req, res) => {
    db.Usuario.findByPk(req.params.id).then((user) => {
      res.render("../views/users/userDelete", { user: user });
    });
  },

  userDestroy: async (req, res) => {
    try {
      db.Usuario.destroy({
        where: {
          id: req.params.id,
        },
      });

      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = controller;
