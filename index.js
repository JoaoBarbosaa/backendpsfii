import express from "express";
import rotaPessoa from "./Rotas/HospedePessoa.js";
import rotaExemplar from './Rotas/rotaExemplar.js';
import cors from 'cors'

const app = new express();

app.use(cors({origin:"*"}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/pessoas", rotaPessoa);
app.use('/exemplar', rotaExemplar);

app.listen(3020, "localhost", () => {
  console.log("Escutando na porta 3020");
});

