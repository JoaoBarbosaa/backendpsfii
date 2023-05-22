import Pagina from "../templates/componentes/Pagina.js";
import FormFuncionario from "../Formularios/FormFuncionario.jsx";
import TabelaFuncionarios from "../tabelas/TabelaFuncionarios.jsx";
import listaFuncionarios from "../dados/monkFuncionarios.js";
import { useState } from "react";


export default function TelaCadastroFuncionario(props){

    const [exibirTabela, setExibirTabela] = useState(true);
    const [funcionarios, setFuncionario] = useState(listaFuncionarios);
    
    return (
            <Pagina>
                <div>
                    {
                        exibirTabela ? 
                        <TabelaFuncionarios listaFuncionarios={funcionarios} 
                                     setFuncionario={setFuncionario}
                                     exibirTabela={setExibirTabela}/> 
                        : 
                        <FormFuncionario listaFuncionarios={funcionarios}
                                   setFuncionario={setFuncionario} 
                                   exibirTabela={setExibirTabela}/>
                    }
                </div>
            </Pagina>       
    );
}