
import Telefone from "../Modelo/Telefone.js";
import conectar from "./Conexao.js";


export default class TelefoneDB {

    async incluir(telefone) {

        if (telefone instanceof Telefone) {
            const conexao = await conectar();
            const sql = "INSERT INTO telefone(ddd, numero, codHospede) VALUES(?, ?, ?)";
            const parametros = [
                telefone.ddd,
                telefone.numero,
                telefone.hospede.codigo
            ];
            const resultado = await conexao.query(sql, parametros);
            return await resultado[0].insertId;
        }
    }


    async alterar(telefone) {

        if (telefone instanceof Telefone) {
            const conexao = await conectar();
            const sql = "UPDATE telefone SET ddd =?, numero=?, codHospede=?  WHERE codigo=?"
            const valores = [
                telefone.ddd,
                telefone.numero,
                telefone.hospede.codigo,
                telefone.codigo
            ]
            await conexao.query(sql, valores);

        }
    }

    async excluir(telefone) {
        if (telefone instanceof Telefone) {
          const conexao = await conectar();
      
          // Obtenha o código do hospede associado ao telefone
          const sqlBuscarHospede = "SELECT codHospede FROM telefone WHERE codigo=?";
          const [rows] = await conexao.query(sqlBuscarHospede, [telefone.codigo]);
      
          if (rows.length > 0) {
            const codHospede = rows[0].codHospede;
      
            // Excluir o telefone
            const sqlExcluirTelefone = "DELETE FROM telefone WHERE codigo=?";
            await conexao.query(sqlExcluirTelefone, [telefone.codigo]);
      
            // Verificar se o hospede tem mais telefones, se não tiver, exclua o hospede
            const sqlContarTelefones = "SELECT COUNT(*) AS total FROM telefone WHERE codHospede=?";
            const [result] = await conexao.query(sqlContarTelefones, [codHospede]);
      
            if (result[0].total === 0) {
                const sqlExcluirHospede = "DELETE FROM hospede WHERE codigo=?";
                await conexao.query(sqlExcluirHospede, [codHospede]);
            }
          }
        }
      }
      

      async consultar(termo) {
        const listaTelefone = [];
        const conexao = await conectar();
        const sql = `
          SELECT
            h.codigo AS codigoHospede,
            h.nome,
            t.codigo AS codigo,
            t.ddd,
            t.numero
          FROM
            hospede h
          LEFT JOIN
            telefone t ON h.codigo = t.codHospede
          WHERE
            h.nome LIKE ?
        `;
        const parametros = ['%' + termo + '%'];
      
        const [rows] = await conexao.query(sql, parametros);
      
        for (const row of rows) {
          if (row.codigo !== null) {
            const hospedeFormatado = {
              codigo: row.codigo,
              ddd: row.ddd,
              numero: row.numero,
              codigoHospede: row.codigoHospede,
              nome: row.nome
            };
            listaTelefone.push(hospedeFormatado);
          }
        }
      
        return listaTelefone;
      }
      
    

    async consultarCodigo(codigo) {
        const conexao = await conectar();
        const sql = "SELECT * FROM telefone WHERE codigo = ?";
        const parametros = [codigo]; 
        const [rows] = await conexao.query(sql, parametros);

        const listaTelefone = [];
      
        for(const row of rows){
            const  telefone = new Telefone(row['codigo'], row['ddd'], row['numero'], row['codHospede']);
            listaTelefone.push(telefone);
        }
        
        return listaTelefone;
    }


}