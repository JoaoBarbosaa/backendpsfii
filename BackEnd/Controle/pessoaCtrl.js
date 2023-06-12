import Pessoa from "../Modelo/Pessoa.js";

export default class PessoaCTRL{

    gravar(requisicao,resposta){
        resposta.type("application/json");

        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const categoria = dados.categoria;
            const nome = dados.nome;
            const sexo = dados.sexo;
            const email = dados.email;
            const telefone = dados.telefone;
            const cidade = dados.cidade;
            const endereco = dados.endereco;
            const cep = dados.cep;
            const dataNasc = dados.dataNasc;
            if( cpf && categoria && nome && sexo && email && telefone && cidade && endereco && cep && dataNasc)
            {
                const pessoa = new Pessoa(cpf,categoria,nome,sexo,email,telefone,cidade,endereco,cep,dataNasc);
                pessoa.gravar().then(()=>{
                    resposta.status(200).json({
                        status: true,
                        mensagem:"Usuário gravado com sucesso!!!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });
            }
            else
            {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados do usuário de forma adequada"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou usuário não fornecido em formato JSON!"
            });
        }
    }

    atualizar(requisicao,resposta){
        resposta.type("application/json");

        if(requisicao.method === "PUT" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const categoria = dados.categoria;
            const nome = dados.nome;
            const sexo = dados.sexo;
            const email = dados.email;
            const telefone = dados.telefone;
            const cidade = dados.cidade;
            const endereco = dados.endereco;
            const cep = dados.cep;
            const dataNasc = dados.dataNasc;
            if(cpf && categoria && nome && sexo && email && telefone && cidade && endereco && cep && dataNasc)
            {
                const pessoa = new Pessoa(cpf,categoria,nome,sexo,email,telefone,cidade,endereco,cep,dataNasc);
                pessoa.atualizar().then(()=>{
                    resposta.status(200).json({
                        status: true,
                        mensagem:"Usuário atualizado com sucesso!!!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });
            }
            else
            {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados do usuário de forma adequada"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou usuário não fornecido em formato JSON!"
            });
        }
    }
    
    excluir(requisicao,resposta){
        resposta.type("application/json");

        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            if(cpf)
            {
                const pessoa = new Pessoa(cpf);
                pessoa.removerDoBancoDeDados().then(()=>{
                    resposta.status(200).json({
                        status: true,
                        mensagem:"Usuário excluído com sucesso!!!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });
            }
            else
            {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o CPF do usuário de forma adequada"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou usuário não fornecido em formato JSON!"
            });
        }
    }

    consultar(requisicao,resposta){
        resposta.type("application/json");

        if(requisicao.method === "GET"){
            const pessoa = new Pessoa();
            pessoa.consultar('').then((pessoas)=>{
                    resposta.status(200).json(pessoas);
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                })
            });
        }  
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido!"
            });
        }
    }

    consultarPeloCPF(requisicao,resposta){
        resposta.type("application/json");

        const cpf = requisicao.params['cpf'];

        if(requisicao.method === "GET"){
            const pessoa = new Pessoa();
            pessoa.consultarCPF(cpf).then((pessoa)=>{
                    resposta.status(200).json(pessoa);
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                })
            });
        }  
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido!"
            });
        }
    }

    consultarNome(requisicao, resposta){
        resposta.type("application/json");
        const nome = requisicao.params.nome;
        if(requisicao.method === "GET"){
            const pessoa = new Pessoa();
            pessoa.consultarNome(nome).then((pessoas)=>{
                    resposta.status(200).json(pessoas);
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.mensagem
                    })
                });
            }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido, Consulte a documentação da API"
            });
        }
    }

    
}