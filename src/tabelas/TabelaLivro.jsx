import { useState } from "react";
import { Button, Table, Container, Row, Form, Col } from "react-bootstrap";
import listaLivros from "../dados/monkLivros";
import "./estilos/tabela.css";

export default function TabelaLivro(props){
    
    const [livros, setLivros] = useState(props.listaLivros)

    function excluirLivro(codigo){
        const listaAtualizada = props.listaLivros.filter((livro) => 
        livro.codigo !== codigo);
        props.setLivros(listaAtualizada);
        setLivros(listaAtualizada)
    }

    function filtrarLivros(e){
        const termoBusca = e.currentTarget.value;
        const resultadoBusca = props.listaLivros.filter((livro) => livro.tituloDoLivro.toLowerCase().includes(termoBusca.toLowerCase()))
        setLivros(resultadoBusca)
    }

    return (
        <>  <body id="corpo" className="colorwhite">
                <Container className="border mb-2 mt-2 corpoTabela" >
                <h2 className="text-center m-4 ">Livros Cadastrados</h2>
                <Row className='mb-2 mt-2 '>
                    <Col>
                        <Button variant="success" onClick={()=>{props.exibirTabela(false)}}>
                            Cadastrar
                        </Button>
                    </Col>
                    <Col className="d-flex justify-content-end md-2 ">
                        <Form className="d-flex mb-2 mt-2">
                        <Form.Control type="text" id="termoBusca" onChange={filtrarLivros} placeholder="Pesquisar"/>

                        </Form>
                    </Col>
                </Row>
                    
                    
                <Table striped bordered hover>
                <thead className="colorWhite">
                    <tr >
                    <th>Codigo</th>
                    <th>Titulo Do Livro</th>
                    <th>Editora</th>
                    <th>Categoria</th>
                    <th>Edição</th>
                    <th>Assunto</th>
                    <th>Ano de Publicação</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        livros?.map((livro) => {
                            return <tr  key={livro.codigo}>
                                <td id="colorwhite">{livro.codigo}</td>
                                <td id="colorwhite">{livro.tituloDoLivro}</td>
                                <td id="colorwhite">{livro.editora}</td>
                                <td id="colorwhite">{livro.categoria}</td>
                                <td id="colorwhite">{livro.edicao}</td>
                                <td id="colorwhite">{livro.assunto}</td>
                                <td id="colorwhite">{livro.anoDePublicacao}</td>
                                <td>
                                    <Button variant="warning"><svg xmlns="http://www.w3.org/2000/svg" 
                                            width="16" height="16" 
                                            fill="currentColor" 
                                            className="bi bi-pencil" 
                                            viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                            </svg>
                                    </Button>{' '}
                                    <Button variant="danger" onClick={()=>{
                                            if (window.confirm('Confirma a exclusão do cliente?')){
                                                    excluirLivro(livro.codigo)}}}>

                                            <svg xmlns="http://www.w3.org/2000/svg" 
                                            width="16" 
                                            height="16" 
                                            fill="currentColor" 
                                            className="bi bi-trash" 
                                            viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                            </svg>
                                    </Button>
                                </td>
                            </tr>
                            
                        })
                    }
                </tbody>
                </Table>
                </Container>
            </body>
        </>
      );
}