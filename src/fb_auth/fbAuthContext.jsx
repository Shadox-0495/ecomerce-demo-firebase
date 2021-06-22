import React, { useContext , useState , useEffect} from 'react';
import { firestore , auth , loginProviders } from "../fb_connection/firebase";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }){
    
    const [currentUser,setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password);
    }

    function signin(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }

    function logout(){
        return auth.signOut();
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email){
        return currentUser.updateEmail(email);
    }

    function updatePassword(pass){
        return currentUser.updatePassword(pass);
    }

    function singUpWithProvider(provider){
        return auth.signInWithPopup(provider);
    }

    

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    },[]);

    const value={
        currentUser
        ,loginProviders
        ,firestore
        ,signup
        ,signin
        ,logout
        ,resetPassword
        ,updateEmail
        ,updatePassword
        ,singUpWithProvider
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}