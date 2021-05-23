import {Redirect, useHistory} from "react-router-dom"
import {Container, Content} from "./style"
import Button from "../../Components/Button";

const Home = ({isAuthenticated}) => {

    const history = useHistory();

    const handleNavigation = (path) =>{
        return history.push(path);
    }

    if(isAuthenticated){
        return <Redirect to={"/dashboard"} />
    }

    return (
        <Container>
            <Content>
                <h1>Kenzie<span>Hub</span></h1>
                <div>
                    <Button onClick = {() => handleNavigation("/signup")}  whiteSchema>Cadastre-se</Button>
                    <Button onClick = {() => handleNavigation("/login")}  >Login</Button>
                </div>
            </Content>
        </Container>
    )
}

export default Home;