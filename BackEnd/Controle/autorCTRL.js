import Autor from "../Modelo/Autor.js";

export default class AutorCTRL{

    gravar(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const nome = dados.nome;
            const nacionalidade = dados.nacionalidade;
            if(nome && nacionalidade)
            {
                const autor = new Autor(0, nome, nacionalidade);
                autor.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        codigo:autor.codigo,
                        mensagem:"Autor gravado com sucesso!"
                    });
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
                    mensagem: "Informe adequadamente todos os dados de do autor conforme a documentação da API"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou autor no formato JSON não fornecido, Consulte a documentação da API"
            });
        }
    }



    atualizar(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "PUT" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            const nacionalidade = dados.nacionalidade;


            if(codigo && nome && nacionalidade)
            {
                const autor = new Autor(codigo, nome, nacionalidade);
                autor.atualizar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Autor atualizado com sucesso!"
                    });
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
                    mensagem: "Informe adequadamente todos os dados de do Autor conforme a documentação da API"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou Autor no formato JSON não fornecido, Consulte a documentação da API"
            });
        }
    }
    
    excluir(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const codigo = dados.codigo;

            if(codigo)
            {
                const autor = new Autor(codigo);
                autor.remover().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Autor excluído com sucesso!"
                    });
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
                    mensagem: "Informe adequadamente o codigo do autor conforme a documentação da API"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou autor no formato JSON não fornecido, Consulte a documentação da API"
            });
        }
    }



    consultar(requisicao, resposta){
        resposta.type("application/json"); 

        if(requisicao.method === "GET"){
            const autor = new Autor();
            autor.consultar('').then((autores)=>{
                    resposta.status(200).json(autores);
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


    consultarPeloCodigo(requisicao, resposta){
        resposta.type("application/json");
        const codigo = requisicao.params['codigo'];
        if(requisicao.method === "GET"){
            const autor = new Autor();
            autor.consultarCodigo(codigo).then((autores)=>{
                    resposta.status(200).json(autores);
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

    consultarNome(requisicao, resposta){
        resposta.type("application/json");
        const nome = requisicao.params.nome;
        if(requisicao.method === "GET"){
            const autor = new Autor();
            autor.consultarNome(nome).then((autores)=>{
                    resposta.status(200).json(autores);
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