import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./estilos/EstiloForm.css";
import { urlBase } from "../utilitarios/definicoes";

export default function FormCategoria(props) {
  const [validado, setValidado] = useState(false);
  const [categoria, setCategoria] = useState(props.categoria);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setCategoria({ ...categoria, [id]: valor });
  }

  function gravar(categoria){
    if(!props.modoEdicao){
      fetch(urlBase+"/categoria",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoria),
      }).then((resposta) =>{
        window.alert('Categoria gravado com sucesso!')
      })
    }else{
      fetch(urlBase+"/categoria",{
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(categoria),
      }).then((reposta) => {
        window.alert("Categoria atualizado com sucesso")
      })
    }
  }

  function manipular(evento){
    const form = evento.currentTarget;
    if(!form.checkValidity()){
      evento.preventDefault();
      evento.stopPropagation();
    }else{
      gravar(categoria)
    }
    setValidado(true);
    return false;
  }

  return (
    <body id="corpo">
      <Container className="background mb-3">
        <h1 className="text-center colorWhite">Cadastro de Categorias</h1>
        <Form
          id="formCategoria"
          noValidate
          validated={validado}
          onSubmit={manipular}
          className="mainForm"
        >
          <Form.Group className="mb-3" controlId="CodigoForm">
            <Form.Label>Codigo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o código"
              value={categoria.codigo}
              id="codigo"
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback type="invalid">
              Digite um codigo valido
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group className="mb-3" controlId="CategoriaForm">
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