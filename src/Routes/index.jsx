import {Route, Switch} from "react-router-dom"
import Home from "../Pages/Home";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import {useEffect, useState} from "react";

const Routes = () =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userId, setUserId] = useState("")

    const [techs, setTechs] = useState([])

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("@Kenziehub:token"))
        if(token){
            return setIsAuthenticated(true)
        }
    }, [isAuthenticated])

    return (
        <Switch>
            <Route exact path = "/">
                <Home
                    isAuthenticated = {isAuthenticated}
                />
            </Route>
            <Route path = "/signup">
                <Signup
                    isAuthenticated = {isAuthenticated}
                />
            </Route>
            <Route path = "/login">
                <Login
                    isAuthenticated = {isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                    setTechs={setTechs}
                    setUserId = {setUserId}
                />
            </Route>
            <Route path = "/dashboard">
                <Dashboard
                    isAuthenticated = {isAuthenticated}
                    techs={techs}
                    setTechs={setTechs}
                    userId={userId}
                />
            </Route>
        </Switch>
    )
}

export default Routes