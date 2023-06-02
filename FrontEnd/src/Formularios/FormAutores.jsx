import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./estilos/FormAutor.css";

export default function FormAutor(props) {
  const [validado, setValidado] = useState(false);
  const [autor, setAutor] = useState({
    cod: "",
    nome: "",
    nacionalidade: "",
  });

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setAutor({ ...autor, [id]: valor });
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      let autores = props.listaAutores;
      autores.push(autor);
      props.setAutores(autores);
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
        <h1 className="text-center colorWhite">Cadastro de Autor</h1>
        <Form
          noValidate
          validated={validado}
          onSubmit={manipulaSubmissao}
          className="mainForm"
        >
          <Form.Group className="mb-3" controlId="CodForm">
            <Form.Label>Codigo do Autor</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Digite o código do Autor"
              value={autor.cod}
              id="cod"
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback type="invalid">
              Digite um código valido
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="NomeForm">
            <Form.Label>Nome do Autor</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Digite o nome do Autor"
              value={autor.nome}
              id="nome"
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback type="invalid">
              Digite um nome valido
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label> Nacionalidade </Form.Label>
            <Form.Control
              type="text"
              value={autor.nacionalidade}
              className="form-control"
              id="nacionalidade"
              placeholder="Digite a nacionalidade"
              onChange={manipularMudanca}
              required
            />
            <Form.Control.Feedback type="invalid">
              Digite uma nacionalidade valida
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
