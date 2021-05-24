import React, {useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {Container, InputContainer, TechsContainer} from "./style"
import Input from "../../Components/Input"
import {useForm} from "react-hook-form";
import {FiEdit2} from "react-icons/all";
import Button from "../../Components/Button";
import Card from "../../Components/Card";
import api from "../../Services/api";
import {toast} from "react-toastify";

const Dashboard = ({isAuthenticated, techs, setTechs, userId, setIsAuthenticated}) => {

    const [token] = useState(
        JSON.parse(localStorage.getItem("@Kenziehub:token")) || ""
    );

    const {register, handleSubmit} = useForm();

    const handleAddTech = ({title, status}) => {
        const techs = {title, status}
        if (!title) {
            return toast.error("Complete o campo de título para cadastrar uma tecnologia!!", { position: "bottom-right"})
        }else if(!status){
            return toast.error("Complete o campo de status para cadastrar uma tecnologia!!", { position: "bottom-right"})
        }

        api.post("/users/techs/", techs,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(_ => toast.success("Tecnologia Cadastrada com Sucesso!!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }))
            .catch(r => toast.error("Por favor, verifique se essa tecnologia já foi cadastrada!", { position: "bottom-right"}))
            
    }

    const handleDelete = (id) => {
        api.delete(`/users/techs/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }

    const handleLogout = () =>{
        localStorage.clear();
        setIsAuthenticated(false);
    }

    useEffect((data) => {
        api.get(`/users/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            setTechs(response.data.techs);
            localStorage.setItem("@Kenziehub:techs", JSON.stringify(response.data.techs))   
        })
    }, [])


    useEffect((data) => {
        api.get(`/users/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }

        }).then(response => setTechs(response.data.techs))
    }, [handleAddTech, handleDelete])

    if (!isAuthenticated) {
        return <Redirect to={"/login"}/>
    }

    return (
        <Container>
            <Button type={"submit"}  onClick={() => handleLogout()}> Logout </Button>
            <InputContainer onSubmit={handleSubmit(handleAddTech)}>
                <section>
                    <Input
                        icon={FiEdit2}
                        placeholder={"Digite o nome da Tecnologia"}
                        register={register}
                        name={"title"}
                    />

                    <Input
                        icon={FiEdit2}
                        placeholder={"Digite seu nível nessa tecnologia"}
                        register={register}
                        name={"status"}
                    />
                    <Button type={"submit"}> Adicionar </Button>
                </section>
            </InputContainer>
            <TechsContainer>
                {
                    (techs)?
                    techs.map(tech =>
                        <Card key={tech.id} title={tech.title} status={tech.status}
                              onClick={() => {
                                  handleDelete(tech.id)
                              }}/>
                    ):""}
            </TechsContainer>
        </Container>
    );
};

export default Dashboard;