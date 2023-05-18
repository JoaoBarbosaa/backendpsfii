import { Cabecalho } from "./Cabecalho.js";
import Menu from "./Menu.js";

export default function Pagina(props){
    return (
        <div>
            <Cabecalho texto='Quintal da Leitura'></Cabecalho>
            <Menu></Menu>
            {props.children}
        </div>
    );
}