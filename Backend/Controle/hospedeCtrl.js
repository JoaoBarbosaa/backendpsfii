import Hospede from "../Modelo/Hospede.js";
import PessoaFisica from "../Modelo/PessoaFisica.js";
import PessoaJuridica from "../Modelo/PessoaJuridica.js";
import HospedeBD from "../Persistencia/HospedeBD.js";

export default class HospedeCTRL {


    async gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "POST") {
            const hospede = new Hospede();
            const dados = requisicao.body;

            if (dados.tipo === "pessoa fisica") {
                hospede.pessoa = new PessoaFisica(
                    0,
                    dados.nome,
                    dados.email,
                    dados.endereco,
                    dados.cpf,
                    dados.rg
                );
            } else {
                hospede.pessoa = new PessoaJuridica(
                    0,
                    dados.nome,
                    dados.email,
                    dados.endereco,
                    dados.cnpj
                );
            }

            hospede.gravar()
                .then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Hóspede gravado com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido!"
            });
        }
    }

    
    async consultar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "GET") {
            const termo = requisicao.query.termo || "";
            const hospede = new Hospede(); // Use a mesma instância

            hospede.consultar(termo)
                .then((hospedes) => {
                    resposta.json(hospedes);
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido!"
            });
        }
    }

    async consultarCodigo(requisicao, resposta) {
        resposta.type("application/json");
        const codigo = requisicao.params['codigo'];

        if (requisicao.method === "GET") {
            const hospede = new Hospede();
            hospede.consultarCodigo(codigo).then((hospede) => {
                resposta.json(hospede);
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido!"
            });
        }
    }


}