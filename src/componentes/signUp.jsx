import React , {useState ,useRef} from 'react';
import { Button , TextField , Snackbar , Slide } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../fb_auth/fbAuthContext";
import { Link, useHistory } from "react-router-dom";

function SignUp(){
    
    
    const emailRef=useRef();
    const passRef=useRef();
    const passConfRef=useRef();
    const { signup , loginProviders , singUpWithProvider }  = useAuth();
    const [open,setOpen] = useState(false);
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const history = useHistory();

    function SlideTransition(props) {
        return <Slide {...props} direction="left" />;
      }

    async function handleSubmit(event){
        event.preventDefault();
        if(passRef.current.value !== passConfRef.current.value){ setOpen(true); return setError("Las contraseñas no son iguales");}

        try{
            setError("");
            setLoading(true);
            await signup(emailRef.current.value,passRef.current.value);
            history.push("/app");
        }
        catch(event){
            setError("Fallo al registrarse:" + event);
            console.log(open);
            setOpen(true);
        }
        setLoading(false);
    }

    async function altSignIn(provider){
        try{
            setError("");
            setLoading(true);
            await singUpWithProvider(provider);
            history.push("/app");
        }
        catch(event){
            setError("Fallo al registrarse:" + event);
            setOpen(true);
        }
        setLoading(false);
    }

    function closeError(event,reason){
        if (reason === "clickaway") { return; }
        setOpen(false);
    }

    function altProviders(){
        for (const  [key, value] of Object.entries(loginProviders)) {
            return <Button disabled={loading} variant="contained" id={"btnLogin"+key} color="primary" onClick={()=>{ altSignIn(value); }} >Registrarse con {key}</Button>
        }
    }

    return(
        <>
            <div className="frm-session-contenedor">
                <div className="frm-session">
                    <h2>Registrarse</h2>
                    <div className="session-alt"> {altProviders()} </div>
                    <form className="session-datos" onSubmit={handleSubmit}>
                        <TextField aria-invalid="false" size="small" id="correo" label="Correo*" inputRef={emailRef} variant="outlined" />
                        <TextField aria-invalid="false" size="small" id="contraseña" label="Contraeña*" inputRef={passRef} variant="outlined" type="password" />
                        <TextField aria-invalid="false" size="small" id="contraseñaConf" label="Confirmar contraeña*" inputRef={passConfRef} variant="outlined" type="password" />
                        <Button type="submit" disabled={loading} variant="contained" color="primary">Registrar</Button>
                    </form>
                    <div data-opcion="ingresar-sistema">Ya tienes una cuenta? <Link to="/signin">Ingresa</Link> </div>
                    <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}} TransitionComponent={SlideTransition}  autoHideDuration={3000} onClose={closeError}>
                        <Alert onClose={closeError} variant="filled" severity="error"> {error} </Alert>
                    </Snackbar>
                </div>
            </div>
        </>
    );
}

export default SignUp;