import Hospede from "../Modelo/Hospede.js";
import HospedePessoaFisica from "../Modelo/HospedeFisico.js";
import HospedePessoaJuridica from "../Modelo/HospedeJuridico.js";
import Telefone from "../Modelo/Telefone.js";

export default class HospedeCTRL {


    async gravar(requisicao, resposta) {
        resposta.type("application/json");
    
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const email = dados.email;
            const endereco = dados.endereco;
            const tipo = dados.tipo;
            
            // Verifica se 'pessoafisica' e 'pessoajuridica' estão presentes
            if ((tipo === "pessoa fisica" && dados.pessoafisica) || (tipo === "pessoa juridica" && dados.pessoajuridica)) {
                const cpfUsuario = tipo === "pessoa fisica" ? dados.pessoafisica.cpf : null;
                const rgUsuario = tipo === "pessoa fisica" ? dados.pessoafisica.rg : null;
                const cnpjUsuario = tipo === "pessoa juridica" ? dados.pessoajuridica.cnpj : null;
    
                if (nome && email && endereco) {
                    const hospede = new Hospede(0, nome, email, endereco);
                    await hospede.gravar();
    
                    const responsePayload = {
                        status: true,
                        codigo: hospede.codigo,
                        mensagem: "Hóspede gravado com sucesso!!!"
                    };
                    if (dados.telefones && dados.telefones.length > 0) {
                        const telefones = dados.telefones.map(telefone => new Telefone(0, telefone.ddd, telefone.numero, hospede));
            
                        try {
                          const promises = telefones.map(telefone => telefone.gravar());
                          await Promise.all(promises);
                        } catch (erro) {
                          resposta.status(500).json({
                            status: false,
                            mensagem: erro.message
                          });
                          return;
                        }
                      }
    
                    if (tipo === "pessoa fisica") {
                        const codHospode = hospede.codigo;
                        const pessoaFisica = new HospedePessoaFisica(cpfUsuario, rgUsuario, codHospode);
                        try {
                            await pessoaFisica.gravar();
                        } catch (erro) {
                            resposta.status(500).json({
                                status: false,
                                mensagem: erro.message
                            });
                            return;
                        }
                    } else if (tipo === "pessoa juridica") {
                        const codHospede = hospede.codigo;
                        const pessoaJuridica = new HospedePessoaJuridica(cnpjUsuario, codHospede);
                        try {
                            await pessoaJuridica.gravar();
                        } catch (erro) {
                            resposta.status(500).json({
                                status: false,
                                mensagem: erro.message
                            });
                            return;
                        }
                    }
    
                    resposta.status(200).json(responsePayload);
                } else {
                    resposta.status(400).json({
                        status: false,
                        mensagem: "Parâmetros inválidos para gravar o hóspede."
                    });
                }
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Parâmetros 'pessoafisica' ou 'pessoajuridica' ausentes para o tipo de hóspede informado."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método ou tipo de conteúdo inválido."
            });
        }
    }
    

    async atualizar(requisicao, resposta) {
        resposta.type("application/json");
    
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            const email = dados.email;
            const endereco = dados.endereco;
            const tipo = dados.tipo;
            const cpfUsuario = tipo === "pessoa fisica" ? dados.pessoafisica.cpf : null;
            const rgUsuario = tipo === "pessoa fisica" ? dados.pessoafisica.rg : null;
            const cnpjUsuario = tipo === "pessoa juridica" ? dados.pessoajuridica.cnpj : null;
    
            if (codigo && nome && email && endereco) {
                const hospede = new Hospede(codigo, nome, email, endereco);
                await hospede.atualizar();
    
                const responsePayload = {
                    status: true,
                    codigo: hospede.codigo,
                    mensagem: "Hóspede atualizado com sucesso!!!"
                };
    
                if (tipo === "pessoa fisica") {
                    const codHospede = hospede.codigo;
                    const pessoaFisica = new HospedePessoaFisica(cpfUsuario, rgUsuario, codHospede);
                    try {
                        await pessoaFisica.atualizar();
                    } catch (erro) {
                        resposta.status(500).json({
                            status: false,
                            mensagem: erro.message
                        });
                        return;
                    }
                } else if (tipo === "pessoa juridica") {
                    const codHospede = hospede.codigo;
                    const pessoaJuridica = new HospedePessoaJuridica(cnpjUsuario, codHospede);
                    try {
                        await pessoaJuridica.atualizar();
                    } catch (erro) {
                        resposta.status(500).json({
                            status: false,
                            mensagem: erro.message
                        });
                        return;
                    }
                }
    
                resposta.status(200).json(responsePayload);
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Parâmetros inválidos para atualizar o hóspede."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método ou tipo de conteúdo inválido."
            });
        }
    }
    
    

    async excluir(requisicao, resposta) {
        resposta.type("application/json");
    
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const hospede = new Hospede(codigo);

            hospede.removerDoBancoDeDados().then(() => {
                resposta.json({
                    status: true,
                    mensagem: "Hóspede excluído com sucesso!"
                });
            }
            ).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });
        }
    }
    


    async consultar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "GET") {
            const termo = requisicao.query.termo || "";
            const hospede = new Hospede(); 

            hospede.consultar(termo)
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