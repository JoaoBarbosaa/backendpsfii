import FormLivro from "../Formularios/FormLivro.jsx";
import Pagina from "../templates/componentes/Pagina.js";
import Rodape from "../templates/componentes/Rodape.js";


export default function TelaCadastroLivro(props){
    return (
        <div>
            <Pagina></Pagina>
            <FormLivro />
            <Rodape></Rodape>
        </div>
    );
}
