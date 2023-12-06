import Hospede from "../Modelo/Hospede.js";

export default class HospedeCTRL{

    gravar(requisicao,resposta){
        resposta.type("application/json");

        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const rg = dados.rg;
            const email = dados.email;
            const telefone = dados.telefone;
            const endereco = dados.endereco;
            if( cpf && nome && rg && email && telefone && endereco )
            {
                const hospede = new Hospede(0,cpf,nome,rg,email,telefone,endereco);
                hospede.gravar().then(()=>{
                    resposta.status(200).json({
                        status: true,
                        idhospede: hospede.idhospede,
                        mensagem:"Hóspede gravado com sucesso!!!"
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
                    mensagem: "Informe todos os dados do hóspede de forma adequada"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou hóspede não fornecido em formato JSON!"
            });
        }
    }

    atualizar(requisicao,resposta){
        resposta.type("application/json");

        if(requisicao.method === "PUT" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const idhospede = dados.idhospede;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const rg = dados.rg;
            const email = dados.email;
            const telefone = dados.telefone;
            const endereco = dados.endereco;
            if( idhospede && cpf && nome && rg && email && telefone && endereco )
            {
                const hospede = new Hospede(idhospede,cpf,nome,rg,email,telefone,endereco);
                hospede.atualizar().then(()=>{
                    resposta.status(200).json({
                        status: true,
                        mensagem:"Hóspede atualizado com sucesso!!!"
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
                    mensagem: "Informe todos os dados do hóspede de forma adequada"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou hóspede não fornecido em formato JSON!"
            });
        }
    }
    
    excluir(requisicao,resposta){
        resposta.type("application/json");

        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const idhospede = dados.idhospede;
            if(idhospede)
            {
                const hospede = new Hospede(idhospede);
                hospede.removerDoBancoDeDados().then(()=>{
                    resposta.status(200).json({
                        status: true,
                        mensagem:"Hóspede excluído com sucesso!!!"
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
                    mensagem: "Informe todos os dados do hóspede de forma adequada"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou hóspede não fornecido em formato JSON!"
            });
        }
    }

    consultar(requisicao,resposta){
        resposta.type("application/json");

        if(requisicao.method === "GET"){
            const hospede = new Hospede();
            hospede.consultar('').then((hospedes)=>{
                    resposta.status(200).json(hospedes);
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

    consultarPeloCodigo(requisicao,resposta){
        resposta.type("application/json");

        const idhospede = requisicao.params['idhospede'];

        if(requisicao.method === "GET"){
            const hospede = new Hospede();
            hospede.consultarPeloCodigo(idhospede).then((hospede)=>{
                    resposta.status(200).json(hospede);
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
            const hospede = new Hospede();
            hospede.consultarNome(nome).then((hospedes)=>{
                    resposta.status(200).json(hospedes);
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
                mensagem:"Método não permitido, consulte a documentação da API"
            });
        }
    }

    
}