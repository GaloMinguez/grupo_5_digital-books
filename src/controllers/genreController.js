const path = require('path');
const { log } = require('console');

const db = require('../database/models');
const sequelize = db.sequelize;

const genresController = {

    //Procesos API
    'listAPI': (req, res) => {
        db.Genero
            .findAll()
            .then(genres => {
                return res.status(200).json({
                    meta: {
                        count: genres.length,
                        url: "api/genres"
                    },
                    data: genres
                })
            })
    },
    'detailAPI': (req, res) => {
        db.Genero.findByPk(req.params.id).then(genero => {
            return res.status(200).json({
                meta: {
                    status: 200,
                    url: "api/genres/:id"
                },
                data: genero
            })
        })
    },
}

module.exports = genresController;