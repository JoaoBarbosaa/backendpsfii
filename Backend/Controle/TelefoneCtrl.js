import Telefone from "../Modelo/Telefone.js";


export default class TelefoneCtrl{


    consultar(requisicao, resposta){
        resposta.type("application/json");

        if(requisicao.method === "GET"){
            const termo = requisicao.query.termo||"";
            const telefone = new Telefone();

            telefone.consultar(termo)
            .then((exemplares)=>{
                resposta.json(exemplares);
            })
            .catch((erro) => {
                resposta.json({
                    status:false,
                    mensagem: erro.message
                })
            });
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Requisição invalida! Método não permitido!"
            });
        }
    }

    
}