import PessoaJuridica from "../Modelo/PessoaJuridica.js";
import PessoaJuridicaBD from "../Persistencia/PessoaJuridicaBD.js";

export default class PessoaJuridicaCtrl {

    async gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            
            const dados = requisicao.body;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const email = dados.email;
            const cnpj = dados.cnpj;

            if (nome  && endereco && email && cnpj) {
                const pessoaJuridica = new PessoaJuridica(0, nome, endereco, email, cnpj);

                pessoaJuridica.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        codigo: pessoaJuridica.codigo,
                        mensagem: "Hóspede jurídico gravado com sucesso!!!"
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
                    mensagem: "Informe todos os dados do hóspede jurídico de forma adequada"
                });
            }

        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido!"
            });
        }
    }

    async atualizar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const email = dados.email;
            const cnpj = dados.cnpj;

            if (codigo && nome && email && endereco && cnpj) {
                const pessoaJuridica = new PessoaJuridica(codigo, nome, endereco, email, cnpj);

                pessoaJuridica.atualizar().then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Hóspede jurídico atualizado com sucesso!"
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
                    mensagem: "Informe todos os dados do hóspede jurídico de forma adequada"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido!"
            });
        }
    }

    async excluir(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const pessoaJuridica = new PessoaJuridica(codigo);

            pessoaJuridica.excluir().then(() => {
                resposta.json({
                    status: true,
                    mensagem: "Hóspede jurídico excluído com sucesso!"
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
                mensagem: "Método não permitido!"
            });
        }
    }

    async consultar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "GET") {
            const termo = requisicao.query.termo || "";
            const pessoaJuridica = new PessoaJuridicaBD();

            pessoaJuridica.consultarPJ(termo)
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


}
