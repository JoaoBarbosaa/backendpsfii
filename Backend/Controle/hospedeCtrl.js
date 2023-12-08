import Hospede from "../Modelo/Hospede.js";
import PessoaFisica from "../Modelo/PessoaFisica.js";
import PessoaJuridica from "../Modelo/PessoaJuridica.js";

export default class HospedeCTRL {

    //Aplicar pessoa fisica e pessoa juridica
    async gravar(requisicao, resposta) {
        resposta.type("application/json");
    
        if (requisicao.method === "POST" && requisicao.body) {
            const dados = requisicao.body;
    
            // Cria o objeto hospede
            const hospede = new Hospede(0, dados.nome, dados.email, dados.endereco);
    
            // Verifica se o hospede é Pessoa Física
            if (dados.tipo === "pessoa fisica") {
    
                // Configura os dados da pessoa fisica diretamente no objeto hospede
                hospede.cpf = dados.cpf;
                hospede.rg = dados.rg;
    
            } else if (dados.tipo === "pessoa juridica") {
    
                // Configura os dados da pessoa juridica diretamente no objeto hospede
                hospede.cnpj = dados.cnpj;
    
            }
    
            // Insere o hospede
            await hospede.gravar();
    
            // Retorna o status da operação
            resposta.status(200).json({
                status: true,
                mensagem: "Hóspede gravado com sucesso!!!"
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

                if (dados.tipo === "Pessoa Física") {
                    const pessoaFisica = new PessoaFisica(dados.codigo, dados.nome, dados.email, dados.endereco, dados.cpf, dados.rg);
                    await pessoaFisica.removerDoBancoDeDados();
                } else if (dados.tipo === "Pessoa Jurídica") {
                    const pessoaJuridica = new PessoaJuridica(dados.codigo, dados.nome, dados.email, dados.endereco, dados.cnpj);
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