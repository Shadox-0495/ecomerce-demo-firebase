import React , {useState ,useRef} from 'react';
import { Button , TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../fb_auth/fbAuthContext";
import { Link } from "react-router-dom";

function ForgotPassword() {
    const emailRef=useRef();
    const { resetPassword }  = useAuth();
    const [error,setError] = useState("");
    const [message,setMessage] = useState("");
    const [loading,setLoading] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();

        try{
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Se ha enviado un mensaje a su correo para que pueda reestablecer la contraseña, verifique su bandeja de correo.");
        }
        catch{
            setError("Fallo al reiniciar la contraseña");
        }
        setLoading(false);

        /*
        //Codigo para modificar el correo y la contraseña del usuario actual
        const promises=[];
        setError("");
        setLoading(true);
        if(email!==currentemail){
            promises.push(updateEmail(newemail));
        }
        if(pass!==currentpass){
            promises.push(updatePassword(newpass));
        }

        Promise.all(promises).then(()=>{
            history.push("/");
        }).catch(()=>{
            setError("Error al momento de actualizar la cuenta");
        }).finally(()=>{
            setLoading(false);
        });*/

    }

    return(
        <>
            <div className="frm-session-contenedor">
                <div className="frm-session">
                    <h2>Cambiar contraseña</h2>
                    {error && <Alert variant="filled" severity="error">{error}</Alert>}
                    {message && <Alert variant="filled" severity="success">{message}</Alert>}
                    {/*<div className="session-alt">
                        <Button data-type="google" variant="contained" color="primary"> <img src={googleLogo} alt=""/> Ingresar con google </Button>
                    </div>*/}
                    <form className="session-datos" onSubmit={handleSubmit}>
                        <TextField aria-invalid="false" id="correo" label="Correo*" inputRef={emailRef} variant="outlined" />
                        <Button type="submit" disabled={loading} variant="contained" color="primary">Cambiar contraseña</Button>
                    </form>
                    <div data-opcion="ingresar"><Link to="/signin">Ingresar</Link> </div>
                    <div data-opcion="crear-cuenta">No tienes una cuenta? <Link to="/signup">Registrate</Link> </div>
                </div>
            </div>
        </>
    );
}
export default ForgotPassword;