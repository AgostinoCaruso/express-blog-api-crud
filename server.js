//server
const express = require("express"); //associare a variabile l'oggetto express
const server = express();
//const PORT = 3000;
const port = process.env.PORT;
//other var
server.use(express.static("public"));
server.use(express.json());
const {notFound, interalServerErr} = require("./middlewares/errorsHandling.js");
//root
const postRouter = require("./router/posts.js");
server.use("/posts", postRouter);

const userRouter = require("./router/users.js");
server.use("/users", userRouter);

//qua partendo dal port 3000 ho l'inizio del server
server.get("/", (req, res) => {
  console.log(__dirname +"/views/index.html");
  res.sendFile(__dirname+"/views/index.html");
  //res.send("<h1>Server del mio blog</h1>");
});




//default catch for typo url è obsoleto ora con i middleware
// server.get("*", (req, res) => {
//   res.status(404).send("<h1>ERROR - 404 page not found</h1>");
// });
//check per error 500
server.use(interalServerErr);
//check per error 404
server.use(notFound);

//qua sto in ascolto per la porta 3000
server.listen(port, () => {
  console.log("Server del mio blog");
  console.log(`Server running on http://localhost:${port}`);
});
