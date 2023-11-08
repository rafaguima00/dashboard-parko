import { Outlet, useNavigate } from "react-router-dom";
import NavigationBar from "./components/navigationBar";
import { Container } from "./style";

const Menu = () => {

    const style = { 
        textDecoration: "none",
        display: "flex",
        flexDirection: "row",
        gap: 16,
        padding: 10
    }

    const styleSelected = {
        textDecoration: "none",
        display: "flex",
        flexDirection: "row",
        gap: 16,
        backgroundColor: "#f4f4f4",
        padding: 10,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    }

    const textSelected = {
        color: "#545454"
    }
    
    const navigate = useNavigate();

    const handleLogout = () => {
        alert("Você saiu da sua conta");

        return navigate("/");
    }

    return (
        <Container>
            <NavigationBar 
                styles={[style, styleSelected]}
                textSelected={textSelected}
                handleLogout={handleLogout} 
            />
            <Outlet />
        </Container>
    )
}

export default Menu;