import Pagina from "../templates/componentes/Pagina.js";
import FormUsuario from "../Formularios/FormUsuario.jsx";
import TabelaUsuarios from "../tabelas/TabelaUsuarios.jsx";
import { useState, useEffect } from "react";
import "../tabelas/estilos/tabela.css";
import { urlBase } from "../utilitarios/definicoes.js";
import {Spinner} from "react-bootstrap"

export default function TelaCadastroUsuario(props){
    const [exibirTabela, setExibirTabela] = useState(true);
    const [usuarios, setUsuarios] = useState ([]);
    const [modoEdicao, setModoEdicao] = useState (false);
    const [erro, setErro] = useState(null);
    const [processado, setProcessado] = useState (false);
    const [usuarioEmEdicao, setUsuarioEmEdicao] = useState (
        {
            cpf:"",
            nome:"",
            senha:""
        }
    );

    function prepararAutorParaEdicao(usuario){
        setModoEdicao(true);
        setUsuarioEmEdicao(usuario);
        setExibirTabela(false);

    }


    function apagarUsuario(usuario){
        fetch(urlBase+"/usuario", {
            method: "DELETE",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(usuario)
        }).then((resposta) =>{
            return resposta.json()
        }).then((retorno) => {
            if(retorno.resultado){
                alert("Não foi possível excluir o usuario")
            }
            else{
                buscarUsuario()
            }
        })
    }


    function buscarUsuario(){
        fetch(urlBase + "/usuario", {
            method: "GET"
        }).then((resposta)=>{
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)){
                setProcessado(true);
                setUsuarios(dados);
            }
            else{
                setProcessado(true)
                setErro(dados.status)
            }
        });
    }

    useEffect(() =>{
        buscarUsuario();
    },[])

    if (erro){
        return <div>
            <p>Erro ao obter os usuarios do Backend : {erro.message}</p>
        </div>
    }else if (!processado){
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando Usuários...</span>
        </Spinner>
    }
    else{
        return <Pagina>
        <div>
        {
            exibirTabela ? 
            <TabelaUsuarios listaUsuarios={usuarios} 
            setModoEdicao={setModoEdicao}
            buscar={buscarUsuario}
            setUsuarios={setUsuarios}
            exibirTabela={setExibirTabela}
            editarUsuario={prepararAutorParaEdicao}
            excluirUsuario={apagarUsuario}
            /> 
            :
            <FormUsuario listaUsuarios={usuarios} 
            setUsuarios={setUsuarios}
            exibirTabela={setExibirTabela}
            buscar={buscarUsuario}
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
            usuario={usuarioEmEdicao}
            />
        }
        </div>
    </Pagina>
    }
}