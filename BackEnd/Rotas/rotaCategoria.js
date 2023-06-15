import { Router } from "express";
import CategoriaCTRL from "../Controle/categoriaCtrl.js";

const rotaCategoria = new Router();
const categoriaCtrl = new CategoriaCTRL();


rotaCategoria
.post('/', categoriaCtrl.gravar)
.put('/', categoriaCtrl.atualizar)
.delete('/', categoriaCtrl.exluir)
.get('/', categoriaCtrl.consultar)
.get('/buscar/:tituloCategoria', categoriaCtrl.consultarCategoria)
.get('/:codigo', categoriaCtrl.consultarPeloCodigo);

export default rotaCategoria;