import TelaMenu from "./interfaces/TelaMenuSistema.js";
import FormProfessor from "./interfaces/TelaFormProfessor.js";
import FormAluno from "./interfaces/TelaFormAluno.js"
import Tela404 from "./interfaces/Tela404.js"
import { BrowserRouter, Routes, Route} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path="/cadastroProfessor" element={<FormProfessor></FormProfessor>}></Route>
              <Route path="/cadastroAluno" element={<FormAluno></FormAluno>}></Route>
              <Route path="/" element={<TelaMenu></TelaMenu>}></Route>
              <Route path="*" element={<Tela404></Tela404>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
