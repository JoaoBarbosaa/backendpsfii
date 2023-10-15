import Emprestimo from "../Modelo/Emprestimo.js";
import Exemplar from "../Modelo/Exemplar.js";
import Pessoa from "../Modelo/Pessoa.js";
import ItemEmprestimo from "../Modelo/itemEmprestimo.js";

export default class EmprestimoCtrl {


    gravar(requisicao, resposta) {
      resposta.type("application/json");
  
      if (requisicao.method == "POST" && requisicao.body) {
  
        const dados = requisicao.body;
        const dataEmprestimo = dados.dataEmprestimo;
        const cpfPessoa = dados.pessoa.cpf;
        const pessoa = new Pessoa(cpfPessoa);
        const listaExemplar = dados.listaExemplares
  
        const listaEmprestimos = [];
  
        for (const item of listaExemplar) {
          const exemplar = new Exemplar(item.exemplar.codigo)
          const itemEmprestimo = new ItemEmprestimo(exemplar)
          listaEmprestimos.push(itemEmprestimo)
        }
        const emprestimo = new Emprestimo(0, dataEmprestimo, pessoa, listaEmprestimos)
        emprestimo.gravar().then(() => {
          resposta.json({
            status: true,
            mensagem: "Emprestimo cadastrado com sucesso!"
          })
        }).catch(erro => {
          resposta.json({
            status: false,
            mensagem: "Erro ao cadastrar emprestimo: " + erro.message
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
        const dataEmprestimo = dados.dataEmprestimo;
        const cpfPessoa = dados.pessoa.cpf;
        const pessoa = new Pessoa(cpfPessoa);
        const listaExemplar = dados.listaExemplares
  
        const listaEmprestimos = [];
  
        for (const item of listaExemplar) {
          const exemplar = new Exemplar(item.exemplar.codigo);
          const itemEmprestimo = new ItemEmprestimo(exemplar);
          listaEmprestimos.push(itemEmprestimo);
        }
  
        const emprestimo = new Emprestimo(codigo, dataEmprestimo, pessoa, listaEmprestimos);
  
        try {
          await emprestimo.alterar();
          resposta.json({
            status: true,
            mensagem: "Emprestimo alterado com sucesso!"
          });
        } catch (erro) {
          resposta.json({
            status: false,
            mensagem: "Erro ao alterar emprestimo: " + erro.message
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
        const emprestimo = new Emprestimo()
        if (codigo) {
  
          emprestimo.consultarCodigo(codigo)
            .then((emprestimos) => {
              resposta.json(emprestimos)
            }).catch(erro => {
              resposta.json({
                status: false,
                mensagem: "Erro ao consultar emprestimo: " + erro.message
              })
            })
        } else {
          emprestimo.consultar()
            .then((emprestimos) => {
              resposta.json(emprestimos)
            }).catch(erro => {
              resposta.json({
                status: false,
                mensagem: "Erro ao consultar emprestimo: " + erro.message
              })
            })
        }
      } else {
        resposta.json({
          status: false,
          mensagem: "Requisição inválida"
        })
      }
    }
  
    excluir(requisicao, resposta) {
      resposta.type("application/json");
  
      if (requisicao.method == "DELETE" && requisicao.is('application/json')){
  
        const dados = requisicao.body;
        const codigo = dados.codigo;
        const emprestimo = new Emprestimo(codigo);
        
        emprestimo.excluir().then(() => {
          resposta.json({
            status: true,
            mensagem: "Emprestimo excluído com sucesso!"
          })
        }
        ).catch(erro => {
          resposta.json({
            status: false,
            mensagem: "Erro ao excluir emprestimo: " + erro.message
          })
        })
      }
    }
  
  }