import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import './estilos/FormProfessor.css';



export default function FormProfessor(props) {

  const [validado, setValidado] = useState(false);
  const [professor, setProfessores] = useState({
    codigo: "",
    sexo: "",
    nome: "",
    email: "",
    telefone: "",
    materia: "",
    cpf: "",
    dataNasc: ""
  });

  function manipularMudanca(e){
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setProfessores({...professor, [id]:valor})
  }

  function manipulaSubmissao (evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
        let professores = props.listaProfessores;
        professores.push(professor);
        props.setProfessores(professores);
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
          <h1 className='text-center colorWhite'>Cadastro de Professores</h1>
          <Form noValidate validated={validado} onSubmit={manipulaSubmissao} className='mainForm'>
            <Form.Group className="mb-3" controlId="CodForm">
              <Form.Label>Codigo de inscrição</Form.Label>
              <Form.Control type="text" required placeholder="Digite o Codigo" value={professor.ra} id="codigo" onChange={manipularMudanca} />
              <Form.Control.Feedback type="invalid">
              Digite um codigo valido!
            </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="SexoForm">
              <Form.Label>Sexo</Form.Label>
              <Form.Select value={professor.sexo} required id="sexo" onChange={manipularMudanca} aria-label="Default select example">
              <option value={setValidado}>Selecione uma das opções</option>
              <option value="1">Masculino</option>
              <option value="2">Feminino</option>
              <option value="3">Indefinido</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Selecione seu sexo
            </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="NomeForm">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control type="text" required value={professor.nome} id="nome" onChange={manipularMudanca} placeholder="Digite o nome completo" />
              <Form.Control.Feedback type="invalid">
              Digite um nome valido!
            </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="EmailForm">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" required value={professor.email} id="email" onChange={manipularMudanca} placeholder="@gmail.com" />
              <Form.Control.Feedback type="invalid">
              Digite um e-mail valido!
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="NumeroTelefone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control type="text" required value={professor.telefone} id="telefone" onChange={manipularMudanca} placeholder="(00)00000-0000" />
              <Form.Control.Feedback type="invalid">
              Digite um telefone valido!
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="MateriaForm">
              <Form.Label>Materia</Form.Label>
              <Form.Control type="text" required value={professor.materia} id="materia" onChange={manipularMudanca} placeholder="Informe uma materia" />
              <Form.Control.Feedback type="invalid">
              Digite uma materia valida!
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="CepForm">
              <Form.Label>CPF</Form.Label>
              <Form.Control type="text" required value={professor.cpf} id="cpf" onChange={manipularMudanca} placeholder="000.000.000-00" />
              <Form.Control.Feedback type="invalid">
              Digite um CPF valido!
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="dataNascForm">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control required value={professor.dataNasc} id="dataNasc" onChange={manipularMudanca} type="date"/>
              <Form.Control.Feedback type="invalid">
              Digite uma data de nascimento valida!
            </Form.Control.Feedback>
            </Form.Group>


            
            <div className="botao" type="submit">
                <Button type="submit" variant="primary" id="cadastrar">Cadastrar</Button>{' '}
                <Button type="button" className="btn btn-secondary" onClick={()=>{props.exibirTabela(true)}}>Voltar</Button>{' '}
            </div>
          </Form>
        </Container>
      </body>
  );
}
