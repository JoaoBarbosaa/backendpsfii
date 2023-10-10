import { Router } from 'express';
import EmprestimoCTRL from '../Controle/EmprestimoCTRL.js';

const rotaEmprestimo = Router();
const emprestimoCtrl = new EmprestimoCTRL();

rotaEmprestimo.get("/", emprestimoCtrl.consultar)
.post("/", emprestimoCtrl.gravar)
.put("/", emprestimoCtrl.alterar)
.delete("/", emprestimoCtrl.excluir)
.get("/:codigo", emprestimoCtrl.consultar);

export default rotaEmprestimo;