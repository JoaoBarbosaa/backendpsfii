import { Form, Button, Container, Row, Col } from "react-bootstrap";
import React, { useState, useRef } from "react";
import { urlBase } from "../utilitarios/definicoes";
import Pagina from "../templates/componentes/Pagina";
import CaixaSelecao from "../componentes/componentes/CaixaSelecao";

export default function FormTelefone(props) {
  const [validado, setValidado] = useState(false);
  const [hospedeSelecionado, setHospedeSelecionado] = useState(0);
  const [telefone, setTelefone] = useState({
    ddd: '',
    numero: '',
    hospede: {
      codigo: 0,
    },
  });
  const teleRef = useRef(null);

  const formatPhone = (value) => {
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");

    return formattedValue;
  };

  const manipulaSubmissao = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidado(true);
    gravarDados();
  };

  function gravarDados() {
    console.log(telefone);
    console.log(hospedeSelecionado);
    fetch(urlBase + "/telefone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ddd: telefone.ddd,
        numero: telefone.numero,
        hospede: {
          codigo: hospedeSelecionado.codigo,
        },
      }),
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        console.log(data);
        window.alert("Telefone(s) cadastrado(s) com sucesso!");
        setTelefone({
          telefones: [],
          hospede: { codigo: hospedeSelecionado },
        });
      })
      .catch((erro) => console.error('Erro ao cadastrar telefone:', erro));
  }


  return (
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
                  value={telefone.codigo}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="FormTelefone">
                <Form.Label>DDD</Form.Label>
                <Form.Control
                  type="text"
                  required
                  id="ddd"
                  placeholder="Digite o DDD"
                  value={telefone.ddd}
                  onChange={(e) =>
                    setTelefone({ ...telefone, ddd: e.target.value })
                  }
                  maxLength={2}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="FormTelefoneNumero">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="(00)00000-0000"
                  onChange={(e) =>
                    setTelefone({
                      ...telefone,
                      numero: formatPhone(e.target.value),
                    })
                  }
                  ref={teleRef}
                  maxLength={11}
                />
                <Form.Control.Feedback type="invalid">
                  Digite um telefone válido!
                </Form.Control.Feedback>

              </Form.Group>
            </Col>

            <Col>
            <Form.Group className="mb-3" controlId="titulo">
              <Form.Label>Selecione o Hóspede:</Form.Label>
              <CaixaSelecao
                enderecoFonteDados={urlBase + "/hospede"}
                campoChave={"codigo"}
                campoExibicao={"nome"}
                funcaoSelecao={setHospedeSelecionado}
                valor={hospedeSelecionado}
                id="telefone"
                required
              />
              <Form.Control.Feedback type='invalid'>Selecione o Hóspede</Form.Control.Feedback>
            </Form.Group>
          </Col>


          </Row>
          <Button type="submit" variant="primary" id="cadastrar">
            Cadastrar
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
  );
}
