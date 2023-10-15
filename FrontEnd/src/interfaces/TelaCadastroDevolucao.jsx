import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Formulario from "../Formularios/FormDevolucao.jsx";
import { urlBase } from "../utilitarios/definicoes.js";
import TabelaDevolucao from "../tabelas/TabelaDevolucao.jsx";
import Pagina from "../templates/componentes/Pagina.js";
import { set } from "react-hook-form";

export default function TelaDevolucao(props) { //ver se alterei nos outros

    const [exibirTabela, setExibirTabela] = useState(true);
    const [devolucoes, setDevolucoes] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [erro, setErro] = useState(null);
    const [processado, setProcessado] = useState(false);

    function apagarDevolucao(devolucao) {
        fetch(urlBase + "/devolucao", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(devolucao),
        })
            .then((resposta) => {
                return resposta.json();
            })
            .then((retorno) => {
                if (retorno.resultado) {
                    alert("Não foi possível excluir o registro da devolução!");
                } else {
                    buscarDevolucoes();
                }
            });
    }

    function buscarDevolucoes() {
        fetch(urlBase + "/devolucao", {
            method: "GET"
        })
            .then((resposta) => {
                return resposta.json();
            })
            .then((dados) => {
                if (Array.isArray(dados)) {
                    setProcessado(true);
                    setDevolucoes(dados);
                } else {
                    setProcessado(true);
                    setErro(dados.status);
                }
            });
    }

    useEffect(() => {
        buscarDevolucoes();
    }, []);

    useEffect(() => {
        if (exibirTabela) {
            buscarDevolucoes();
        }
    }, [exibirTabela]);

    if (erro) {
        return (
            <div>
                <p>Erro ao obter as devoluções: {erro.message}</p>
            </div>
        );
    } else if (!processado) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Carregando...</span>
            </Spinner>
        );
    } else {
        return (
            <Pagina>
                <div>
                    {exibirTabela ? (
                        <TabelaDevolucao 
                            listaDevolucoes={devolucoes} 
                            exibirTabela={setExibirTabela}
                            excluirDevolucao={apagarDevolucao}
                            setModoEdicao={setModoEdicao}
                            buscar={buscarDevolucoes}
                            setDevolucoes={setDevolucoes}
                            buscarDevolucoes={buscarDevolucoes}
                        />
                    ) : (
                        <Formulario
                            listaDevolucoes={devolucoes} 
                            setDevolucoes={setDevolucoes}
                            exibirTabela={setExibirTabela}
                            buscar={buscarDevolucoes}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                        />
                    )}
                </div>
            </Pagina>
        );
    }
}
