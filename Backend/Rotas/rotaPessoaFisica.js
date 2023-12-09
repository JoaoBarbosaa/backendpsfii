import { Router } from 'express';
import PessoaFisicaCtrl from '../Controle/PessoaFisicaCtrl.js';



const rotaPessoaFisica = new Router();
const fisicaCtrl = new PessoaFisicaCtrl();

rotaPessoaFisica.post('/', fisicaCtrl.gravar)
.put('/', fisicaCtrl.atualizar)
.delete('/', fisicaCtrl.excluir)
.get('/', fisicaCtrl.consultar);

export default rotaPessoaFisica;