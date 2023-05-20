import Pagina from "../templates/componentes/Pagina.js";
import FormProfessor from "../Formularios/FormProfessor.jsx";
import TabelaProfessores from "../tabelas/TabelaProfessores.jsx";
import listaProfessores from "../dados/monkProfessores.js";
import { useState } from "react";
export default function TelaCadastroProfessor(props){
    const [exibirTabela, setExibirTabela] = useState(true);
    const [professores, setProfessores] = useState (listaProfessores);
    return (
            <Pagina>
                <div>
                {
                    exibirTabela ? 
                    <TabelaProfessores listaProfessores={professores} 
                    setProfessores={setProfessores}
                    exibirTabela={setExibirTabela}/> 
                    :
                    <FormProfessor listaProfessores={professores} 
                    setProfessores={setProfessores}
                    exibirTabela={setExibirTabela}/>
                }
                </div>
            </Pagina>
    );
}