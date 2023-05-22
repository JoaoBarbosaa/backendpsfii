import { Form, Button, Container } from 'react-bootstrap';
import React, { useState } from "react";
import "./estilos/FormFuncionario.css";

export default function FormFuncionario(props) {
    const [validado, setValidado] = useState(false);
    const [funcionario, setFuncionario] = useState({
        cpf: "",
        sexo: "",
        nome: "",
        email: "",
        setor: "",
        cargo: "",
        telefone: "",
        cidade: "",
        endereco: "",
        cep: "",
        dataNasc: "",
    });

    function manipularMudanca(e) {
        const elemForm = e.currentTarget;
        const id = elemForm.id;
        const valor = elemForm.value;
        setFuncionario({ ...funcionario, [id]: valor });
    }

    function manipulaSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            let funcionarios = props.listaFuncionarios;
            funcionarios.push(funcionario);
            props.setFuncionario(funcionarios);
            props.exibirTabela(true);
            setValidado(false);
        } else {
            setValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <body id="corpo">
            <Container className="background mb-3">
                <h1 className="text-center colorWhite">Cadastro de Funcionário</h1>
                <Form
                    noValidate
                    validated={validado}
                    onSubmit={manipulaSubmissao}
                    className="mainForm"
                >
                    <Form.Group className="mb-3" controlId="FormCpfFuncionario">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="000.000.000-00"
                            value={funcionario.cpf}
                            id="cpf"
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe um CPF válido!
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="FormGeneroFuncionario">
                        <Form.Label>Gênero</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            value={funcionario.sexo}
                            id="sexo"
                            onChange={manipularMudanca}
                            required
                        >
                            <option value={setValidado}>Selecione uma das opções</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o gênero!
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="FormNomeFuncionario">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome completo"
                            value={funcionario.nome}
                            id="nome"
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o nome do funcionário!
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="FormEmailFuncionario">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o e-mail"
                            value={funcionario.email}
                            id="email"
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe um e-mail válido!
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="FormSetorFuncionario">
                        <Form.Label>Setor</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o setor do funcionário"
                            value={funcionario.setor}
                            id="setor"
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o setor do funcionário!
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="FormCargoFuncionario">
                        <Form.Label>Cargo</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o cargo do funcionário"
                            value={funcionario.funcao}
                            id="cargo"
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o cargo do funcionário!
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="FormTelefoneFuncionario">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="(00) 00000-0000"
                            value={funcionario.telefone}
                            id="telefone"
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe um telefone válido!
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="FormCidadeFuncionario">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome da cidade"
                            value={funcionario.cidade}
                            id="cidade"
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe a cidade!
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="FormEnderecoFuncionario">
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o endereço"
                            value={funcionario.endereco}
                            id="endereco"
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe um endereço válido!
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="FormCepFuncionario">
                        <Form.Label>CEP</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="00000-000"
                            value={funcionario.cep}
                            id="cep"
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe um CEP válido!
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="FormDataNascFuncionario">
                        <Form.Label>Data de nascimento</Form.Label>
                        <Form.Control
                            type="date"
                            value={funcionario.dataNasc}
                            id="dataNasc"
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe uma data de nascimento válida!
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="botao">
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={() => {
                                props.exibirTabela(true);
                            }}>Voltar</Button>
                        <Button type="submit" className="botao">
                            Cadastrar
                        </Button>
                    </div>
                </Form>
            </Container>
        </body>
    );
}