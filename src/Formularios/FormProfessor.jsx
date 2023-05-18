import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import './estilos/FormProfessor.css';



export default function FormProfessor(props) {

  const [validated, setValidated] = useState(false);
  
  const manipulacaoSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
       event.stopPropagation();
     }
  
    setValidated(true);
  }

  
  return (
    
      <body id="corpo">
        <Container className="background">
          <Form noValidate validated={validated} onSubmit={manipulacaoSubmit} className='mainForm'>


            <Form.Group className="mb-3" controlId="FuncaoForm">
              <Form.Label>Selecione sua função</Form.Label>
              <Form.Select required aria-label="Default select example">
              <option value={setValidated}>Selecione uma das opções</option>
              <option value="1">Professor</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Seleciona uma função
            </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="NomeForm">
              <Form.Label>Nome completo</Form.Label>
              <Form.Control type="text" required placeholder="Digite o nome completo" />
              <Form.Control.Feedback type="invalid">
              Digite um nome valido
            </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="MateriaForm">
              <Form.Label>Matéria</Form.Label>
              <Form.Control type="text" required placeholder="Digite a sua matéria principal" />
              <Form.Control.Feedback type="invalid">
              Digite a matéria principal
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="EmailForm">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" required placeholder="Digite um e-mail" />
              <Form.Control.Feedback type="invalid">
              Digite um e-mail valido
            </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="NumeroTelefone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control type="text" required placeholder="Digite o numero de telefone" />
              <Form.Control.Feedback type="invalid">
              Digite um telefone valido
            </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="CpfForm">
              <Form.Label>CPF</Form.Label>
              <Form.Control type="text" required placeholder="Digite o cpf" />
              <Form.Control.Feedback type="invalid">
              Digite um CPF valido
            </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="DataNascimentoForm">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control required type="date"/>
              <Form.Control.Feedback type="invalid">
              Digite uma data de nascimento valida
            </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="FuncaoForm">
              <Form.Label>Sexo</Form.Label>
              <Form.Select required aria-label="Default select example">
              <option value={setValidated}>Selecione uma das opções</option>
              <option value="1">Masculino</option>
              <option value="2">Feminino</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Selecione seu sexo
            </Form.Control.Feedback>
            </Form.Group>

            
            <div className="botao"><Button type="submit" className="botao">Cadastrar</Button></div>
          </Form>
        </Container>
      </body>
  );
}
