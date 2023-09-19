import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { urlBase } from "../contexts/../utilitarios/definicoes.js"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user");
        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser));
        }
        setLoading(false);
    }, []);

    // const login = (cpf, passowrd) => {

    //     console.log("login auth", { cpf, passowrd });

    //     //api criar uma sessão 
    //     const loggerUser = { id: "123", cpf };

    //     localStorage.setItem("user", JSON.stringify(loggerUser)); //string 

    //     if(passowrd === "secret") {
    //         setUser({ id:"123", cpf });
    //         navigate("/");
    //     }

    // };

    const login = async (cpf, senha) => {

        const response = await fetch(`${urlBase}/usuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cpf, senha }),
        });

        const loggerUser = await response.json();

        localStorage.setItem("user", JSON.stringify(loggerUser)); //string

        setUser(loggerUser);
        navigate("/");
    }

        const logout = () => {
            console.log("logout");
            localStorage.removeItem("user");
            setUser(null);
            navigate("/login");
        };

        return (
            <AuthContext.Provider
                value={{ authenticated: !!user, user, loading, login, logout }}>
                {children}
            </AuthContext.Provider>
        );

    };

