import React , { useState } from "react";
import { BottomNavigation as BN , BottomNavigationAction as BNA } from "@material-ui/core";
import { Ballot , ListAlt , Sms } from "@material-ui/icons";
import { Link } from "react-router-dom";

function MobileNavigationBar() {
    const [navValue, setNavValue] = useState("menu");
    function navBarValue(event,newValue){
        setNavValue(newValue);
    }
    return (
        <>
            <BN className="cel-navegacion" value={navValue} onChange={navBarValue}>
                <BNA component={Link} to="/" label="Menu" value="menu" icon={<Ballot />} />
                <BNA component={Link} to="/ordenes" label="Ordenes" value="ordenes" icon={<ListAlt />} />
                <BNA component={Link} to="/soporte" label="Soporte" value="soporte" icon={<Sms />} />
            </BN>  
        </>
    )
}

export default MobileNavigationBar;