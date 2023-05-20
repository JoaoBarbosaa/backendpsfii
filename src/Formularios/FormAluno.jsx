import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import './estilos/FormAluno.css';



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
          <h1 className='text-center colorWhite'>Cadastro de Aluno</h1>
          <Form noValidate validated={validado} onSubmit={manipulaSubmissao} className='mainForm'>
            <Form.Group className="mb-3" controlId="RAForm">
              <Form.Label>RA</Form.Label>
              <Form.Control type="text" required placeholder="Digite o RA" value={aluno.ra} id="ra" onChange={manipularMudanca} />
              <Form.Control.Feedback type="invalid">
              Digite um RA valido
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


            <Form.Group className="mb-3" controlId="NomeForm">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" required value={aluno.nome} id="nome" onChange={manipularMudanca} placeholder="Digite o nome completo" />
              <Form.Control.Feedback type="invalid">
              Digite um nome valido
            </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="EmailForm">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" required value={aluno.email} id="email" onChange={manipularMudanca} placeholder="Digite um e-mail" />
              <Form.Control.Feedback type="invalid">
              Digite um e-mail valido
            </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="TurmaForm">
              <Form.Label>Turma</Form.Label>
              <Form.Control type="text" required value={aluno.turma} id="turma" onChange={manipularMudanca} placeholder="Digite a turma do aluno ex 1° Ano - Ensino médio" />
              <Form.Control.Feedback type="invalid">
              Digite uma turma valida
            </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="NumeroTelefone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control type="text" required value={aluno.telefone} id="telefone" onChange={manipularMudanca} placeholder="Digite o numero de telefone" />
              <Form.Control.Feedback type="invalid">
              Digite um telefone valido
            </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="CidadeForm">
              <Form.Label>Cidade</Form.Label>
              <Form.Control type="text" required value={aluno.cidade} id="cidade" onChange={manipularMudanca} placeholder="Digite a Cidade" />
              <Form.Control.Feedback type="invalid">
              Digite uma Cidade valido
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="EnderecoForm">
              <Form.Label>Endereço</Form.Label>
              <Form.Control type="text" required value={aluno.endereco} id="endereco" onChange={manipularMudanca} placeholder="Digite o endereço" />
              <Form.Control.Feedback type="invalid">
              Digite um endereço valido
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="CepForm">
              <Form.Label>CEP</Form.Label>
              <Form.Control type="text" required value={aluno.cep} id="cep" onChange={manipularMudanca} placeholder="Digite o CEP" />
              <Form.Control.Feedback type="invalid">
              Digite um CEP valido
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="dataNascForm">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control required value={aluno.dataNasc} id="dataNasc" onChange={manipularMudanca} type="date"/>
              <Form.Control.Feedback type="invalid">
              Digite uma data de nascimento valida
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
