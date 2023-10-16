import { Router } from 'express';
import RenovacaoCTRL from '../Controle/RenovacaoCtrl.js';

const rotaEmprestimo = Router();
const emprestimoCtrl = new RenovacaoCTRL();

rotaEmprestimo.get("/", emprestimoCtrl.consultar)
.post("/", emprestimoCtrl.gravar)
.put("/", emprestimoCtrl.alterar)
.delete("/", emprestimoCtrl.excluir)
.get("/:codigo", emprestimoCtrl.consultar);

export default rotaEmprestimo;