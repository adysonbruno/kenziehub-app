import React from 'react';
import {Container} from "./style"
import Button from "../Button";

const Card = ({title, status, onClick}) => {
    return (
        <Container>
            <span>
              {title}
            </span>
            <hr/>
            <p>
               {status}
            </p>
            <Button onClick={onClick}>Apagar</Button>
        </Container>
    );
};

export default Card;
