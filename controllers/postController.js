
const { lista } = require("../models/lista.js");

//show all the data for the specific request
function index(req, res) {

  let response = {
    succes: true,
    message: "Lista dei posts",
    counter: lista.length,
    data: [...lista],
  };

  res.json(response);
}

//show only one data by id
function show(req, res) {
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
}
//create a new item
function store(req, res) {

  res.send("Creazione nuova pizza");
}
//update an item
function update(req, res) {

  res.send("Modifica integrale della pizza " + req.params.id);
}

function modify(req, res) {

  res.send("Modifica parziale della pizza " + req.params.id);
}
//delete one item from db
function destroy(req, res) {
  res.send("Eliminazione della pizza " + req.params.id);
}

module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy,
};
