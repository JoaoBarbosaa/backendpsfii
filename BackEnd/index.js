import express from "express";
import rotaAutor from "./Rotas/rotaAutor.js";
import rotaPessoa from "./Rotas/rotaPessoa.js";
import cors from 'cors'
const app = new express();

app.use(cors({origin:"*"}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/autor", rotaAutor);
app.use("/pessoas", rotaPessoa);

app.listen(3020, "localhost", () => {
  console.log("api escurando na posta 3020");
});
