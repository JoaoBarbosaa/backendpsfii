import { Form, Button, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import './estilos/FormLivro.css'



export default function FormLivro(props) {
    const [valido, setValidated] = useState(false);

    const [livro, setLivro] = useState({
        tituloDoLivro : "",
        autores : "",
        editora : "",
        edicao : "",
        anoPublicacao : "",
        dataAquisicao : ""
    })

    function manipularMudanca(e){
        const elemForm = e.currentTarget;
        const id = elemForm.id;
        const valor = elemForm.value;
        setLivro({...livro, [id]:valor});
    }

  
    function manipulaEvento(evento) {
      const form = evento.currentTarget;

      if (form.checkValidity()) {

        let livros = props.listaLivros;
        livros.push(livro);
        props.setLivros(livros);

        props.exibirTabela(true)
        setValidated(false);
      }else{
        setValidated(true);
      }
      
      evento.preventDefault();
      evento.stopPropagation();
    };

    return(
        <>
            <div className='row justify-content-center' id="corpo">
                <div>
                    <Form onoValidate validated={valido} onSubmit={manipulaEvento} className="p-5 border rounded mainForm" noValidate>
                    <h3 className="text-center mb-5 colorWhite">Cadastro Exemplar</h3>
                        <Row className="row mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label htmlFor="codigoRegisto" className="form-label">Codigo Registo</Form.Label>
                                    <Form.Control  type="text" className="form-control" placeholder="Não preencher" id="codigoRegisto" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label htmlFor="tituloDoLivro" className="form-label">Titulo Do Livro</Form.Label>
                                    <Form.Control  type="text" value={livro.tituloDoLivro} className="form-control" id="tituloDoLivro" onChange={manipularMudanca} required />
                                    <Form.Control.Feedback type='invalid'>Titulo do Livro</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="row mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label htmlFor="autores" className="form-label">Autores</Form.Label>
                                    <Form.Control  type="text" value={livro.autores} className="form-control" id="autores" onChange={manipularMudanca} required />
                                    <Form.Control.Feedback type='invalid'>Informe Autores</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label htmlFor="editora" className="form-label">Editora</Form.Label>
                                    <Form.Control  type="text" value={livro.editora} className="form-control" id="editora" onChange={manipularMudanca} required />
                                    <Form.Control.Feedback type='invalid'>Informe Editora</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="row mb-3">
                            <Col>
                                <Form.Group >
                                    <Form.Label htmlFor="edicao" className="form-label">Edição</Form.Label>
                                    <Form.Control  type="text" value={livro.edicao} className="form-control" id="edicao" onChange={manipularMudanca} required />
                                    <Form.Control.Feedback type='invalid'>Informe Edição</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group >
                                    <Form.Label htmlFor="anoPublicacao" className="form-label">Ano Publicacao</Form.Label>
                                    <Form.Control  type="text" value={livro.anoPublicacao} className="form-control" id="anoPublicacao" onChange={manipularMudanca} required />
                                    <Form.Control.Feedback type='invalid'>Informe o Ano de Publicação</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group >
                                    <Form.Label htmlFor="dataAquisicao" className="form-label">Data Aquisicao</Form.Label>
                                    <Form.Control  type="date"s value={livro.dataAquisicao} className="form-control" id="dataAquisicao" onChange={manipularMudanca} required />
                                    <Form.Control.Feedback type='invalid'>Informe a Data de Aquisição</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />

                        <Row className='mb-3 botao'>
                            <div>
                                <Button type="submit" variant="primary" id="cadastrar">Cadastrar</Button>{' '}
                                <Button type="button" className="btn btn-secondary" onClick={()=>{props.exibirTabela(true)}}>Voltar</Button>{' '}
                            </div>
                        </Row>
                        
                    </Form>
                </div>   
            </div>    
           
                    

        </>
    )
}