import React, {useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {Container, InputContainer, TaskContainer} from "./style"
import Input from "../../Components/Input"
import {useForm} from "react-hook-form";
import {FiEdit2} from "react-icons/all";
import Button from "../../Components/Button";
import Card from "../../Components/Card";
import api from "../../Services/api";
import {toast} from "react-toastify";

const Dashboard = ({isAuthenticated, techs, setTechs, userId}) => {

    const [token] = useState(
        JSON.parse(localStorage.getItem("@Kenziehub:token")) || ""
    );

    const {register, handleSubmit} = useForm();

    const onSubmit = ({title, status}, data) => {
        const techs = {title, status}
        if (!title && !status) {
            return toast.error("Complete o campo para enviar uma tarefa!")
        }
        api.post("/users/techs/", techs,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

        // api.get(`/users/${userId}`, data, {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     }
        //
        // }).then(response => setTechs(response.data.techs))
    }



    const handleDelete = (id, data) => {
        api.delete(`/users/techs/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        // api.get(`/users/${userId}`, data, {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     }
        //
        // }).then(response => setTechs(response.data.techs))
    }

    useEffect((data) => {
        api.get(`/users/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }

        }).then(response => setTechs(response.data.techs))
    }, [onSubmit, handleDelete])

    if (!isAuthenticated) {
        return <Redirect to={"/login"}/>
    }

    return (
        <Container>
            <InputContainer onSubmit={handleSubmit(onSubmit)}>
                <time>
                    23 de maio de 2021
                </time>
                <section>
                    <Input
                        icon={FiEdit2}
                        placehold={"Digite o nome da Tecnologia"}
                        register={register}
                        name={"title"}
                    />

                    <Input
                        icon={FiEdit2}
                        placehold={"Digite seu nível nessa tecnologia"}
                        register={register}
                        name={"status"}
                    />
                    <Button type={"submit"}> Adicionar </Button>
                </section>
            </InputContainer>
            <TaskContainer>
                {
                    (techs)?
                    techs.map(tech =>
                        <Card key={tech.id} title={tech.title} date={tech.status}
                              onClick={() => {
                                  handleDelete(tech.id)
                              }}/>
                    ):""}
            </TaskContainer>
        </Container>
    );
};

export default Dashboard;
