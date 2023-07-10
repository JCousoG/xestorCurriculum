import { useState } from "react"
import { BACKEND_URL } from "./conf.mjs"

function Alta() {

    const [email, setEmail] = useState("")
    
    function manexadorEmail(event) {
        setEmail(event.target.value)
    }
    async function enviarAlta() {
        try{
            const usuarioJSON = JSON.stringify({email})
            const response = await fetch(
                BACKEND_URL+"/usuarios/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: usuarioJSON
                 }
            )

            if (response.ok) setEmail("")
        }
        catch (excepcion) {
            console.log(excepcion)
        }
    }

    return(
        <>       
        <label>
            Dirección de correo electrónico:
            <input type="email" onInput={manexadorEmail}/>
        </label>
        <button onClick={enviarAlta}>Enviar</button>
        </>
    )
}
export default Alta