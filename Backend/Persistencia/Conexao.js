import mysql from 'mysql2/promise';
import HospedeBD from './HospedeBD';

export default async function conectar(){

    if(global.conexao && global.conexao.status != "disconnected"){
        return global.conexao;
    }

    const conexao = await mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"mydb"
    });


    global.conexao = conexao;

return conexao;
}
