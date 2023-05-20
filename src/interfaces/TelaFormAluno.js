import Pagina from "../templates/componentes/Pagina.js";
import FormAluno from "../Formularios/FormAluno.jsx";
import TabelaAlunos from "../tabelas/TabelaAlunos.jsx";
import listaAlunos from "../dados/monkAlunos.js";
import { useState } from "react";
export default function TelaCadastroAluno(props){
    const [exibirTabela, setExibirTabela] = useState(true);
    const [alunos, setAlunos] = useState (listaAlunos);
    return (
            <Pagina>
                <div>
                {
                    exibirTabela ? 
                    <TabelaAlunos listaAlunos={alunos} 
                    setAlunos={setAlunos}
                    exibirTabela={setExibirTabela}/> 
                    :
                    <FormAluno listaAlunos={alunos} 
                    setAlunos={setAlunos}
                    exibirTabela={setExibirTabela}/>
                }
                </div>
            </Pagina>
    );
}