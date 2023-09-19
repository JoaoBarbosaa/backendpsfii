import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth.jsx";
import "./styles.css"

const LoginPage = () => {
    const { authenticated, login } = useContext(AuthContext);

    const [cpf, setCpf] = useState("");
    const [senha, setsenha] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("submait", { cpf, senha });

        login(cpf, senha);
    }

    return (
        <div id="login">
            <h1 className="title">Login do Sistema</h1>
            <p>{String(authenticated)}</p>
            <form action="form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="cpf">CPF</label>
                    <input
                        type="text"
                        name="cpf"
                        id="cpf"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        placeholder="Digite seu CPF"
                    />
                </div>
                <div className="field">
                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        name="senha"
                        id="senha"
                        value={senha}
                        onChange={(e) => setsenha(e.target.value)}
                        placeholder="Digite sua senha"
                    />
                </div>
                <div className="actions">
                    <button type="submit">Entrar</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;