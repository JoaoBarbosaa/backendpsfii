import { Router } from "express";
import UsuarioCTRL from "../Controle/usuarioCtrl.js";

const rotaUsuario = new Router();
const usuarioCTRL = new UsuarioCTRL();


rotaUsuario
.post("/", usuarioCTRL.gravar)
.put("/", usuarioCTRL.atualizar)
.delete("/", usuarioCTRL.excluir)
.get("/", usuarioCTRL.consultar)
.get('/buscar/:nome', usuarioCTRL.consultarNome)
.get("/:cpf", usuarioCTRL.consultarPeloCPF);

export default rotaUsuario;
