import Pagina from "../templates/componentes/Pagina.js";
import FormAutor from "../Formularios/FormAutores.jsx";
import TabelaAutores from "../tabelas/TabelaAutores.jsx";
import { useState, useEffect } from "react";
import "../tabelas/estilos/tabela.css";
import { urlBase } from "../utilitarios/definicoes.js";
import {Spinner} from "react-bootstrap"

export default function TelaCadastroAutor(props){
    const [exibirTabela, setExibirTabela] = useState(true);
    const [autores, setAutores] = useState ([]);
    const [modoEdicao, setModoEdicao] = useState (false);
    const [erro, setErro] = useState(null);
    const [processado, setProcessado] = useState (false);
    const [autorEmEdicao, setAutorEmEdicao] = useState (
        {
            codigo:0,
            nome:"",
            nacionalidade:""
        }
    );

    function prepararAutorParaEdicao(autor){
        setModoEdicao(true);
        setAutorEmEdicao(autor);
        setExibirTabela(false);

    }


    function apagarAutor(autor){
        fetch(urlBase+"/autor", {
            method: "DELETE",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(autor)
        }).then((resposta) =>{
            return resposta.json()
        }).then((retorno) => {
            if(retorno.resultado){
                alert("Não foi possível excluir o autor")
            }
            else{
                buscarAutor()
            }
        })
    }


    function buscarAutor(){
        fetch(urlBase + "/autor", {
            method: "GET"
        }).then((resposta)=>{
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)){
                setProcessado(true);
                setAutores(dados);
            }
            else{
                setProcessado(true)
                setErro(dados.status)
            }
        });
    }

    useEffect(() =>{
        buscarAutor();
    },[])

    if (erro){
        return <div>
            <p>Erro ao obter os autores do Backend : {erro.message}</p>
        </div>
    }else if (!processado){
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando Autores...</span>
        </Spinner>
    }
    else{
        return <Pagina>
        <div>
        {
            exibirTabela ? 
            <TabelaAutores listaAutores={autores} 
            setModoEdicao={setModoEdicao}
            buscar={buscarAutor}
            setAutores={setAutores}
            exibirTabela={setExibirTabela}
            editarAutor={prepararAutorParaEdicao}
            excluirAutor={apagarAutor}
            /> 
            :
            <FormAutor listaAutores={autores} 
            setAutores={setAutores}
            exibirTabela={setExibirTabela}
            buscar={buscarAutor}
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
            autor={autorEmEdicao}
            />
        }
        </div>
    </Pagina>
    }
}