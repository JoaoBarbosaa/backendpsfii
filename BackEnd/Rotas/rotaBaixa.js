import { Router } from "express";
import BaixaCTRL from "../Controle/BaixaCTRL.js";


const rotaBaixa = new Router();
const baixaCtrl = new BaixaCTRL();


rotaBaixa.post('/', baixaCtrl.gravar)
.delete('/', baixaCtrl.excluir)
.get('/', baixaCtrl.consultar)
// .get('/buscar/:titulo', exemplarCtrl.consultarExemplar)
//.get('/:codigo', baixaCtrl.consultarCodigo);

export default rotaBaixa;