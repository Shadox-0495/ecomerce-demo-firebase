import React from "react";
import { Avatar , AppBar , Toolbar } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { useAuth } from "../fb_auth/fbAuthContext";
import { HashRouter , Link , Route , Switch } from "react-router-dom";
import MobileNavigationBar from "./mobileNavigationBar";
import Menu from "./menu";
import Entregas from "./entregas";
import Perfil from "./perfil";

function MainMenu(){
    const { currentUser } = useAuth();
    /*useRouteMatch
    const { url, path } = useRouteMatch();*/

    return(
        <>
            <HashRouter>
                <div className="pantalla-menu">
                    <AppBar className="top-navegacion">
                        <Toolbar className="usuario-img">
                            <Avatar component={Link} to={`/perfil`} src={currentUser.photoURL} alt={AccountCircle} />
                        </Toolbar>
                    </AppBar>
                    <div className="menu-contenido">
                        <Switch>
                            <Route exact path={`/`} component={Menu} />
                            <Route path={`/perfil`} component={Perfil}/>
                            <Route path={`/ordenes`} />
                            <Route path={`/soporte`} />
                            <Route path={`/menu/entrega`} component={Entregas} />
                        </Switch>
                    </div>
                    <MobileNavigationBar />
                </div>
            </HashRouter>
        </>
    );
}

export default MainMenu;