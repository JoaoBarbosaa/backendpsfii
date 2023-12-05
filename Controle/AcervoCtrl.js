import Acervo from "../Modelo/Acervo.js";

export default class AcervoCtrl{
    
    gravar(requisicao, resposta){
        resposta.type("application/json")

        if(requisicao.method === "POST" && requisicao.is('application/json')){

            const dados = requisicao.body;
            const tituloDoLivro = dados.tituloDoLivro;
            const editora = dados.editora;
            const edicao = dados.edicao;
            const anoDePublicacao = dados.anoDePublicacao;


            if(tituloDoLivro && editora && edicao && anoDePublicacao ){
                
                const acervo = new Acervo(0,tituloDoLivro, editora, edicao,anoDePublicacao);
                acervo.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        codigoRegisto: acervo.codigoRegisto,
                        mensagem:"Titulo gravado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                })

            } else{
                resposta.status(400).json({
                    status: false,
                    mensagem:"Informe todos os dados do Titulo!"
                })
            }
            
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Metado não permitido ou Titulo no formato json não fornecido!"
            })
        }
    }

    atualizar(requisicao, resposta){
      resposta.type("application/json")

      if(requisicao.method === "PUT" && requisicao.is('application/json')){

          const dados = requisicao.body;
          const codigoRegisto = dados.codigoRegisto;
          const tituloDoLivro = dados.tituloDoLivro;
          const editora = dados.editora;
          const edicao = dados.edicao;
          const anoDePublicacao = dados.anoDePublicacao;
  

          if(codigoRegisto && tituloDoLivro && editora && edicao && anoDePublicacao){
              const acervo = new Acervo(codigoRegisto, tituloDoLivro, editora, edicao,anoDePublicacao);
              
              acervo.atualizar().then(()=>{
                  resposta.status(200).json({
                      status:true,
                      mensagem:"Titulo atualizado com sucesso!!"
                  })
              }).catch((erro) => {
                  resposta.status(500).json({
                      status:false,
                      mensagem: erro.message
                  })
              })

          } else{
              resposta.status(400).json({
                  status: false,
                  mensagem:"Informe todos os dados do Titulo!"
              })
          }
          
      }
      else{
          resposta.status(400).json({
              status:false,
              mensagem:"Metado não permitido ou Titulo no formato json não fornecido!"
          })
      }
    }

    excluir(requisicao, resposta){
      resposta.type("application/json")

      if(requisicao.method === "DELETE" && requisicao.is('application/json')){

        const dados = requisicao.body;
        const codigoRegisto = dados.codigoRegisto;

        if(codigoRegisto){
          const acervo = new Acervo(codigoRegisto);
              
          acervo.removerDoBancoDados().then(()=>{
              resposta.status(200).json({
                  status:true,
                  mensagem:"Titulo excluido com sucesso!!"
              })
          }).catch((erro) => {
              resposta.status(500).json({
                  status:false,
                  mensagem: erro.message
              })
          });

        } else{
            resposta.status(400).json({
                status: false,
                mensagem:"Informe todos os dados do Titulo!"
            })
        }
      
      } else{
          resposta.status(400).json({
              status:false,
              mensagem:"Metado não permitido ou Titulo no formato json não fornecido!"
          })
        }
    }    
    
    consultar(requisicao, resposta){
      resposta.type("application/json")

      if(requisicao.method === "GET"){

        const acervo = new Acervo();

        acervo.consultar('').then((acervo)=>{
            resposta.status(200).json(acervo);
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


    consultarcodigoRegisto(requisicao, resposta){
        resposta.type("application/json")
        const codigoRegisto = requisicao.params['codigoRegisto'];

        if(requisicao.method === "GET"){
            const acervo = new Acervo();
            acervo.consultarcodigoRegisto(codigoRegisto).then((acervo)=>{
                resposta.status(200).json(acervo);

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

    consultarTituloDoLivro(requisicao, resposta){
        resposta.type("application/json")
        const tituloDoLivro = requisicao.params['tituloDoLivro'];

        if(requisicao.method === "GET"){
            const acervo = new Acervo();
            acervo.consultarTituloDoLivro(tituloDoLivro).then((acervo)=>{
                resposta.status(200).json(acervo);

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