import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./estilos/EstiloForm.css";
import { urlBase } from "../utilitarios/definicoes";

export default function FormAutor(props) {
  const [validado, setValidado] = useState(false);
  const [autor, setAutor] = useState(props.autor);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setAutor({ ...autor, [id]: valor });
  }

  function gravar(autor){
    if(!props.modoEdicao){
      fetch(urlBase+"/autor",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(autor),
      }).then((resposta) =>{
        window.alert('Autor gravador com sucesso!')
      })
    }else{
      fetch(urlBase+"/autor",{
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(autor),
      }).then((reposta) => {
        window.alert("Autor atualizado com sucesso")
      })
    }
  }

  function manipular(evento){
    const form = evento.currentTarget;
    if(!form.checkValidity()){
      evento.preventDefault();
      evento.stopPropagation();
    }else{
      gravar(autor)
    }
    setValidado(true);
    return false;
  }

  return (
    <body id="corpo">
      <Container className="background mb-3">
        <h1 className="text-center colorWhite">Cadastro de Autor</h1>
        <Form
          id="formAutor"
          noValidate
          validated={validado}
          onSubmit={manipular}
          className="mainForm"
        >
          <Form.Group className="mb-3" controlId="CodigoForm">
            <Form.Label>Codigo do Autor</Form.Label>
            <Form.Control
              type="text"
              placeholder="O sistema gera o código automaticamente"
              value={autor.codigo}
              id="codigo"
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

          <Form.Group className="mb-3" controlId="NacionalidadeForm">
            <Form.Label>Nacionalidade</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Digite a nacionalidade"
              value={autor.nacionalidade}
              id="nacionalidade"
              onChange={manipularMudanca}
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
                props.setModoEdicao(false);
              }}
            >
              Voltar
            </Button>

            <Button type="submit" className="botao" id="cadastrar">{props.modoEdicao ? "Atualizar" : "Cadastrar"}
            </Button>
          </div>
        </Form>
      </Container>
    </body>
  );
}
