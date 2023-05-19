import Pagina from "../templates/componentes/Pagina.js";
import FormAluno from "../Formularios/FormAluno.jsx";
import TabelaAlunos from "../tabelas/TabelaAlunos.jsx";
import listaAlunos from "../dados/monkAlunos.js";
import { useState } from "react";
export default function TelaCadastroAluno(props){
    const [exibirTabela, setExibirTabela] = useState(true)
    return (
            <Pagina>
                {
                    exibirTabela ? 
                    <TabelaAlunos listaAlunos={listaAlunos} exibirTabela={setExibirTabela}/> 
                    :
                    <FormAluno exibirTabela={setExibirTabela}/>
                }
            </Pagina>
    );
}