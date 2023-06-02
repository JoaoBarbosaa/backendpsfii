import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./estilos/FormPessoa.css";

export default function FormCategoria(props) {
  const [validado, setValidado] = useState(false);
  const [categoria, setCategoria] = useState({
    cod: "",
    categoria: "",
  });

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setCategoria({ ...categoria, [id]: valor });
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      let categorias = props.listaCategorias;
      categorias.push(categoria);
      props.setCategorias(categorias);
      props.exibirTabela(true);
      setValidado(false);
    } else {
      setValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  }

  return (
    <body id="corpo">
      <Container className="background mb-3">
        <h1 className="text-center colorWhite">Cadastro de Categorias</h1>
        <Form
          noValidate
          validated={validado}
          onSubmit={manipulaSubmissao}
          className="mainForm"
        >
          <Form.Group className="mb-3" controlId="AssuntoForm">
            <Form.Label>Codigo</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Digite o código"
              value={categoria.cod}
              id="cod"
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback type="invalid">
              Digite um Código valido
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group className="mb-3" controlId="NomeForm">
            <Form.Label>Categoria do Titulo</Form.Label>
            <Form.Control
              type="text"
              required
              value={categoria.categoria}
              id="categoria"
              onChange={manipularMudanca}
              placeholder="Digite do categoria"
            />
            <Form.Control.Feedback type="invalid">
              Digite uma categoria valida
            </Form.Control.Feedback>
          </Form.Group>



          <div className="botao">
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                props.exibirTabela(true);
              }}
            >
              Voltar
            </Button>
            <Button type="submit" className="botao">
              Cadastrar
            </Button>
          </div>
        </Form>
      </Container>
    </body>
  );
}
