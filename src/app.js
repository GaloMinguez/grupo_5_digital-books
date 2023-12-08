const express = require("express");
const path = require("path");
const methodOverride= require('method-override');
const logger = require('morgan');
const app = express();

const port = 3001;

app.use(express.urlencoded( {extended: true}))
app.use(logger('dev'));
app.use(express.json())
app.use(methodOverride('_method'))

//configuracion de la carpeta estatica
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));



const mainRoutes = require("./routes/mainRoutes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", mainRoutes);
app.get("/register", mainRoutes);
app.get("/login", mainRoutes);
app.get("/products", mainRoutes);
app.get("/productCart", mainRoutes);
app.get("/products/productCreate", mainRoutes);


app.get("*", mainRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;