import { Cabecalho } from "./Cabecalho.js";
import Menu from "./Menu.js";

export default function Pagina(props){
    return (
        <div>
            <Cabecalho texto='Escola Almeida Prado'></Cabecalho>
            <Menu></Menu>
            {props.children}
        </div>
    );
}