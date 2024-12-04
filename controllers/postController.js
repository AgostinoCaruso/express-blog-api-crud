
const { postDB } = require("../models/postDB.js");

//show all the data for the specific request
function index(req, res) {

  let response = {
    succes: true,
    message: "Lista dei posts",
    counter: postDB.length,
    data: [...postDB],
  };

  res.json(response);
}

//show only one data by id
function show(req, res) {
  const index = parseInt(req.params.id);

  const objPost = postDB.find((ele) => ele.id === index);
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
  //todo Destroy dovrà eliminare un singolo post dalla lista, stampare nel terminale (console.log) la lista aggiornata, e rispondere con uno stato 204 e nessun contenuto.
  const index = parseInt(req.params.id);

  const indexLista = postDB.findIndex((ele) => ele.id === index);
  let response ={};
  let status = 0;
  //if indexLista is -1 means it returned false
  if (indexLista >= 0) {

    postDB.splice(indexLista, 1);//here im deleting the item from array

    status = 200;
    response = {
      succes: true,
      message: "Eliminazione della pizza " + index,
      counter: postDB.length,
      data: postDB,
    };
  }else{

    status = 204;
    response = {
      succes: false,
      message: "Invalida eliminazione della pizza " + index,
      counter: postDB.length,
      data: postDB,
    };
  }
  console.log(`array after delete: ${postDB}`);
  res.status(status).json(response);
}

module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy,
};
