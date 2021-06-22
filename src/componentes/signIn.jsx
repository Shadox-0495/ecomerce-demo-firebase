import React , {useState ,useRef} from 'react';
import { Button , TextField , Snackbar , Slide } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../fb_auth/fbAuthContext";
import { Link, useHistory } from "react-router-dom";

function SignIn(){
        const emailRef=useRef();
        const passRef=useRef();
        const { signin , loginProviders , singUpWithProvider }  = useAuth();
        const [open,setOpen] = useState(false);
        const [error,setError] = useState("");
        const [loading,setLoading] = useState(false);
        const history = useHistory();

        function SlideTransition(props) {
            return <Slide {...props} direction="left" />;
          }
    
        async function handleSubmit(e){
            e.preventDefault();
    
            try{
                setError("");
                setLoading(true);
                await signin(emailRef.current.value,passRef.current.value);
                history.push("/app");
            }
            catch{
                setError("Fallo al iniciar session");
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
                return <Button disabled={loading} variant="contained" id={"btnLogin"+key} color="primary" onClick={()=>{ altSignIn(value); }} >Ingresar con {key}</Button>
            }
        }
    
        return(
            <>
                <div className="frm-session-contenedor">
                    <div className="frm-session">
                        <h2>Ingresar</h2>
                        <div className="session-alt"> {altProviders()} </div>
                        <form className="session-datos" onSubmit={handleSubmit}>
                            <TextField aria-invalid="false" size="small" id="correo" label="Correo*" inputRef={emailRef} variant="outlined" />
                            <TextField aria-invalid="false" size="small" id="contraseña" label="Contraeña*" inputRef={passRef} variant="outlined" type="password" />
                            <Button type="submit" disabled={loading} variant="contained" color="primary">Ingresar</Button>
                        </form>
                        <div data-opcion="cambiar-contraseña"><Link to="/forgot-password">Olvido la contraseña?</Link> </div>
                        <div data-opcion="crear-cuenta">No tienes una cuenta? <Link to="/signup">Registrate</Link> </div>
                        <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}} TransitionComponent={SlideTransition}  autoHideDuration={3000} onClose={closeError}>
                            <Alert onClose={closeError} variant="filled" severity="error"> {error} </Alert>
                        </Snackbar>
                    </div>
                </div>
            </>
        );
}

export default SignIn;