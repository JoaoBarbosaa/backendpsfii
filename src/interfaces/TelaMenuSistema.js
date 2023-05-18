import Pagina from "../templates/componentes/Pagina.js";
import Inicio from "../Paginas/Inicio.jsx"
import Rodape from "../templates/componentes/Rodape.js";

export default function TelaMenu(props){
    return (
        <div>
            <Pagina></Pagina>
            <Inicio></Inicio>
            <Rodape></Rodape>
        </div>
    );
}