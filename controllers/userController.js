
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

    const objPost = userDB.find((ele) => ele.id === index);
    let objToShow = {};
    if (objPost) {
        objToShow = {
            success: true,
            message: "Dettaglio dell' user " + req.params.id,
            objPost,
        };
    } else {
        res.status(404).send("Post per indice non trovato.");
    }
    res.json(objToShow);
}
//create a new item
function store(req, res) {

    res.send("Creazione nuova user");
}
//update an item
function update(req, res) {

    res.send("Modifica integrale della user " + req.params.id);
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
