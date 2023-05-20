import Container from "react-bootstrap/Container";
import "./estilos/Inicio.css";
import imgInicio from "../img/inicioImg.jpg";
export default function Inicio() {
  return (
    <body id="corpo" className="corLetra">
      <h1 className="text-center">Sistema de Gerenciamento Bibliotecário</h1>
      <img className="mx-auto d-block" src={imgInicio}></img>
      <Container>
        <p className="paragrafo">
          O web software QL (Quintal da Leitura), tem como seu objetivo um
          sistema para uma biblioteca de uma escola pu blica, onde irá
          proporcionar o gerenciamento administrativo, relacionado ao seu
          controle t otal sobre o acervo de livros, responsável pelo controle e
          arquivamento de exemplares, com o objetivo de proporcionar
          organização, controle de acesso e registro das operações realizadas.
        </p>
      </Container>
    </body>
  );
}
