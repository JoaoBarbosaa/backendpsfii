import {Router} from "express";
import AcervoCtrl from "../Controle/AcervoCtrl.js";

const rotaAcervo = new Router();
const acervoCtrl = new AcervoCtrl();

rotaAcervo.post('/', acervoCtrl.gravar)
.put('/', acervoCtrl.atualizar)
.delete('/', acervoCtrl.excluir)
.get('/', acervoCtrl.consultar)
.get('/buscar/:tituloDoLivro', acervoCtrl.consultarTituloDoLivro)
.get('/:codigoRegisto', acervoCtrl.consultarcodigoRegisto)



export default rotaAcervo;
