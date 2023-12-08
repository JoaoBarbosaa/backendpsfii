import Hospede from "../Modelo/Hospede.js";
import PessoaFisica from "../Modelo/PessoaFisica.js";
import PessoaJuridica from "../Modelo/PessoaJuridica.js";
import HospedeBD from "../Persistencia/HospedeBD.js";

export default class HospedeCTRL {


    async gravar(requisicao, resposta) {
        resposta.type("application/json");
    
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const email = dados.email;
            const tipo = dados.tipo;
    
            if (nome && email && endereco && tipo) {
                const hospede = new Hospede(0, nome, endereco, email, tipo);
                hospede.gravar(tipo).then(() => {
                    resposta.status(200).json({
                        status: true,
                        codigo: hospede.codigo,
                        mensagem: "Hóspede gravado com sucesso!!!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados do hóspede de forma adequada"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou hóspede não fornecido em formato JSON!"
            });
        }
    }
    


    // Atualizar, excluir e consultar Funcionando
    async atualizar(requisicao, resposta) {
        resposta.type("application/json");
    
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
    
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const email = dados.email;
            const tipo = dados.tipo;
            


            const hospede = new Hospede(codigo, nome, endereco, email);

            if (tipo === "pessoa fisica") {
                const cpf = dados.cpf;
                const rg = dados.rg;
                hospede.cpf = cpf;
                hospede.rg = rg;
            }
            else if (tipo === "pessoa juridica") {
                const cnpj = dados.cnpj;
                hospede.cnpj = cnpj;
            }
    
            hospede.atualizar().then(() => {
                resposta.json({
                    status: true,
                    mensagem: "Hóspede atualizado com sucesso!"
                });
            }
            ).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });
        }
    }
    

    async excluir(requisicao, resposta) {
        resposta.type("application/json");
    
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const hospede = new Hospede(codigo);

            hospede.removerDoBancoDeDados().then(() => {
                resposta.json({
                    status: true,
                    mensagem: "Hóspede excluído com sucesso!"
                });
            }
            ).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
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