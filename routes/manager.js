'use strict'
const express = require("express");
const router = express.Router();

const ManagerController = require('../controllers/ManagerController');

const manager = new ManagerController();


router.get("/AgregarMaquina", manager.AgregarMaquina);
router.post('/AgregarMaquina', manager.RecibirMaquina);
router.get("/VerMaquinas", manager.VerMaquinas);
router.get("/EliminarMaquina/:id", manager.EliminarMaquina);
router.get("/MarcarMaquina/:id", manager.MarcarMaquina);
router.post("/EditarMaquina", manager.EditarMaquina);
router.get("/BuscarMaquina", manager.BuscarMaquina);
router.post("/BuscarMaquina", manager.MostrarMaquina)


module.exports = router;