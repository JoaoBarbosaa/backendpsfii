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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente est
          laborum ipsam aliquid, aliqua illum quisquam similique ab eveniet
          corrupti! Perspiciatis ipsam mollitia tempora eveniet ipsum
          voluptatem, doloribus facere qui, Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Quaerat modi adipisci provident
          quibusdam pariatur perspiciatis aspernatur voluptates totam? Optio
          corrupti recusandae natus dolorum modi delectus quae aliquam eaque
          aperiam doloremque, Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Similique magni sunt ipsum tempore obcaecati suscipit,
          reiciendis veniam provident velit nemo deleniti modi facilis
          distinctio corrupti quidem, fugit cum quibusdam repellat!, Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Reiciendis ex nobis
          aperiam molestias, neque tempora dolores cum, repellat eius magnam
          sed, doloremque totam commodi minus! Optio mollitia cupiditate
          repellendus numquam.,Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Enim reprehenderit aliquam quos ullam architecto
          unde expedita dolorum impedit vitae consequuntur consequatur ut
          voluptatibus, error sint non! Deleniti beatae ut voluptatem. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Dolorem voluptas
          quasi fugit accusamus nulla, numquam nesciunt repellat. Maiores
          debitis, itaque, distinctio illo, ducimus deleniti expedita provident
          eum quo autem mollitia! Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Pariatur molestias nihil quis quos cum repellat
          distinctio illum perspiciatis magni. Eius officiis sapiente earum
          magni hic non aperiam quo, veniam
        </p>
      </Container>
    </body>
  );
}
