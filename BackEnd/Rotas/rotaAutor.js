import { Router } from "express";
import AutorCTRL from "../Controle/autorCTRL.js";

const rotaAutor = new Router();
const autorCTRL = new AutorCTRL();


rotaAutor
.post("/", autorCTRL.gravar)
.put("/", autorCTRL.atualizar)
.delete("/", autorCTRL.excluir)
.get("/", autorCTRL.consultar)
.get('/buscar/:nome', autorCTRL.consultarNome)
.get("/:codigo", autorCTRL.consultarPeloCodigo);

export default rotaAutor;
