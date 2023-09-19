import { Form, Button, Container } from 'react-bootstrap';
import React, { useState, useRef } from 'react';
import "./estilos/EstiloForm.css";
import { urlBase } from '../utilitarios/definicoes';
export default function FormUsuario(props) {

  const [validado, setValidado] = useState(false);
  const [usuario, setUsuario] = useState(props.usuario);
  const cpfRef = useRef(null);
  
    const formatCpf = (value) => {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      return formattedValue
    }


  function manipularMudanca(e) {
    const { value } = e.target;
    //Mascaras para os campos de CPF, Telefone e CEP
    const formattedValueCpf = formatCpf(value);
    cpfRef.current.value = formattedValueCpf;
    

    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setUsuario({ ...usuario, [id]: valor });
  }

  function gravar(usuario){
    if(!props.modoEdicao){
      fetch(urlBase+"/usuario",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      }).then((resposta) =>{
        window.alert('Usuário gravador com sucesso!')
      })
    }else{
      fetch(urlBase+"/usuario",{
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(usuario),
      }).then((reposta) => {
        window.alert("Usuário atualizado com sucesso")
      })
    }
  }

  function manipular(evento){
    const form = evento.currentTarget;
    if(!form.checkValidity()){
      evento.preventDefault();
      evento.stopPropagation();
    }else{
      gravar(usuario)
    }
    setValidado(true);
    return false;
  }

  return (

    <body id="corpo">
      <Container className="background mb-3">
        <h1 className='text-center colorWhite'>Cadastro de Usuários</h1>
        <Form noValidate validated={validado} onSubmit={manipular} className='mainForm'>

        <Form.Group className="mb-3" controlId="FormCpf">
            <Form.Label>CPF</Form.Label>
            <Form.Control type="text" required placeholder="000.000.000-00" value={usuario.cpf} id="cpf" onChange={manipularMudanca} ref={cpfRef} maxLength={14} />
            <Form.Control.Feedback type="invalid">
              Digite um CPF valido!
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group className="mb-3" controlId="FormNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" required value={usuario.nome} id="nome" onChange={manipularMudanca} placeholder="Digite o seu nome" />
            <Form.Control.Feedback type="invalid">
              Digite um nome valido!
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group className="mb-3" controlId="FormSenha">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="senha" required value={usuario.senha} id="senha" onChange={manipularMudanca} placeholder="Digite uma senha" minLength={10}/>
            <Form.Control.Feedback type="invalid">
              Digite uma senha valida com pelo menos 10 caracteres!
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