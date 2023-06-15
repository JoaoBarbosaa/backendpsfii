import Pagina from "../templates/componentes/Pagina.js";
import FormCategoria from "../Formularios/FormCategoria.jsx";
import TabelaCategoria from "../tabelas/TabelaCategorias.jsx";
import { urlBase } from "../utilitarios/definicoes.js";
import "../tabelas/estilos/tabela.css";
import {Spinner} from "react-bootstrap"
import { useState, useEffect } from "react";

export default function TelaCadastroAssunto(props){
    const [exibirTabela, setExibirTabela] = useState (true);
    const [categorias, setCategorias] = useState ([]);
    const [modoEdicao, setModoEdicao] = useState (false);
    const [erro, setErro] = useState(null);
    const [processado, setProcessado] = useState (false);
    const [categoriaEmEdicao, setCategoriaEmEdicao] = useState(
        {
            codigo:0,
            categoria: ""
        }
    );

    function prepararCategoriaParaEdicao(categoria){
        setModoEdicao(true);
        setCategoriaEmEdicao(categoria);
        setExibirTabela(false);
    }

    function apagarCategoria(categoria){
        fetch(urlBase+"/categoria", {
            method: "DELETE",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(categoria)
        }).then((resposta) =>{
            return resposta.json()
        }).then((retorno) => {
            if(retorno.resultado){
                alert("Não foi possível excluir a categoria")
            }
            else{
                buscarCategoria()
            }
        })
    }


    function buscarCategoria(){
        fetch(urlBase + "/categoria", {
            method: "GET"
        }).then((resposta)=>{
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)){
                setProcessado(true);
                setCategorias(dados);
            }
            else{
                setProcessado(true)
                setErro(dados.status)
            }
        });
    }

    useEffect(() =>{
        buscarCategoria();
    },[])

    if (erro){
        return <div>
            <p>Erro ao obter os categorias do Backend : {erro.message}</p>
        </div>
    }else if (!processado){
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando Categorias...</span>
        </Spinner>
    }
    else{
        return <Pagina>
            <div>
            {
                exibirTabela ? 
                <TabelaCategoria listaCategorias={categorias} 
                setModoEdicao={setModoEdicao}
                buscar={buscarCategoria}
                setCategorias={setCategorias}
                exibirTabela={setExibirTabela}
                editarCategoria={prepararCategoriaParaEdicao}
                excluirCategoria={apagarCategoria}
                /> 
                :
                <FormCategoria listaCategorias={categorias} 
                setCategorias={setCategorias}
                exibirTabela={setExibirTabela}
                buscar={buscarCategoria}
                modoEdicao={modoEdicao}
                setModoEdicao={setModoEdicao}
                categoria={categoriaEmEdicao}
                />
            }
            </div>
        </Pagina>
        }
}