import Pagina from "../templates/componentes/Pagina.js";
import FormAluno from "../Formularios/FormAluno.jsx";
import Rodape from "../templates/componentes/Rodape.js";
export default function TelaCadastroAluno(props){
    return (
        <div>
            <Pagina></Pagina>
            <FormAluno></FormAluno>
            <Rodape></Rodape>
        </div>
    );
}