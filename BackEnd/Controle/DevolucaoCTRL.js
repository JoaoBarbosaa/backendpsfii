import Devolucao from "../Modelo/Devolucao.js";
import Exemplar from "../Modelo/Exemplar.js";
import Pessoa from "../Modelo/Pessoa.js";
import ItemDevolvido from "../Modelo/itemDevolvido.js";

export default class DevolucaoCtrl {

    gravar(requisicao, resposta) {
      resposta.type("application/json");
  
      if (requisicao.method == "POST" && requisicao.body) {
  
        const dados = requisicao.body;
        const dataDevolucao = dados.dataDevolucao;
        const cpfPessoa = dados.pessoa.cpf;
        const pessoa = new Pessoa(cpfPessoa);
        const listaExemplar = dados.listaExemplares
  
        const listaDevolucoes = [];
  
        for (const item of listaExemplar) {
          const exemplar = new Exemplar(item.exemplar.codigo)
          const itemDevolvido = new ItemDevolvido(exemplar)
          listaDevolucoes.push(itemDevolvido)
        }
        const devolucao = new Devolucao(0, dataDevolucao, pessoa, listaDevolucoes)
        devolucao.gravar().then(() => {
          resposta.json({
            status: true,
            mensagem: "Devolução cadastrada com sucesso!"
          })
        }).catch(erro => {
          resposta.json({
            status: false,
            mensagem: "Erro ao registrar a devolução: " + erro.message
          })
        })
      } else {
        resposta.json({
          status: false,
          mensagem: "Requisição inválida"
        })
      }
    }
  
    async alterar(requisicao, resposta) {
      resposta.type("application/json");
  
      if (requisicao.method === "PUT" && requisicao.body) {
        const dados = requisicao.body;
        const codigo = dados.codigo;
        const dataDevolucao = dados.dataDevolucao;
        const cpfPessoa = dados.pessoa.cpf;
        const pessoa = new Pessoa(cpfPessoa);
        const listaExemplar = dados.listaExemplares
  
        const listaDevolucoes = [];
  
        for (const item of listaExemplar) {
          const exemplar = new Exemplar(item.exemplar.codigo);
          const itemDevolvido = new ItemDevolvido(exemplar);
          listaDevolucoes.push(itemDevolvido);
        }
  
        const devolucao = new Devolucao(codigo, dataDevolucao, pessoa, listaDevolucoes);
  
        try {
          await devolucao.alterar();
          resposta.json({
            status: true,
            mensagem: "Devolução atualizada com sucesso!"
          });
        } catch (erro) {
          resposta.json({
            status: false,
            mensagem: "Erro ao atualizar a devolução: " + erro.message
          });
        }
      } else {
        resposta.json({
          status: false,
          mensagem: "Requisição inválida"
        });
      }
    }
  
    consultar(requisicao, resposta) {
      resposta.type("application/json");
  
      if (requisicao.method == "GET" && requisicao.params) {
  
        const codigo = requisicao.params.codigo;
        const devolucao = new Devolucao()
        if (codigo) {
  
          devolucao.consultarCodigo(codigo)
            .then((devolucoes) => {
              resposta.json(devolucoes)
            }).catch(erro => {
              resposta.json({
                status: false,
                mensagem: "Erro ao consultar devoluções: " + erro.message
              })
            })
        } else {
          devolucao.consultar()
            .then((devolucoes) => {
              resposta.json(devolucoes)
            }).catch(erro => {
              resposta.json({
                status: false,
                mensagem: "Erro ao consultar devoluções: " + erro.message
              })
            })
        }
      } else {
        resposta.json({
          status: false,
          mensagem: "Requisição inválida!"
        })
      }
    }
  
    excluir(requisicao, resposta) {
      resposta.type("application/json");
  
      if (requisicao.method == "DELETE" && requisicao.is('application/json')){
  
        const dados = requisicao.body;
        const codigo = dados.codigo;
        const devolucao = new Devolucao(codigo);
        
        devolucao.excluir().then(() => {
          resposta.json({
            status: true,
            mensagem: "Devolução excluída com sucesso!"
          })
        }
        ).catch(erro => {
          resposta.json({
            status: false,
            mensagem: "Erro ao excluir devolução: " + erro.message
          })
        })
      }
    }
  }