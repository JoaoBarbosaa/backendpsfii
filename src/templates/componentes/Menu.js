import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Image } from 'react-bootstrap';
import Icone from '../../img/icone.png'
import { Link } from 'react-router-dom';
import '../estilos/MenuCss.css'

export default function Menu(props){
    return(
        <Navbar expand="lg">
        <Container fluid >
          <Image src={Icone} width='75' className='icone'></Image>
          <Navbar.Brand href="#"><Link className='linkDeco Menu' to='/'>Menu</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >  
              <NavDropdown title="Cadastros" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#"><Link className='linkDeco' to='/cadastroProfessor'>Cadastro de Professor</Link></NavDropdown.Item>
                <NavDropdown.Item href="#"><Link className='linkDeco' to='/cadastroAluno'>Cadastro de Aluno</Link></NavDropdown.Item>
                <NavDropdown.Item href="#" disabled>Em-breve</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Em-breve
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Pesquisar"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success" className='botão'>Pesquisar</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}