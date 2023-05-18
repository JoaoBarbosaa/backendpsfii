import Pagina from "../templates/componentes/Pagina.js";
import FormProfessor from "../Formularios/FormProfessor.jsx";
import Rodape from "../templates/componentes/Rodape.js";
export default function TelaCadastroPessoa(props){
    return (
        <div>
            <Pagina></Pagina>
            <FormProfessor></FormProfessor>
            <Rodape></Rodape>
        </div>
    );
}