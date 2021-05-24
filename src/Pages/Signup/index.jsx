import React from 'react';
import {AnimationContainer, Background, Container, Content} from "./style";
import Button from "../../Components/Button";
import {Link, Redirect, useHistory} from "react-router-dom";
import Input from "../../Components/Input";
import {FiUser, FiMail, FiLock} from "react-icons/fi"
import {useForm} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
import api from "../../Services/api";
import {toast} from "react-toastify";

const Signup = ({isAuthenticated}) => {
    const schema = yup.object().shape({
        name: yup.string().required("Campo Obrigatório!!"),
        bio: yup.string().required("Campo Obrigatório!!"),
        contact: yup.string().required("Campo Obrigatório!!"),
        course_module: yup.string().required("Campo Obrigatório!!"),
        email: yup.string().email("E-mail inválido!!").required("Campo Obrigatório!!"),
        password: yup.string().min(8, "Mínimo 8 dígitos!!").required("Campo Obrigatório!!"),
        passwordConfirm: yup.string().oneOf([yup.ref("password"), "Senhas diferentes!!" ]).required("Campo Obrigatório!!")
    })

    const {register, handleSubmit, formState: {errors}
    } = useForm( {resolver:yupResolver(schema)})

    const history = useHistory()


    const onSubmitFunction = ({email, password, name, bio, contact, course_module}) =>{
        const user = {email, password, name, bio, contact, course_module}
        api.post("/users", user)
            .then( _ => {
                toast.success("Sucesso ao criar a conta")
                return history.push("/login")
            })
            .catch((err) => toast.error("Erro ao criar a conta, tente outro e-mail!!"))
    }

    if(isAuthenticated){
        return <Redirect to={"/dashboard"} />
    }

    return (
        <Container>
            <Background/>
            <Content>
                <AnimationContainer>
                    <form onSubmit={handleSubmit(onSubmitFunction)}>
                        <h1>Cadastro</h1>

                        <Input
                            register={register}
                            name={"name"}
                            label={"Nome"}
                            icon={FiUser}
                            placeholder={"Seu nome Completo"}
                            error = {errors.name?.message}
                        />

                        <Input
                            register={register}
                            name={"bio"}
                            label={"Bio"}
                            icon={FiUser} //mudar
                            placeholder={"Conte um pouco sobre você"}
                            error = {errors.bio?.message}
                        />

                        <Input
                            register={register}
                            name={"contact"}
                            label={"Contato"}
                            icon={FiUser} //mudar
                            placeholder={"Qual seu Linkedin?"}
                            error = {errors.contact?.message}
                        />

                    {/* <select {...register("gender")}>
                            <option value="female">female</option>
                            <option value="male">male</option>
                            <option value="other">other</option>
                        </select> */}

                        <Input
                            register={register}
                            name={"course_module"}
                            label={"Módulo do Curso"}
                            icon={FiUser} //mudar
                            placeholder={"Em qual módulo do curso você está?"}
                            error = {errors.course_module?.message}
                        />

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
                        <Input
                            register={register}
                            name={"passwordConfirm"}
                            label={"Confirmação da Senha"}
                            icon={FiLock} type={"password"}
                            placeholder={"Confirmação da senha"}
                            error = {errors.passwordConfirm?.message}
                        />
                        <Button type={"submit"} >Enviar</Button>
                        <p>Já tem uma conta? Faça seu <Link to={"/login"}>login</Link></p>
                    </form>
                </AnimationContainer>
            </Content>
        </Container>
    );
};

export default Signup;