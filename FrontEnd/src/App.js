import TelaMenu from "./interfaces/TelaMenuSistema.js";
import TelaCadastroPessoa from "./interfaces/TelaCadastroPessoa.jsx";
import TelaCadastroCategoria from "./interfaces/TelaFormCategoria.js"
import Tela404 from "./interfaces/Tela404.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaCadastroLivro from "./interfaces/TelaCadastroLivro.jsx";
import TelaCadastroAutor from "./interfaces/TelaFormAutor.js";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/cadastroPessoa" element={<TelaCadastroPessoa />} />
          <Route path="/cadastroCategoria" element={<TelaCadastroCategoria />} />
          <Route path="/cadastroLivro" element={<TelaCadastroLivro />} />
          <Route path="/cadastroAutor" element={<TelaCadastroAutor />} />
          <Route path="/" element={<TelaMenu></TelaMenu>}></Route>
          <Route path="*" element={<Tela404></Tela404>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
