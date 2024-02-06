module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("users", [
        { fullName: "Fin Bulward",
            email: "fbulward0@pagesperso-orange.fr",
            password: "$2a$10$/PcwNFkUFIf5O/nPJ.jFh.ie2qJvCjN1HphXFDuwjRbB1AgyXzbku",
            category_id: "2",
            avatar: "michael.jpg"
        },
        { fullName: "Kelby Pancoast",
            email: "kelbyp@gmail.com",
            password: "$2a$10$/PcwNFkUFIf5O/nPJ.jFh.ie2qJvCjN1HphXFDuwjRbB1AgyXzbku",
            category_id: "2",
            avatar: "jake.jpg"
        },
        { fullName: "Barbabra Cardenosa",
            email: "bcardenosa2@java.com",
            password: "$2a$10$/PcwNFkUFIf5O/nPJ.jFh.ie2qJvCjN1HphXFDuwjRbB1AgyXzbku",
            category_id: "2",
            avatar: "alexander.jpg"
        },
        { fullName: "Yoda",
            email: "cliente@gmail.com",
            password: "$2a$10$/PcwNFkUFIf5O/nPJ.jFh.ie2qJvCjN1HphXFDuwjRbB1AgyXzbku",
            category_id: "2",
            avatar: "cliente.jpg"
        },
        { fullName: "Miguel Alejandro Nieva",
            email: "admin@gmail.com",
            password: "$2a$10$/PcwNFkUFIf5O/nPJ.jFh.ie2qJvCjN1HphXFDuwjRbB1AgyXzbku",
            category_id: "1",
            avatar: "admin.jpg"
        }
      ]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("users", null, {});
    },
  };