import { Form, Button, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';



export default function FormLivro(props) {
    const [livro, setLivro] = useState({
        tituloDoLivro : 0,
        autores : "",
        editora : "",
        edicao : "",
        anoPublicacao : "",
        dataAquisicao : ""
    })

    const [valido, setValidated] = useState(false);
  
    function manipulaEvento(evento) {
      const form = evento.currentTarget;
      if (form.checkValidity() === false) {
        evento.preventDefault();
        evento.stopPropagation();
      }
      setValidated(true);
    };

    return(
        <>
            <div className='row justify-content-center align-items-center mt-5'>
                <div className="col-md-6">
                    <Form onoValidate validated={valido} onSubmit={manipulaEvento} className="p-5 border rounded" noValidate>
                    <h3 className="text-center mb-5">Cadastro Exemplar</h3>
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
                                    <Form.Control  type="text" className="form-control" id="tituloDoLivro" required />
                                    <Form.Control.Feedback type='invalid'>Titulo do Livro</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="row mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label htmlFor="autores" className="form-label">Autores</Form.Label>
                                    <Form.Control  type="text" className="form-control" id="autores" required />
                                    <Form.Control.Feedback type='invalid'>Informe Autores</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label htmlFor="editora" className="form-label">Editora</Form.Label>
                                    <Form.Control  type="text" className="form-control" id="editora" required />
                                    <Form.Control.Feedback type='invalid'>Informe Editora</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="row mb-3">
                            <Col>
                                <Form.Group >
                                    <Form.Label htmlFor="edicao" className="form-label">Edição</Form.Label>
                                    <Form.Control  type="text" className="form-control" id="edicao" required />
                                    <Form.Control.Feedback type='invalid'>Informe Edição</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group >
                                    <Form.Label htmlFor="anoPublicacao" className="form-label">Ano Publicacao</Form.Label>
                                    <Form.Control  type="text" className="form-control" id="anoPublicacao" required />
                                    <Form.Control.Feedback type='invalid'>Informe o Ano de Publicação</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group >
                                    <Form.Label htmlFor="dataAquisicao" className="form-label">Data Aquisicao</Form.Label>
                                    <Form.Control  type="text" className="form-control" id="dataAquisicao" required />
                                    <Form.Control.Feedback type='invalid'>Informe a Data de Aquisição</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />

                        <Row className='mb-3'>
                            <div>
                                <Button type="submit" variant="primary" id="cadastrar">Cadastrar</Button>{' '}
                                <Button type="button" className="btn btn-warning" id="atualizar" disabled>Atualizar</Button>{' '}
                                <Button type="button" className="btn btn-danger" id="excluir" disabled>Excluir</Button>{' '}
                                <Button type="button" className="btn btn-secondary" onClick={()=>{props.exibirTabela(true)}}>Voltar</Button>{' '}
                            </div>
                        </Row>
                        
                    </Form>
                </div>   
            </div>    
           
                    

        </>
    )
}