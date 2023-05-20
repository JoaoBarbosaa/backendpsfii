import { Cabecalho } from "./Cabecalho.js";
import Menu from "./Menu.js";
import Rodape from "./Rodape.js";

export default function Pagina(props){
    return (
        <div>
            <Cabecalho texto='Quintal da Leitura'></Cabecalho>
            <Menu></Menu>
            {props.children}
            <Rodape></Rodape>
        </div>
    );
}