
const { userDB } = require("../models/userDB.js");

//show all the data for the specific request
function index(req, res) {

    const itemName = req.query.name;
    const itemWork = req.query.work;

    let arrayCopy = [...userDB];

    if(itemName){
        arrayCopy = userDB.filter(((ele)=> ele.name.toLowerCase().includes(itemName.toLowerCase())));
    }
    if(itemWork){
        arrayCopy = arrayCopy.filter(((ele)=> ele.work.toLowerCase().includes(itemWork.toLowerCase())));
    }

    const response = {
        succes: true,
        message: "Lista degli user",
        counter: userDB.length,
        data: arrayCopy,
    };

    res.json(response);
}

//show only one data by id
function show(req, res) {

    const index = parseInt(req.params.id);

    const objUser = userDB.find((ele) => ele.id === index);
  
    let response = {};
    let status = 0;
    if (objUser) {
      status= 200;
      response = {
        success: true,
        message: "Dettaglio dell'user " + req.params.id,
        objUser,
      };
    } else {
      status = 404;
      response = {
        success: false,
        message: "Non posso trovare l'user " + req.params.id,
        objUser,
      };
    }
    res.status(status).json(response);
}
//create a new item
function store(req, res) {

  let indexAcc = 0;
  for (let i = 0; i < userDB.length; i++) {
    if (userDB[i].id > indexAcc) {
      indexAcc = userDB[i].id;
    }
  }
  indexAcc++;
  const newUser = {
    id: indexAcc,
    name: req.body.name,
    work: req.body.work,
  };
  userDB.push(newUser);
  console.log(newUser);
  res.status(201).json(newUser);
}
//update an item
function update(req, res) {
    
  const id = parseInt(req.params.id);
  const item = userDB.find((item) => item.id === id);
  if (!item) {

    res.status(404).json({ success: false, message: "User non esiste" });
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

  console.log(userDB);
  res.send("Modifica integrale dell user " + req.params.id);
}

function modify(req, res) {

    res.send("Modifica parziale della user " + req.params.id);
}
//delete one item from db
function destroy(req, res) {
    //todo Destroy dovrà eliminare un singolo post dalla lista, stampare nel terminale (console.log) la lista aggiornata, e rispondere con uno stato 204 e nessun contenuto.
    const index = parseInt(req.params.id);

    const indexLista = userDB.findIndex((ele) => ele.id === index);
    let response = {};
    let status = 0;
    //if indexLista is -1 means it returned false
    if (indexLista >= 0) {

        userDB.splice(indexLista, 1);//here im deleting the item from array

        status = 200;
        response = {
            succes: true,
            message: "Eliminazione della user " + index,
            counter: userDB.length,
            data: userDB,
        };
    } else {
        status = 204;
        response = {
            succes: false,
            message: "Invalida eliminazione della user " + index,
            counter: userDB.length,
            data: userDB,
        };
    }
    console.log(`array after delete: ${userDB}`);
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
