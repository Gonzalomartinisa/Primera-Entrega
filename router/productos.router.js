const express = require('express');
const Contenedor = require('../contenedor');
const { Router } = express;
const productosContenedor = new Contenedor('./public/data.txt')

const routerProducts = Router();

routerProducts.get('/', async (req, res) => {
    try {
        res.send(await productosContenedor.getAll());
    } catch (error) {
        console.error(error);
    }
});
routerProducts.get('/:id', async (req, res) => {
    try {
        const productoEncontrado = await productosContenedor.getById(+req.params.id);
        if (productoEncontrado) {
            res.send(productoEncontrado)
        } else {
            res.json("No existe ese producto")
        }
        } catch (error) {
        console.error(error);
    }
});

routerProducts.post('/', async (req, res) => {
     try {
        res.send(await productosContenedor.save(req.body));
     } catch (error) {
        console.error(error);
    }
});

routerProducts.put('/:id', async (req, res) => {
    try {
        const prodAct = await productosContenedor.update(+req.params.id, req.body)
        if (!prodAct) {
            res.json("El producto no fue actualizado o no existe")
        } else {
            res.send(prodAct);
        }
    } catch (error) {
        console.error(error);
    }
});

routerProducts.delete('/:id', async (req, res) => {
try {
    const productoEliminado = await productosContenedor.deleteById(+req.params.id);
    if (productoEliminado) {
        productoEliminado
        res.send("El producto fue eliminado")    
    } else {
        res.json("No existe ese producto")
    }
    } catch (error) {
    console.error(error);
}
});

module.exports = routerProducts;