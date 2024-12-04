const express = require("express");
const router = express.Router();

const { lista } = require("../data/lista.js");

// index
router.get("/", function (req, res) {
  let response = {
    succes: true,
    message: "Lista dei posts",
    counter: lista.length,
    data: [...lista],
  };

  

  res.json(response);
});

// show
router.get("/:id", function (req, res) {
  const index = parseInt(req.params.id);

  const objPost = lista.find((ele) => ele.id === index);
  let objToShow = {};
  if (objPost) {
    objToShow = {
      success: true,
      message: "Dettaglio del post " + req.params.id,
      objPost,
    };
  } else {
    res.status(404).send("Post per indice non trovato.");
  }
  res.json(objToShow);
});

// store
router.post("/", function (req, res) {
  res.send("Creazione nuova pizza");
});

// update
router.put("/:id", function (req, res) {
  res.send("Modifica integrale della pizza " + req.params.id);
});

// modify
router.patch("/:id", function (req, res) {
  res.send("Modifica parziale della pizza " + req.params.id);
});

// destroy
router.delete("/:id", function (req, res) {
  res.send("Eliminazione della pizza " + req.params.id);
});

module.exports = router;
