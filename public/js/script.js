/*
*CONSEGNA*
*Milestone 1*
Sfruttando gli screen e gli asset in allegato riproduciamo la grafica proposta in maniera statica: utilizzando soltanto HTML e CSS e riproducendo una singola fotografia (usiamo una qualunque immagine a piacimento)
*Milestone 2*
Utilizzando Postman, testiamo una chiamata all’endpoint di JSON Placeholder:
https://jsonplaceholder.typicode.com/photos?_limit=6
Studiamo bene la risposta e i dati che ci fornisce iniziando a pensare a come poterli sfruttare.
*Milestone 3*
Inseriamo un foglio JavaScript ed effettuiamo una chiamata AJAX all’API di JSON Placeholder, sfruttando la risposta per generare dinamicamente in pagina una serie di foto!
*Bonus*
rendi la pagina responsive, in modo che su mobile e tablet le foto si dispongano man mano una sotto l’altra ed il titolo abbia una dimensione adeguata
*/

//const { response } = require("express");


const baseUrl = "http://localhost:3000/post/";
const resource = "photos";
const numImg = 6;
const params = { "_limit": numImg };
const _limit = "?_limit=";

const eleDivContainer = document.querySelector(".container");
const eleOverlay = document.querySelector(".overlay");
const btnCreate = document.querySelector("#btn-create");
const btnDelete = document.querySelector("#btn-delete");

const cardArray = [];
let activeCard = null;
let activeCardIndex = -1;

FuncAxios();
//invoke on first page load
function FuncAxios() {
    axios.get(baseUrl )
        .then((response) => {
            console.log(response.data.data);
            const photos = response.data.data;
            //console.log(photos);
            for (let i = 0; i < photos.length; i++) {
                const id = photos[i].id;
                const urlImg = photos[i].img;
                const urlText = photos[i].contenuto;
                let urlTextUppercase = "";
                urlTextUppercase = WordsToUppercase(urlText, urlTextUppercase);//uppercase all first char words in a string

                CreateCard(urlImg, urlTextUppercase, id);
            }
        })
        .catch((error) => {
            console.error("Errore nella chiamata API:", error);
        });
}
//invoke on create card, just one
function FuncAxiosRandom() {
    axios.get(baseUrl)
        .then((response) => {
            const photos = response.data.data;
            const randomIndex = RandomNum(0, photos.length -1);
            const photo = photos[randomIndex];

            const id = photo.id;
            const urlImg = photo.img;
            const urlText = photo.contenuto;
            let urlTextUppercase = "";
            console.log(urlText);
            urlTextUppercase = WordsToUppercase(urlText, urlTextUppercase);//uppercase all first char words in a string

            CreateCard(urlImg, urlTextUppercase, id);

        })
        .catch((error) => {
            console.error("Errore nella chiamata API:", error);
        });
}
function CreateCard(img, text, id) {
    const card = document.createElement("div");
    card.className = "card debugger";

    card.innerHTML = `
        <span class="pinAbsolute"><img src="../public/image/pin.svg" alt=""></span>
        <div class="card-img debugger">
            <img src="${img}" alt="${text}">
        </div>
        <div class="card-text debugger">
            ${text}
        </div>
    `;

    card.setAttribute("id", id); // add id from promise
    card.setAttribute("data-index", cardArray.length); // save index based upon cardArray length
    eleDivContainer.appendChild(card);

    let isCentered = false; // Boolean for overlay card
    card.addEventListener("click", (event) => {
        event.stopPropagation();

        const elePin = card.querySelector(".pinAbsolute");
        elePin.classList.toggle("my-d-none");
        eleOverlay.classList.toggle("my-d-none");

        if (!isCentered) {
            card.classList.add("centered");
            activeCard = event.currentTarget;
            activeCardIndex = parseInt(card.getAttribute("data-index"));
        } else if(card!=null) {
            card.classList.remove("centered");
            activeCard = null;
            activeCardIndex= -1;
        }
        isCentered = !isCentered; // Alterna lo stato
    });
    cardArray.push(card); // Aggiungi la card all'array
}
//EVENT
btnCreate.addEventListener("click", (event) => {
    event.stopPropagation();

    FuncAxiosRandom(RandomNum(1, 999));
});
btnDelete.addEventListener("click", (event)=>{
    event.stopPropagation();

    eleOverlay.classList.toggle("my-d-none");
    console.log(activeCard.id,"|=>",activeCardIndex);
    activeCard.remove();// remove card from DOM
    cardArray.splice(activeCardIndex, 1); // remove card from array
    cardArray.forEach((card, i) => card.setAttribute("data-index", i));// Update index of remaning cards
});
//FUNCTION
function WordsToUppercase(array, string) {
    for (let i = 0; i < array.length; i++) {
        const char = array[i];

        if (i == 0 || array[i - 1] == " ") {
            string += char.toUpperCase();
        } else {
            string += char;
        }
    }
    return string;
}
function RandomNum(min, max) {
    return Math.floor(Math.random() * max + min);
}