import React, {useEffect, useState} from 'react';
import {AnimationContainer, Background, Container, Content} from "./style";
import Button from "../../Components/Button";
import {Link, useHistory, Redirect} from "react-router-dom";
import Input from "../../Components/Input";
import {FiMail, FiLock} from "react-icons/fi"
import {useForm} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
import api from "../../Services/api";
import {toast} from "react-toastify";

const Login = ({isAuthenticated, setIsAuthenticated, setTechs, setUserId}) => {
    const schema = yup.object().shape({
        email: yup.string().email("E-mail inválido!!").required("Campo Obrigatório!!"),
        password: yup.string().min(8, "Mínimo 8 dígitos!!").required("Campo Obrigatório!!"),
    })


    const {register, handleSubmit, formState: {errors}
    } = useForm( {resolver:yupResolver(schema)})

    const history = useHistory()

    const onSubmitFunction = (data) =>{
        api.post("/sessions", data)
            .then( response => {
                const {token, user: {techs, id}} = response.data;
                localStorage.setItem("@Kenziehub:token", JSON.stringify(token));
                localStorage.setItem("@Kenziehub:user", JSON.stringify(techs));
                localStorage.setItem("@Kenziehub:user", JSON.stringify(id));
                setUserId(id)
                setTechs(techs)
                setIsAuthenticated(true);
                return history.push("/dashboard")
            })
            .catch((err) => toast.error("E-mail ou senha inválidos!!"))
    }

    if(isAuthenticated){
        return <Redirect to={"/dashboard"} />
    }

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <form onSubmit={handleSubmit(onSubmitFunction)}>
                        <h1>Login</h1>
                        <Input
                            register={register}
                            name={"email"}
                            label={"E-mail"}
                            icon={FiMail}
                            placeholder={"Seu melhor e-mail"}
                            error = {errors.email?.message}
                        />

                        <Input
                            register={register}
                            name={"password"}
                            label={"Senha"}
                            icon={FiLock}
                            type={"password"}
                            placeholder={"Uma senha bem segura"}
                            error = {errors.password?.message}
                        />
                        <Button type={"submit"} >Enviar</Button>
                        <p> Não tem uma conta? Faça seu <Link to={"/signup"}>cadastro</Link></p>
                    </form>
                </AnimationContainer>
            </Content>
            <Background/>
        </Container>
    );
};

export default Login;
