import { Router } from "express";
import ExemplarCTRL from "../Controle/ExemplarCtrl.js";


const rotaExemplar = new Router();
const exemplarCtrl = new ExemplarCTRL();


rotaExemplar.post('/', exemplarCtrl.gravar)
.put('/', exemplarCtrl.atualizar)
.delete('/', exemplarCtrl.excluir)
.get('/', exemplarCtrl.consultar)
// .get('/buscar/:titulo', exemplarCtrl.consultarExemplar)
.get('/:codigo', exemplarCtrl.consultarCodigo);

export default rotaExemplar;