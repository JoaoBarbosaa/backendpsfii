import Hospede from "../Modelo/Hospede.js";
import Telefone from "../Modelo/Telefone.js";


export default class TelefoneCtrl {

	gravar(requisicao, resposta) {
		resposta.type("application/json")

		if (requisicao.method === "POST" && requisicao.is('application/json')) {
			const dados = requisicao.body;

			if (!dados.ddd || !dados.numero || !dados.hospede || !dados.hospede.codigo) {
				resposta.json({
					status: false,
					mensagem: "Dados incompletos. Certifique-se de fornecer ddd, numero e hospede com código."
				});
				return;
			}

			const ddd = dados.ddd;
			const numero = dados.numero;
			const codHospede = dados.hospede.codigo;

			const hospede = new Hospede(codHospede);

			hospede.consultarCodigo(codHospede)
				.then((hospedeEncontrado) => {
					if (hospedeEncontrado && hospedeEncontrado.length > 0) {
						const primeiroHospede = hospedeEncontrado[0];
						const telefone = new Telefone(0, ddd, numero, primeiroHospede);

						telefone.gravar();

						return telefone;
					} else {
						return {
							status: false,
							mensagem: "Hospede não encontrado."
						};
					}
				})
				.then((telefoneGravado) => {
					resposta.json({
						status: true,
						telefone: telefoneGravado
					});
				})
				.catch((erro) => {
					resposta.json({
						status: false,
						mensagem: erro.message
					});
				});

		}
		else {
			resposta.json({
				status: false,
				mensagem: "Hospede não encontrado ou vazio!"
			});
		}
	}


	consultar(requisicao, resposta) {
		resposta.type("application/json");

		if (requisicao.method === "GET") {
			const termo = requisicao.query.termo || "";
			const telefone = new Telefone();

			telefone.consultar(termo)
				.then((exemplares) => {
					resposta.json(exemplares);
				})
				.catch((erro) => {
					resposta.json({
						status: false,
						mensagem: erro.message
					})
				});
		}
		else {
			resposta.status(400).json({
				status: false,
				mensagem: "Requisição invalida! Método não permitido!"
			});
		}
	}

	consultarCodigo(requisicao, resposta) {
		resposta.type("application/json");

		const codigo = requisicao.params.codigo;

		if(requisicao.method === "GET"){
			const telefone = new Telefone();

			telefone.consultarCodigo(codigo)
				.then((telefones) => {
					resposta.json(telefones);
				})
				.catch((erro) => {
					resposta.json({
						status: false,
						mensagem: erro.message
					})
				});
		}
	}

	atualizar(requisicao, resposta) {
		resposta.type("application/json");

		if (requisicao.method === "PUT" && requisicao.is('application/json')) {
			const dados = requisicao.body;

			if (!dados.codigo || !dados.ddd || !dados.numero || !dados.hospede || !dados.hospede.codigo) {
				resposta.json({
					status: false,
					mensagem: "Dados incompletos. Certifique-se de fornecer codigo, ddd, numero e hospede com código."
				});
				return;
			}

			const codigo = dados.codigo;
			const ddd = dados.ddd;
			const numero = dados.numero;
			const codHospede = dados.hospede.codigo;

			const hospede = new Hospede(codHospede);

			hospede.consultarCodigo(codHospede)
				.then((hospedeEncontrado) => {
					if (hospedeEncontrado && hospedeEncontrado.length > 0) {
						const primeiroHospede = hospedeEncontrado[0];
						const telefone = new Telefone(codigo, ddd, numero, primeiroHospede);

						telefone.atualizar()
						.then((telefoneAtualizado) => {
							resposta.json({
								status: true,
								telefone: {
									codigo: telefoneAtualizado.codigo,
									ddd: telefoneAtualizado.ddd,
									numero: telefoneAtualizado.numero,
									hospede: {
										codigo: telefoneAtualizado.hospede.codigo,
										nome: telefoneAtualizado.hospede.nome,
									}
								},
								mensagem: "Telefone atualizado com sucesso!"
							})
						})
						.catch((erro) => {
							resposta.json({
								status: false,
								mensagem: erro.message
							});
						});
						
					} else {
						return {
							status: false,
							mensagem: "Hospede não encontrado."
						};
					}
				})
				.then((telefoneAtualizado) => {
					resposta.json({
						status: true,
						telefone: telefoneAtualizado
					});
				})
				.catch((erro) => {
					resposta.json({
						status: false,
						mensagem: erro.message
					});
				});

		}
		else {
			resposta.json({
				status: false,
				mensagem: "Hospede não encontrado ou vazio!"
			});
		}
	}

	excluir(requisicao, resposta) {
		resposta.type("application/json");

		if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
			const dados = requisicao.body;

			if (!dados.codigo) {
				resposta.json({
					status: false,
					mensagem: "Dados incompletos. Certifique-se de fornecer codigo."
				});
				return;
			}

			const codigo = dados.codigo;

			const telefone = new Telefone(codigo);

			telefone.excluir()
				.then((telefoneExcluido) => {
					resposta.json({
						status: true,
						telefone: telefoneExcluido
					});
				})
				.catch((erro) => {
					resposta.json({
						status: false,
						mensagem: erro.message
					});
				});

		}
		else {
			resposta.json({
				status: false,
				mensagem: "Hospede não encontrado ou vazio!"
			});
		}
	}


}