import React , { useState } from "react";
import { Snackbar , Slide , TextField , Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../fb_auth/fbAuthContext";
import { useHistory } from "react-router-dom";

function Perfil() {
    const [error,setError] = useState("");
    const [open,setOpen] = useState(false);
    const { currentUser , logout } = useAuth();
    const history = useHistory();

    async function handleLogOut(){
        setError("");

        try{
            await logout();
            history.push("/signin");
        }
        catch{
            setError("Error al cerrar la session");
            setOpen(true);
        }
    }

    function closeError(event,reason){
        if (reason === "clickaway") { return; }
        setOpen(false);
    }

    function SlideTransition(props) {
        return <Slide {...props} direction="left" />;
    }

    
    return (
        <>
            <form action="" className="frm-perfil">
                <TextField aria-invalid="false" size="small" id="nombre" label="Nombre" variant="outlined" defaultValue={currentUser.displayName} />
                <TextField aria-invalid="false" size="small" id="telefono" label="Telefono" variant="outlined" defaultValue={currentUser.phoneNumber} />
                <TextField aria-invalid="false" size="small" id="correo" label="Correo" variant="outlined" defaultValue={currentUser.email} />
                <Button color="primary" variant="outlined" onClick={handleLogOut}>Cerrar session</Button>
            </form>
            <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}} TransitionComponent={SlideTransition}  autoHideDuration={3000} onClose={closeError}>
                <Alert onClose={closeError} variant="filled" severity="error"> {error} </Alert>
            </Snackbar>
        </>
    )
}

export default Perfil;