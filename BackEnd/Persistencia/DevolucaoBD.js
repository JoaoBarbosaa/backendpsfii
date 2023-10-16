import conectar from "./Conexao.js";
import Devolucao from "../Modelo/Devolucao.js";
import Pessoa from "../Modelo/Pessoa.js";

export default class DevolucaoBD{

    async gravar(devolucao) {
        if (devolucao instanceof Devolucao) {
            const conexao = await conectar();

            try {
                const sql = "INSERT INTO devolucao (dataDevolucao, cpfPessoa) VALUES(?,?)";
                const valores = [devolucao.dataDevolucao, devolucao.pessoa.cpf];
                const resultado = await conexao.query(sql, valores)

                devolucao.codigo = resultado[0].insertId

                for (const item of devolucao.listaExemplares) {
                    const sql2 = "INSERT INTO devolucao_exemplar(codigoDevolucao, codigoExemplar) VALUES(?,?)"
                    const parametros = [devolucao.codigo, item.exemplar.codigo]
                    await conexao.query(sql2, parametros)
                }
            } catch (erro) {
                await conexao.rollback()
                throw erro
            }

            await conexao.commit()
        }
    }

    async alterar(devolucao) {
        if (devolucao instanceof Devolucao) {
            const conexao = await conectar();
    
            try {
                const sql = "UPDATE devolucao SET dataDevolucao = ?, cpfPessoa = ? WHERE codigo = ?";
                const valores = [devolucao.dataDevolucao, devolucao.pessoa.cpf, devolucao.codigo];
                await conexao.query(sql, valores);
    
                const sqlExcluirItens = "DELETE FROM devolucao_exemplar WHERE codigoDevolucao = ?";
                await conexao.query(sqlExcluirItens, [devolucao.codigo]);
    
                for (const item of devolucao.listaExemplares) {
                    const sqlInserirItem = "INSERT INTO devolucao_exemplar(codigoDevolucao, codigoExemplar) VALUES(?,?)";
                    const parametros = [devolucao.codigo, item.exemplar.codigo];
                    await conexao.query(sqlInserirItem, parametros);
                }
            } catch (erro) {
                await conexao.rollback();
                throw erro;
            }
            await conexao.commit();;
        }
    }
    

    async excluir(devolucao) {
        if (devolucao instanceof Devolucao) {
            const conexao = await conectar();
    
            try {
                const sqlExemplar = "DELETE FROM devolucao_exemplar WHERE codigoDevolucao = ?";
                const valoresExemplar = [devolucao.codigo];
                await conexao.query(sqlExemplar, valoresExemplar);
    
                const sqlDevolucao = "DELETE FROM devolucao WHERE codigo = ?";
                const valoresDevolucao = [devolucao.codigo];
                await conexao.query(sqlDevolucao, valoresDevolucao);
    
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
        let listaDevolucoes = [];
        const conexao = await conectar();

        const sql = `
          SELECT *
          FROM devolucao AS d
          INNER JOIN pessoa AS p ON p.cpf = d.cpfPessoa
          WHERE d.codigo IS NOT NULL
          ORDER BY d.codigo`;

        const [devolucoes] = await conexao.query(sql);

        for (const devolucaoData of devolucoes) {
            const pessoa = new Pessoa(devolucaoData['cpfPessoa'], devolucaoData['categoria'], devolucaoData['nome']);
            const devolucao = new Devolucao(devolucaoData['codigo'], devolucaoData['dataDevolucao'], pessoa, []);

            const sqlItem = `
            SELECT *
            FROM devolucao_exemplar AS de
            INNER JOIN exemplar AS ex ON ex.codigo = de.codigoExemplar
            INNER JOIN acervo AS a ON a.codigoRegisto  = ex.codigoAcervo
            WHERE de.codigoDevolucao = ?`;

            const parametros = [devolucao.codigo];
            const [itensDevolucao] = await conexao.query(sqlItem, parametros);

            let listaExemplares = [];

            for (const item of itensDevolucao) {
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

            devolucao.listaExemplares = listaExemplares;
            listaDevolucoes.push(devolucao);
        }

        const listaDevolucoesJSON = listaDevolucoes.map((devolucao) => {
            return {
                codigo: devolucao.codigo,
                dataDevolucao: devolucao.dataDevolucao,
                pessoa: devolucao.pessoa,
                listaExemplares: devolucao.listaExemplares
            };
        });

        return listaDevolucoesJSON;
    }


    async consultarCodigo(codigo) {
        const conexao = await conectar();
        const sql = `
          SELECT *
          FROM devolucao AS d
          INNER JOIN pessoa AS p ON p.cpf = d.cpfPessoa
          WHERE d.codigo = ?
          ORDER BY d.dataDevolucao`;
        const parametros = [codigo];
        const [devolucoes] = await conexao.query(sql, parametros);

        const listaDevolucoes = [];

        for (const devolucaoData of devolucoes) {
            const pessoa = new Pessoa(devolucaoData['cpfPessoa'], devolucaoData['categoria'], devolucaoData['nome']);
            const devolucao = new Devolucao(devolucaoData['codigo'], devolucaoData['dataDevolucao'], pessoa, []);

            const sqlItem = `
            SELECT *
            FROM devolucao_exemplar AS de
            INNER JOIN exemplar AS ex ON ex.codigo = de.codigoExemplar
            INNER JOIN acervo AS a ON a.codigo = ex.codigoAcervo
            WHERE de.codigoEmprestimo = ?`;

            const parametrosItem = [devolucao.codigo];
            const [itensDevolucao] = await conexao.query(sqlItem, parametrosItem);

            const listaExemplares = [];

            for (const item of itensDevolucao) {
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

            devolucao.listaExemplares = listaExemplares;
            listaDevolucoes.push(devolucao);
        }

        const resultado = listaDevolucoes.map((devolucao) => {
            return {
                codigo: devolucao.codigo,
                dataDevolucao: devolucao.dataDevolucao,
                pessoa: devolucao.pessoa,
                listaExemplares: devolucao.listaExemplares
            };
        });

        return resultado;
    }
}