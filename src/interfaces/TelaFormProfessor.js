import Pagina from "../templates/componentes/Pagina.js";
import FormProfessor from "../Formularios/FormProfessor.jsx";
export default function TelaCadastroPessoa(props){
    return (
        <div>
            <Pagina>
                <FormProfessor></FormProfessor>
            </Pagina>
        </div>
    );
}