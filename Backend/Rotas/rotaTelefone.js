import { Router } from "express";
import TelefoneCtrl from "../Controle/TelefoneCtrl.js";


const rotaTelefone = new Router();
const telefoneCtrl = new TelefoneCtrl();


rotaTelefone
.post('/', telefoneCtrl.gravar)
.put('/', telefoneCtrl.atualizar)
.delete('/', telefoneCtrl.excluir)
.get('/', telefoneCtrl.consultar)


export default rotaTelefone;