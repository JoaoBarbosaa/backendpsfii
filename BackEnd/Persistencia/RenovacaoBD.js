import conectar from "./Conexao.js";
import Renovacao from "../Modelo/Renovacao.js";
import Pessoa from "../Modelo/Pessoa.js";

export default class RenovacaoBD{

    async gravar(emprestimo) {
        if (emprestimo instanceof Renovacao) {
            const conexao = await conectar();

            try {
                const sql = "INSERT INTO emprestimo(dataEmprestimo, cpfPessoa) VALUES(?,?)";
                const valores = [emprestimo.dataEmprestimo, emprestimo.pessoa.cpf];
                const resultado = await conexao.query(sql, valores)

                emprestimo.codigo = resultado[0].insertId

                for (const item of emprestimo.listaExemplares) {
                    const sql2 = "INSERT INTO emprestimo_exemplar(codigoEmprestimo, codigoExemplar) VALUES(?,?)"
                    const parametros = [emprestimo.codigo, item.exemplar.codigo]
                    await conexao.query(sql2, parametros)
                }
            } catch (erro) {
                await conexao.rollback()
                throw erro
            }

            await conexao.commit()
        }
    }


    async alterar(emprestimo) {
        if (emprestimo instanceof Renovacao) {
            const conexao = await conectar();
    
            try {
                // Atualiza os dados do empréstimo na tabela 'emprestimo'
                const sql = "UPDATE emprestimo SET dataEmprestimo = ?, cpfPessoa = ?WHERE codigo = ?";
                const valores = [emprestimo.dataEmprestimo, emprestimo.pessoa.cpf, emprestimo.codigo];
                await conexao.query(sql, valores);
    
                // Remova os registros antigos de empréstimo_exemplar associados a este empréstimo (opcional)
                const sqlExcluirItens = "DELETE FROM emprestimo_exemplar WHERE codigoEmprestimo = ?";
                await conexao.query(sqlExcluirItens, [emprestimo.codigo]);
    
                // Insere os novos registros de empréstimo_exemplar com base na lista atualizada
                for (const item of emprestimo.listaExemplares) {
                    const sqlInserirItem = "INSERT INTO emprestimo_exemplar(codigoEmprestimo, codigoExemplar) VALUES(?,?)";
                    const parametros = [emprestimo.codigo, item.exemplar.codigo];
                    await conexao.query(sqlInserirItem, parametros);
                }
            } catch (erro) {
                await conexao.rollback();
                throw erro;
            }
            await conexao.commit();;
        }
    }
    

    async excluir(emprestimo) {
        if (emprestimo instanceof Renovacao) {
            const conexao = await conectar();
    
            try {
                // Excluir os itens da tabela emprestimo_exemplar relacionados ao empréstimo
                const sqlExemplar = "DELETE FROM emprestimo_exemplar WHERE codigoEmprestimo = ?";
                const valoresExemplar = [emprestimo.codigo];
                await conexao.query(sqlExemplar, valoresExemplar);
    
                // Em seguida, excluir o próprio empréstimo da tabela emprestimo
                const sqlEmprestimo = "DELETE FROM emprestimo WHERE codigo = ?";
                const valoresEmprestimo = [emprestimo.codigo];
                await conexao.query(sqlEmprestimo, valoresEmprestimo);
    
                // Commit apenas se todas as exclusões forem bem-sucedidas
                await conexao.commit();
            } catch (erro) {
                await conexao.rollback();
                throw erro;
            } finally {
;
            }
        }
    }
    


    async consultar() {
        let listaEmprestimos = [];
        const conexao = await conectar();

        const sql = `
          SELECT *
          FROM emprestimo AS e
          INNER JOIN pessoa AS p ON p.cpf = e.cpfPessoa
          WHERE e.codigo IS NOT NULL
          ORDER BY e.codigo`;

        const [emprestimos] = await conexao.query(sql);

        for (const emprestimoData of emprestimos) {
            const pessoa = new Pessoa(emprestimoData['cpfPessoa'], emprestimoData['categoria'], emprestimoData['nome']);
            const emprestimo = new Renovacao(emprestimoData['codigo'], emprestimoData['dataEmprestimo'], pessoa, []);

            const sqlItem = `
            SELECT *
            FROM emprestimo_exemplar AS i
            INNER JOIN exemplar AS ex ON ex.codigo = i.codigoExemplar
            INNER JOIN acervo AS a ON a.codigoRegisto  = ex.codigoAcervo
            WHERE i.codigoEmprestimo = ?`;

            const parametros = [emprestimo.codigo];
            const [itensEmprestimo] = await conexao.query(sqlItem, parametros);

            let listaExemplares = [];

            for (const item of itensEmprestimo) {
                const acervo = {
                    codigo: item['codigoAcervo'],
                    titulo: item['tituloDoLivro']
                };

                const exemplar = {
                    codigo: item['codigoExemplar'],
                    acervo: acervo
                };

                listaExemplares.push({
                    exemplar: exemplar
                });
            }

            emprestimo.listaExemplares = listaExemplares;
            listaEmprestimos.push(emprestimo);
        }

        // Agora você tem a estrutura desejada
        const listaEmprestimosJSON = listaEmprestimos.map((emprestimo) => {
            return {
                codigo: emprestimo.codigo,
                dataEmprestimo: emprestimo.dataEmprestimo,
                pessoa: emprestimo.pessoa,
                listaExemplares: emprestimo.listaExemplares
            };
        });

        return listaEmprestimosJSON;
    }


    async consultarCodigo(codigo) {
        const conexao = await conectar();
        const sql = `
          SELECT *
          FROM emprestimo AS e
          INNER JOIN pessoa AS p ON p.cpf = e.cpfPessoa
          WHERE e.codigo = ?
          ORDER BY e.dataEmprestimo`;
        const parametros = [codigo];
        const [emprestimos] = await conexao.query(sql, parametros);

        const listaEmprestimos = [];

        for (const emprestimoData of emprestimos) {
            const pessoa = new Pessoa(emprestimoData['cpfPessoa'], emprestimoData['categoria'], emprestimoData['nome']);
            const emprestimo = new Renovacao(emprestimoData['codigo'], emprestimoData['dataEmprestimo'], pessoa, []);

            const sqlItem = `
            SELECT *
            FROM emprestimo_exemplar AS i
            INNER JOIN exemplar AS ex ON ex.codigo = i.codigoExemplar
            INNER JOIN acervo AS a ON a.codigo = ex.codigoAcervo
            WHERE i.codigoEmprestimo = ?`;

            const parametrosItem = [emprestimo.codigo];
            const [itensEmprestimo] = await conexao.query(sqlItem, parametrosItem);

            const listaExemplares = [];

            for (const item of itensEmprestimo) {
                const acervo = {
                    codigo: item['codigoAcervo'],
                    titulo: item['tituloDoLivro']
                };

                const exemplar = {
                    codigo: item['codigoExemplar'],
                    acervo: acervo
                };

                listaExemplares.push({
                    exemplar: exemplar
                });
            }

            emprestimo.listaExemplares = listaExemplares;
            listaEmprestimos.push(emprestimo);
        }

        // Estrutura desejada para a resposta
        const resultado = listaEmprestimos.map((emprestimo) => {
            return {
                codigo: emprestimo.codigo,
                dataEmprestimo: emprestimo.dataEmprestimo,
                pessoa: emprestimo.pessoa,
                listaExemplares: emprestimo.listaExemplares
            };
        });

        return resultado;
    }



}