const express = require("express");
const path = require("path");
const methodOverride= require('method-override');
const app = express();

const port = 3001;

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))

//configuracion de la carpeta estatica
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));



const mainRoutes = require("./routes/mainRoutes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", mainRoutes);
app.use("/register", mainRoutes);
app.use("/login", mainRoutes);
app.use("/products", mainRoutes);
app.use("/productCart", mainRoutes);
app.use("/productCreate", mainRoutes);


app.get("*", mainRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
