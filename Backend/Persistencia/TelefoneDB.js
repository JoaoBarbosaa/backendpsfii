
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
            const sql = "DELETE FROM telefone WHERE codigo=?";
            const valores = [telefone.codigo];
            await conexao.query(sql, valores);

        }
    }

    async consultar(termo) {
        const listaHospedes = [];
        const conexao = await conectar();
        const sql = `
                        SELECT
                            h.codigo AS codigoHospede,
                            h.nome,
                            h.endereco,
                            h.email,
                            t.codigo AS codigoTelefone,
                            t.ddd,
                            t.numero
                        FROM
                            hospede h
                        LEFT JOIN
                            telefone t ON h.codigo = t.codHospede
                        WHERE
                            h.nome LIKE ?;
                    `;
        const parametros = ['%' + termo + '%'];
    
        const [rows] = await conexao.query(sql, parametros);
    
        const hospedesMap = new Map();
    
        for (const row of rows) {
            if (!hospedesMap.has(row.codigoHospede)) {
                hospedesMap.set(row.codigoHospede, {
                    codigoHospede: row.codigoHospede,
                    nome: row.nome,
                    endereco: row.endereco,
                    email: row.email,
                    telefones: []
                });
            }
    
            if (row.codigoTelefone) {
                hospedesMap.get(row.codigoHospede).telefones.push({
                    codigoTelefone: row.codigoTelefone,
                    ddd: row.ddd,
                    numero: row.numero
                });
            }
        }
    
        const filteredHospedes = Array.from(hospedesMap.values()).filter(
            hospede => hospede.telefones.length > 0
        );
    
        listaHospedes.push(...filteredHospedes);
    
        return listaHospedes;
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