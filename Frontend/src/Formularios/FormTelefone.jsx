import { Form, Button, Container, Row, Col } from "react-bootstrap";
import React, { useState, useRef } from "react";
import "./estilos/EstiloForm.css";
import { urlBase } from "../utilitarios/definicoes";
import Pagina from "../templates/componentes/Pagina";
export default function FormHospede(props) {
  const [validado, setValidado] = useState(false);
  const [pessoa, setPessoa] = useState(props.pessoa);
  const teleRef = useRef(null);

  const formatPhone = (value) => {
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");

    return formattedValue;
  };


    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    if (elemForm.id === "tipo") {
      setTipoPessoa(e.target.value);
    }
    setPessoa({ ...pessoa, [id]: valor });
  }

  function gravarDados(pessoa) {
    console.log(pessoa);
    console.log(pessoa.rg);
    if (!props.modoEdicao) {
      if (pessoa.tipo === "pessoa fisica") {
        fetch(urlBase + "/hospede", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            numero: pessoa.numero,
          }),
        }).then((resposta) => {
        });
      } else {
        fetch(urlBase + "/hospede", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            numero: pessoa.numero,
          }),
        }).then((resposta) => {
        });
      }
    } else {
      if(pessoa.tipo === "pessoa fisica"){
        fetch(urlBase + "/hospede", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            numero: pessoa.numero,
          }),
        }).then((resposta) => {
          window.alert("Atualizado com sucesso!");
        });
      }else{
        fetch(urlBase + "/hospede", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            numero: pessoa.numero,
          }),
        }).then((resposta) => {
          window.alert("Atualizado com sucesso!");
        });
      }



      }
     
  }

    <body id="corpo">
      <Container className="background mb-3">
        <Form
          noValidate
          validated={validado}
          onSubmit={manipulaSubmissao}
          className="mainForm"
        >
          <h1 className="text-center TituloTabela">Cadastro de Numero</h1>
          <Row>
            <Col md={2}>
              <Form.Group>
                <Form.Label htmlFor="codigo" className="form-label">
                  Codigo
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Automático"
                  id="codigo"
                  disabled
                  value={pessoa.codigo}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="FormTelefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  required
                  id="telefones"
                  placeholder="(00)00000-0000"
                  value={pessoa.telefones?.numero}
                  onChange={manipularMudanca}
                  ref={teleRef}
                  maxLength={11}
                />
                <Form.Control.Feedback type="invalid">
                  Digite um telefone valido!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" variant="primary" id="cadastrar">
            {props.modoEdicao ? "Atualizar" : "Cadastrar"}
          </Button>{" "}
          <Button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              props.exibirTabela(true);
              props.setModoEdicao(false);
            }}
          >
            Voltar
          </Button>{" "}
        </Form>
      </Container>
    </body>

