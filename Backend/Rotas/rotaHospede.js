import { Router } from "express";
import HospedeCTRL from "../Controle/hospedeCtrl.js";

const rotaHospede = new Router();
const hospedeCTRL = new HospedeCTRL();

rotaHospede
.post('/', hospedeCTRL.gravar)
// .put('/', hospedeCTRL.atualizar)
// .delete('/', hospedeCTRL.excluir)
.get('/', hospedeCTRL.consultar)
.get('/:codigo', hospedeCTRL.consultarCodigo)


export default rotaHospede;