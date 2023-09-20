import { Router } from "express";
import ExemplarCTRL from "../Controle/ExemplarCtrl.js";


const rotaExemplar = new Router();
const exemplarCtrl = new ExemplarCTRL();


rotaExemplar.post('/', exemplarCtrl.gravar)
.put('/', exemplarCtrl.atualizar)
.delete('/', exemplarCtrl.exluir)
.get('/', exemplarCtrl.consultar)
// .get('/buscar/:titulo', exemplarCtrl.consultarExemplar)
// .get('/:codigo', exemplarCtrl.consultarPeloCodigo);

export default rotaExemplar;