import { Router } from "express";
import PessoaCTRL from "../Controle/pessoaCtrl.js";

const rotaPessoa = new Router();
const pessoaCTRL = new PessoaCTRL();

rotaPessoa
.post('/', pessoaCTRL.gravar)
.put('/', pessoaCTRL.atualizar)
.delete('/', pessoaCTRL.excluir)
.get('/', pessoaCTRL.consultar)
.get('/:cpf', pessoaCTRL.consultarPeloCPF)
.get('/buscar/:nome', pessoaCTRL.consultarNome);

export default rotaPessoa;