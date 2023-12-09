import Hospede from "../Modelo/Hospede.js";
import PessoaFisica from "../Modelo/PessoaFisica.js";
import PessoaFisicaBD from "../Persistencia/PessoaFisicaBD.js";

export default class PessoaFisicaCtrl {


    async gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const email = dados.email;
            const cpf = dados.cpf;
            const rg = dados.rg;

            console.log("Dados recebidos:", dados);

            if (nome && email && endereco && cpf && rg) {
                const pessoaFisica = new PessoaFisica(0, nome, endereco, email, cpf, rg);
                console.log("Pessoa Física a ser gravada:", pessoaFisica);

                pessoaFisica.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        codigo: pessoaFisica.codigo,
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
                mensagem: "Método não permitido!"
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
            const cpf = dados.cpf;
            const rg = dados.rg;

            if (codigo && nome && email && endereco && cpf && rg) {
                const pessoaFisica = new PessoaFisica(codigo, nome, endereco, email, cpf, rg);

                pessoaFisica.atualizar().then(() => {
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

            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados do hóspede de forma adequada"
                });
            }

        }
    }


    async excluir(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {

            const dados = requisicao.body;
            const codigo = dados.codigo;
            const pessoaFisica = new PessoaFisica(codigo);

            pessoaFisica.excluir().then(()=>{
                resposta.json({
                    status:true,
                    mensagem:"Exemplar excluído com sucesso!"
                })
            })
            .catch((erro) => {
                resposta.json({
                    status:false,
                    mensagem: erro
                })
            });
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido! Consulte a documentação API"
            });
        
        }
    }



    async consultar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "GET") {
            const termo = requisicao.query.termo || "";
            const pessoaFisica = new PessoaFisicaBD();

            pessoaFisica.consultarPF(termo)
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