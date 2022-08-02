const express = require("express");
const ContenedorCart = require("../contenedorCart");
const Contenedor = require("../contenedor");
const { Router } = express;
const productosContenedor = new Contenedor("./public/data.txt");
const carritoContenedor = new ContenedorCart("./public/cart.txt");

const routerCarrito = Router();

routerCarrito.post("/", async (req, res) => {
  try {
    const productos = await productosContenedor.getAll();
    const timestamp = Date.now();
    const carrito = { productos: [], timestamp };
    res.send(await carritoContenedor.save(carrito));
  } catch (error) {
    console.error(error);
  }
});

routerCarrito.delete("/:id", async (req, res) => {
  try {
    const productoEliminado = await carritoContenedor.deleteById(+req.params.id);
    if (productoEliminado) {
      productoEliminado;
      res.send("El producto fue eliminado");
    } else {
      res.json("No existe ese producto");
    }
  } catch (error) {
    console.error(error);
  }
});

routerCarrito.get("/:id/productos", async (req, res) => {
  try {
    const carritoEncontrado = await carritoContenedor.getById(+req.params.id);
    if (carritoEncontrado) {
      res.send(carritoEncontrado);
    } else {
      res.json("No existe ese carrito");
    }
  } catch (error) {
    console.error(error);
  }
});

routerCarrito.post('/:id/productos', async (req, res) => {
    try {
        const productoEncontrado = await productosContenedor.getById(+req.params.id);
        if (productoEncontrado) {
            carritoContenedor.save(productoEncontrado)
            res.send(productoEncontrado)
        } else {
            res.json("No existe ese producto")
        }
        } catch (error) {
        console.error(error);
    }
});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
    try {
      carritoContenedor.deleteByIdCart(req.params.id, req.params.id_prod);
      res.json("El producto fue borrado del carrito")
    } catch (error) {
      console.error(error);
    }
  });

  routerCarrito.post("/:id/productos/:id_prod", async (req, res) => {
    try {
      const producto = await productosContenedor.getById(+req.params.id_prod);
      const carrito = await carritoContenedor.getById(+req.params.id);
      carrito.productos.push(producto)
      res.send(await carritoContenedor.agregarProdCart(carrito))
    } catch (error) {
      console.error(error);
    }
  });

module.exports = routerCarrito;
