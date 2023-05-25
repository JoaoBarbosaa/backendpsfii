import Pagina from "../templates/componentes/Pagina.js";
import FormCategoria from "../Formularios/FormCategoria.jsx";
import TabelaCategoria from "../tabelas/TabelaCategorias.jsx";
import listaCategorias from "../dados/monkCategorias.js";
import { useState } from "react";
export default function TelaCadastroAssunto(props){
    const [exibirTabela, setExibirTabela] = useState(true);
    const [categorias, setCategorias] = useState (listaCategorias);
    return (
            <Pagina>
                <div>
                {
                    exibirTabela ? 
                    <TabelaCategoria listaCategorias={categorias} 
                    setCategorias={setCategorias}
                    exibirTabela={setExibirTabela}/> 
                    :
                    <FormCategoria listaCategorias={categorias} 
                    setCategorias={setCategorias}
                    exibirTabela={setExibirTabela}/>
                }
                </div>
            </Pagina>
    );
}