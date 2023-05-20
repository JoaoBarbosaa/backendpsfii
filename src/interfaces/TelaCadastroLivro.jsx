import FormLivro from "../Formularios/FormLivro.jsx";
import Pagina from "../templates/componentes/Pagina.js";
import Rodape from "../templates/componentes/Rodape.js";
import TabelaLivro from "../tabelas/TabelaLivro.jsx";
import listaLivros from "../dados/monkLivros.js";
import { useState } from "react";


export default function TelaCadastroLivro(props){

    const [exibirTabela, setExibirTabela] = useState(true)
    return (
            <>
                <Pagina>
                    {
                        exibirTabela ? 
                        <TabelaLivro listaLivros={listaLivros} exibirTabela={setExibirTabela}/> 
                        : 
                        <FormLivro exibirTabela={setExibirTabela}/>
                    }
                </Pagina>
                <Rodape></Rodape>
            </>
    );
}
