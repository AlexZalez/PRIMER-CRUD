'use strict'
const express = require("express");
const router = express.Router();

const IndexController = require('../controllers/IndexController');

const index = new IndexController();

router.get("/", index.mensaje);

module.exports = router;