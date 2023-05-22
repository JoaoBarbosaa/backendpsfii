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
    sexo: "",
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

          <Form.Group className="mb-3" controlId="SexoForm">
            <Form.Label>Sexo</Form.Label>
            <Form.Select
              value={autor.sexo}
              required
              id="sexo"
              onChange={manipularMudanca}
              aria-label="Default select example"
            >
              <option value={setValidado}>Selecione uma das opções</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Selecione seu sexo
            </Form.Control.Feedback>
          </Form.Group>

          <div className="botao">
            <Button variant="secondary"
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
