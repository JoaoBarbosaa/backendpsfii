import Categoria from '../Modelo/categoria.js';

export default class CategoriaCTRL{

    gravar(requisicao, resposta){
        resposta.type("application/json");

        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const categoria = dados.categoria;
            if(categoria)
            {

                const categoriaObj = new Categoria(0, categoria);

                categoriaObj.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        codigo:categoriaObj.codigo,
                        mensagem:"Categoria gravada com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });
            }
            else
            {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe código da categoria conforme documentação da API!"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou categoria no formato JSON não foi fornecido!"
            });
        }
    }

    atualizar(requisicao, resposta){
        resposta.type("application/json");

        if(requisicao.method === "PUT" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const categoria = dados.categoria;

            if(codigo && categoria)
            {
                const categoriaObj = new Categoria(codigo, categoria);
                categoriaObj.atualizar().then(()=>{
                    resposta.status(200).json({
                       status:true,
                       mensagem:"Categoria atualizada com sucesso!" 
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
                    mensagem:"Informe adequadamente todos os dados da categoria conforme a documentação a API"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou categoria no formato JSON não fornecido, consulte a documentação da API"
            });
        }
    }

    exluir(requisicao, resposta){
        resposta.type("application/json");

        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const codigo = dados.codigo;

            if(codigo)
            {
                const categoria = new Categoria(codigo);
                categoria.remover().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Categoria excluida com sucesso!"
                    });
                }).catch((erro) =>{
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.mensagem
                    })
                });
            }
            else{
                resposta.status(400).json({
                    status:false,
                    mensagem:"Informe adequadamente o codigo da categoria conforme a documentação da API"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou categoria no formato JSON não fornecido, consulte a documentação da API"
            });
        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");

        if(requisicao.method === "GET"){
            const categoria = new Categoria();
            categoria.consultar('').then((categorias)=>{
                resposta.status(200).json(categorias);
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
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

    consultarPeloCodigo(requisicao, resposta){
        resposta.type("application/json");

        const codigo = requisicao.params['codigo'];

        if(requisicao.method === "GET"){
            const categoria = new Categoria();
            categoria.consultarCodigo(codigo).then((categorias)=>{
                resposta.status(200).json(categorias);
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                })
            });
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido! Consulta a documentação API"
            });

        }    
    }

        consultarCategoria(requisicao, resposta){
        resposta.type("application/json")
        const tituloCategoria = requisicao.params['tituloCategoria'];

        if(requisicao.method === "GET"){
            const categoria = new Categoria();
            categoria.consultarCategoria(tituloCategoria).then((categoria)=>{
                resposta.status(200).json(categoria);

        }).catch((erro) => {
            resposta.status(500).json({
                status: false,
                mensagem: erro.message
            })
        });
        } else {
        resposta.status(400).json({
            status:false,
            mensagem:"Método não permitido! Consulte a documentação da API"
        });
        }

    }
}