const express = require('express')
const path = require('path')
const app = express()
const port = 3000

//configuracion de la carpeta estatica
const publicPath = path.join(__dirname,'public');
app.use(express.static(publicPath))

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname,'views', 'index.html'))
});

app.get("/detalleProducto", (req, res) => {
   res.sendFile(path.join(__dirname, "views", "productDetail.html"));
 });

//ruta login
app.get('/login', (req, res) => {
   res.sendFile(path.join(__dirname,'views','login.html'))
 }) 

//ruta registro
app.get('/register', (req, res) => {
   res.sendFile(path.join(__dirname,'views','register.html'))
 })

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})

const cartInfo = document.querySelector('.cart-product')
const rowProduct = document.querySelector('.row-product')

// Lista de los contenedores de producto:
const productsList = document.querySelector('.slider')

// Variable de arreglos de productos:
let allProducts = []


productsList.addEventListener('click', e => {
  if(e.target.classList.contains('btn-add-cart')) {
    const product = e.target.parentElement
  }
})