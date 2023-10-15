import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Formulario from "../Formularios/FormRenovarEmprestimo.jsx";
import { urlBase } from "../utilitarios/definicoes.js";
import TabelaEmprestimo from "../tabelas/TabelaRenovacao.jsx";
import Pagina from "../templates/componentes/Pagina.js";
import { set } from "react-hook-form";


export default function TelaFormRenovacao(props) {

    const [exibirTabela, setExibirTabela] = useState(true);
    const [renovacao, setRenovacao] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [erro, setErro] = useState(null);
    const [processado, setProcessado] = useState(false);
    
    function apagarRenovacao(renovacao) {
        fetch(urlBase + "/renovacao", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(renovacao),
        })
            .then((resposta) => {
                return resposta.json();
            })
            .then((retorno) => {
                if (retorno.resultado) {
                    alert("Não foi possível excluir o empréstimo");
                } else {
                    buscarRenovacao();
                }
            });
    }

    function buscarRenovacao() {
        fetch(urlBase + "/renovacao", {
            method: "GET"
        })
            .then((resposta) => {
                return resposta.json();
            })
            .then((dados) => {
                if (Array.isArray(dados)) {
                    setProcessado(true);
                    setRenovacao(dados);
                } else {
                    setProcessado(true);
                    setErro(dados.status);
                }
            });
    }

    useEffect(() => {
        buscarRenovacao();
    }, []); 

    if (erro) {
        return (
            <div>
                <p>Erro ao obter os empréstimos do Backend: {erro.message}</p>
            </div>
        );
    } else if (!processado) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Carregando empréstimos...</span>
            </Spinner>
        );
    } else {
        return (
            <Pagina>
                <div>
                    {exibirTabela ? (
                        <TabelaEmprestimo
                            listaEmprestimos={emprestimos}
                            exibirTabela={setExibirTabela}
                            excluirEmprestimo={apagarEmprestimo}
                            setModoEdicao={setModoEdicao}
                            buscar={buscarEmprestimos}
                            setEmprestimos={setEmprestimos}
                            buscarEmprestimos={buscarEmprestimos} 
                        />
                    ) : (
                        <Formulario
                            listaEmprestimos={emprestimos}
                            setEmprestimos={setEmprestimos}
                            exibirTabela={setExibirTabela}
                            buscar={buscarEmprestimos}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                        />
                    )}
                </div>
            </Pagina>
        );
    }
}
