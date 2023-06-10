import Usuario from "../Modelo/Usuario.js";

export default class UsuarioCTRL{

    gravar(requisicao,resposta){
        resposta.type("application/json");

        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const senha = dados.senha;

            if( cpf && nome && senha)
            {
                const usuario = new Usuario(cpf,nome,senha);
                usuario.gravar().then(()=>{
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
            const nome = dados.nome;
            const senha = dados.senha;
            if(cpf && nome && senha)
            {
                const usuario = new Usuario(cpf,nome,senha);
                usuario.atualizar().then(()=>{
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
                const usuario = new Usuario(cpf);
                usuario.removerDoBancoDeDados().then(()=>{
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
            const usuario = new Usuario();
            usuario.consultar('').then((usuarios)=>{
                    resposta.status(200).json(usuarios);
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
            const usuario = new Usuario();
            usuario.consultarCPF(cpf).then((usuario)=>{
                    resposta.status(200).json(usuario);
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
            const usuario = new Usuario();
            usuario.consultarNome(nome).then((usuarios)=>{
                    resposta.status(200).json(usuarios);
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