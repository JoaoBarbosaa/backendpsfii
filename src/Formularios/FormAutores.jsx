import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import './estilos/FormAutor.css';



export default function FormProfessor(props) {

  const [validado, setValidado] = useState(false);
  const [aluno, setAluno] = useState({
    ra: "",
    sexo: "",
    nome: "",
    email: "",
    turma: "",
    telefone: "",
    cidade: "",
    endereco: "",
    cep: "",
    dataNasc: ""
  });

  function manipularMudanca(e){
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setAluno({...aluno, [id]:valor})
  }

  function manipulaSubmissao (evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
        let alunos = props.listaAlunos;
        alunos.push(aluno);
        props.setAlunos(alunos);
        props.exibirTabela(true);
        setValidado(false);
     }
    else{
      setValidado(true)
    }
    evento.preventDefault();
    evento.stopPropagation();
    }
  

  
  return (
    
      <body id="corpo">
        <Container className="background mb-3">
          <h1 className='text-center colorWhite'>Cadastro de Autor</h1>
          <Form noValidate validated={validado} onSubmit={manipulaSubmissao} className='mainForm'>
            <Form.Group className="mb-3" controlId="RAForm">
              <Form.Label>Codigo do Autor</Form.Label>
              <Form.Control type="text" required placeholder="O sistema preenche automaticamente" value={aluno.ra} id="ra" onChange={manipularMudanca} />
              <Form.Control.Feedback type="invalid">
            </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="RAForm">
              <Form.Label>Nome do Autor</Form.Label>
              <Form.Control type="text" required placeholder="Digite o nome do Autor" value={aluno.ra} id="ra" onChange={manipularMudanca} />
              <Form.Control.Feedback type="invalid">
            </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="SexoForm">
              <Form.Label>Sexo</Form.Label>
              <Form.Select value={aluno.sexo} required id="sexo" onChange={manipularMudanca} aria-label="Default select example">
              <option value={setValidado}>Selecione uma das opções</option>
              <option value="1">Masculino</option>
              <option value="2">Feminino</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Selecione seu sexo
            </Form.Control.Feedback>
            </Form.Group>






            
            <div className="botao">
            <Button type="submit" className="botao">Cadastrar</Button>
            
            <Button type="button" onClick={()=>{
              props.exibirTabela(true)
            }}>Voltar</Button>
            </div>
          </Form>
        </Container>
      </body>
  );
}
