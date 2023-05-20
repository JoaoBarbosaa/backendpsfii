import Pagina from "../templates/componentes/Pagina.js";
import FormAutor from "../Formularios/FormAutores.jsx";
import TabelaAutores from "../tabelas/TabelaAutores.jsx";
import listaAutores from "../dados/monkAutores.js";
import { useState } from "react";
export default function TelaCadastroAluno(props){
    const [exibirTabela, setExibirTabela] = useState(true);
    const [autores, setAutores] = useState (listaAutores);
    return (
            <Pagina>
                <div>
                {
                    exibirTabela ? 
                    <TabelaAutores listaAutores={autores} 
                    setAutores={setAutores}
                    exibirTabela={setExibirTabela}/> 
                    :
                    <FormAutor listaAutores={autores} 
                    setAutores={setAutores}
                    exibirTabela={setExibirTabela}/>
                }
                </div>
            </Pagina>
    );
}