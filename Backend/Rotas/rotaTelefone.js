import { Router } from "express";
import TelefoneCtrl from "../Controle/TelefoneCtrl.js";


const rotaTelefone = new Router();
const telefoneCtrl = new TelefoneCtrl();


rotaTelefone.post('/', exemplarCtrl.gravar)
.put('/', exemplarCtrl.atualizar)
.delete('/', exemplarCtrl.excluir)
.get('/', telefoneCtrl.consultar)
// .get('/buscar/:titulo', exemplarCtrl.consultarExemplar)
.get('/:codigo', exemplarCtrl.consultarCodigo);

export default rotaTelefone;