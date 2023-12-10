const createError = require('http-errors');
const express = require("express");
const path = require("path");
const methodOverride= require('method-override');
const logger = require('morgan');
const app = express();

const port = 3001;

app.use(express.urlencoded({extended: true}))
app.use(logger('dev'));
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
app.use("/detail", mainRoutes);
app.use("/productCart", mainRoutes);
app.use("/productCreate", mainRoutes);
app.use("/productEdit", mainRoutes);
app.use("/productDelete", mainRoutes);


app.get("*", mainRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;