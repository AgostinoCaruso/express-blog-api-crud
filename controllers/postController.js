const { postDB } = require("../models/postDB.js");
const { post } = require("../router/posts.js");

//show all the data for the specific request
function index(req, res) {


  const itemName = req.query.titolo;
  const itemTags = req.query.tags;

  let arrayCopy = [...postDB];

  if (itemName) {
    arrayCopy = postDB.filter(((ele) => ele.titolo.toLowerCase().includes(itemName.toLowerCase())));
  }
  if (itemTags) {
    arrayCopy = arrayCopy.filter(((ele) => ele.tags.toLowerCase().includes(itemTags.toLowerCase())));
  }

  const response = {
    succes: true,
    message: "Lista degli user",
    counter: postDB.length,
    data: arrayCopy,
  };

  res.json(response);

}

//show only one data by id
function show(req, res) {
  const index = parseInt(req.params.id);

  const objPost = postDB.find((ele) => ele.id === index);

  let response = {};
  let status = 0;
  if (objPost) {
    status = 200;
    response = {
      success: true,
      message: "Dettaglio del post " + req.params.id,
      objPost,
    };
  } else {
    status = 404;
    response = {
      success: false,
      message: "Non posso trovare il post " + req.params.id,
      objPost,
    };
  }
  res.status(status).json(response);
}
//create a new item
function store(req, res) {

  let indexAcc = 0;
  for (let i = 0; i < postDB.length; i++) {
    if (postDB[i].id > indexAcc) {
      indexAcc = postDB[i].id;
    }
  }

  const newPost = {
    counter:postDB.length,
    id: indexAcc,
    titolo: req.body.titolo,
    image: req.body.img,
    contenuto: req.body.contenuto,
  };
  postDB.push(newPost);
  console.log(newPost);
  res.status(201).json(newPost);
}
//update an item
function update(req, res) {

  const id = parseInt(req.params.id);
  const item = postDB.find((item) => item.id === id);
  if (!item) {

    res.status(404).json({ success: false, message: "Post non esiste" });
    return;
  }
  console.log(req.body);
  //è tedioso e lungo e devi scriverlo a mano tutto
  /*
  item.titolo = req.body.name;
  item.img = req.body.image;
  item.tags = req.body.tags;
  */

  //fa la stessa cosa ma piu pulita
  for (key in item) {
    if (key !== "id") {
      item[key] = req.body[key];
    }
  }

  console.log(postDB);
  res.send("Modifica integrale della pizza " + req.params.id);
}

function modify(req, res) {

  res.send("Modifica parziale della pizza " + req.params.id);
}
//delete one item from db
function destroy(req, res) {
  const index = parseInt(req.params.id);

  const indexLista = postDB.findIndex((ele) => ele.id === index);
  let response = {};
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
  } else {

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
