import Hospede from "../Modelo/Hospede.js";
import PessoaFisica from "../Modelo/PessoaFisica.js";
import PessoaJuridica from "../Modelo/PessoaJuridica.js";

export default class HospedeCTRL {

    //Aplicar pessoa fisica e pessoa juridica
    async gravar(requisicao, resposta) {
        resposta.type("application/json");

        try {
            if (requisicao.method !== "POST" || !requisicao.is('application/json')) {
                throw new Error("Método não permitido ou hóspede não fornecido em formato JSON!");
            }

            const dados = requisicao.body;

            let hospede;

            if (dados.cpf) {
                hospede = new PessoaFisica(dados.codigo, dados.nome, dados.endereco, dados.email, dados.cpf, dados.rg);
                await hospede.gravar();
            } else if (dados.cnpj) {
                hospede = new PessoaJuridica(dados.codigo, dados.nome, dados.telefone, dados.email, dados.endereco, dados.cnpj);
                await hospede.gravar();
            } else {
                hospede = new Hospede(dados.codigo, dados.nome, dados.endereco, dados.email);
                await hospede.gravar();
            }


            resposta.status(200).json({
                status: true,
                mensagem: "Hóspede gravado com sucesso!!!"
            });

        } catch (erro) {
            resposta.status(500).json({
                status: false,
                mensagem: erro.message
            });
        }
    }

    async atualizar(requisicao, resposta) {
        resposta.type("application/json");

        try {
            if (requisicao.method === "PUT" && requisicao.is('application/json')) {
                const dados = requisicao.body;

                if (dados.tipo === "fisica") {
                    const pessoaFisica = new PessoaFisica(dados.codigo, dados.nome, dados.email, dados.telefone, dados.endereco, dados.cpf, dados.rg);
                    await pessoaFisica.atualizar();
                } else if (dados.tipo === "juridica") {
                    const pessoaJuridica = new PessoaJuridica(dados.codigo, dados.nome, dados.email, dados.telefone, dados.endereco, dados.cnpj);
                    await pessoaJuridica.atualizar();
                } else {
                    const hospede = new Hospede(dados.codigo, dados.nome, dados.email, dados.telefone, dados.endereco);
                    await hospede.atualizar();
                }

                resposta.status(200).json({
                    status: true,
                    mensagem: "Hóspede atualizado com sucesso!!!"
                });

            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Método não permitido ou hóspede não fornecido em formato JSON!"
                });
            }
        } catch (erro) {
            resposta.status(500).json({
                status: false,
                mensagem: erro.message
            });
        }
    }

    async excluir(requisicao, resposta) {
        resposta.type("application/json");

        try {
            if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
                const dados = requisicao.body;

                if (dados.tipo === "fisica") {
                    const pessoaFisica = new PessoaFisica(dados.codigo, dados.nome, dados.email, dados.telefone, dados.endereco, dados.cpf, dados.rg);
                    await pessoaFisica.removerDoBancoDeDados();
                } else if (dados.tipo === "juridica") {
                    const pessoaJuridica = new PessoaJuridica(dados.codigo, dados.nome, dados.email, dados.telefone, dados.endereco, dados.cnpj);
                    await pessoaJuridica.removerDoBancoDeDados();
                } else {
                    const hospede = new Hospede(dados.codigo);
                    await hospede.removerDoBancoDeDados();
                }

                resposta.status(200).json({
                    status: true,
                    mensagem: "Hóspede excluído com sucesso!!!"
                });

            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Método não permitido ou hóspede não fornecido em formato JSON!"
                });
            }
        } catch (erro) {
            resposta.status(500).json({
                status: false,
                mensagem: erro.message
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

    async consultarPeloCPF(requisicao, resposta) {
        resposta.type("application/json");

        try {
            const cpf = requisicao.params['cpf'];

            if (requisicao.method === "GET") {
                const hospede = new Hospede();
                const hospedes = await hospede.consultarCPF(cpf);
                resposta.status(200).json(hospedes);
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Método não permitido!"
                });
            }
        } catch (erro) {
            resposta.status(500).json({
                status: false,
                mensagem: erro.message
            });
        }
    }

    async consultarPeloCNPJ(requisicao, resposta) {

        resposta.type("application/json");

        try {
            const cnpj = requisicao.params['cnpj'];

            if (requisicao.method === "GET") {
                const hospede = new Hospede();
                const hospedes = await hospede.consultarCNPJ(cnpj);
                resposta.status(200).json(hospedes);
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Método não permitido!"
                });
            }
        } catch (erro) {
            resposta.status(500).json({
                status: false,
                mensagem: erro.message
            });
        }
    }


}