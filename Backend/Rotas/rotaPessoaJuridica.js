import { Router } from 'express';
import PessoaJuridicaCtrl from '../Controle/PessoaJuridicaCtrl.js';


const rotaPessoaJuridica = new Router();
const juridicaCtrl = new PessoaJuridicaCtrl();

rotaPessoaJuridica.post('/', juridicaCtrl.gravar)
.put('/', juridicaCtrl.atualizar)
.delete('/', juridicaCtrl.excluir)
.get('/', juridicaCtrl.consultar);

export default rotaPessoaJuridica;