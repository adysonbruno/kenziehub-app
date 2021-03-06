import styled from "styled-components";

export const Container = styled.div`
  
  background-color: var(--white);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 250px;
  padding: 16px;
  box-shadow: 0 4px 4px rgba(0,0,0,0.3);
  border: 1px solid var(--black);
  color: var(--black);
  
  hr{
    width: 80%;
    margin-top: 16px;
    margin-bottom: 16px;
  }
  
  button{
    display:flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    align-self: flex-end;
    padding: 20px 0;
  }
  
  svg{
    font-size: 1.1rem;
    color: var(--orange);
    margin-right: 4px;
    transform: translateY(3px); 
  }

  span{
    font-size: 2.5rem;
  }

  p{
    font-size: 2rem;
  }
`