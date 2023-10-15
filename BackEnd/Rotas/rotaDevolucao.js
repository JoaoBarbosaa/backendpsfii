import { Router } from 'express';
import DevolucaoCtrl from '../Controle/DevolucaoCTRL.js';

const rotaDevolucao = Router();
const devolucaoCtrl = new DevolucaoCtrl();

rotaDevolucao.get("/", devolucaoCtrl.consultar)
.post("/", devolucaoCtrl.gravar)
.put("/", devolucaoCtrl.alterar)
.delete("/", devolucaoCtrl.excluir)
.get("/:codigo", devolucaoCtrl.consultar);

export default rotaDevolucao;