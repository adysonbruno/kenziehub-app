import React from 'react';
import {Container} from "./style"
import Button from "../Button";

const Card = ({title, status, onClick}) => {
    return (
        <Container>
            <span>
              {title.length>8?title.slice(0,8)+"...":title}
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
