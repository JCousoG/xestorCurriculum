import { useState } from "react";

function Navegador() {
    let [vista, setVista] = useState("alta")

return(
    <>
     {vista === "alta" && <Alta/>}
     {vista === "login" && <Login/>}
     {vista === "paginaUsuario" && <VistaUsuario/>}
    </>
)

}
