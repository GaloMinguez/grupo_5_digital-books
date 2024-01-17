module.exports = {
  "development": {
    "username": "root",
    "password": null,
<<<<<<< HEAD
    "database": "database_development",
=======
    "database": "digitalbooks_db",
>>>>>>> f349b25bc0377b055ca435d8251e63678caebc57
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
<<<<<<< HEAD
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
=======
    "username": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
>>>>>>> f349b25bc0377b055ca435d8251e63678caebc57
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
