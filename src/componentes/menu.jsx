import React , { useState , useEffect } from "react";
import { useAuth } from "../fb_auth/fbAuthContext";
import { Link } from "react-router-dom";

function Menu() {
    const { firestore } = useAuth();
    const [ menuOptions, setMenuOptions ] = useState([
                                                      {ID:1,Nombre:"",Img:""}
                                                    ]);

    useEffect(()=>{
        const unsubscribe = firestore.collection("App").doc("Menu").get().then(doc=>{
            if(!doc.exists){console.log("No se encontro el documento en firestore");}
            setMenuOptions(doc.data().Categoria);
        })
        .catch(error=>{
            console.log("Error al recuperar informacion de firebase." + error);
        });
        return unsubscribe;
    },[]);

    return (
        <>
            <ul className="menu-categorias">
            {menuOptions.map((item)=>{
                const { ID , Nombre , Img } = { ...item };
                return <li key={`menuCat${ID}`} >
                                <Link to={`/menu/${Nombre}`}>
                                    <label>{Nombre}</label>
                                    {Img!=="" ? <img src={ `img/${Img}`} alt=""/> : ""}
                                </Link>
                        </li>;
            })}
            </ul>
        </>
    )
}
export default Menu;