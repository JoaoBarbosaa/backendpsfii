import express from 'express';
import cors from 'cors'
import rotaHospede from "./Rotas/Hospede.js";
import rotaTelefone from './Rotas/rotaTelefone.js';

const app = new express();

app.use(cors({origin:"*"}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/hospede", rotaHospede);
app.use("/telefone", rotaTelefone);


app.listen(3020, "localhost", () => {
  console.log("Escutando na porta 3020");
});

