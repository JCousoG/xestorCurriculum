import { useState } from "react"

function Login() {
    const [email, setEmail] = useState("")
    function manexadorEmail(event) {
        setEmail(event.target.value)
    }
async function enviarLogin() {
    try{
        const usuarioJSON = JSON.stringify({email})
        const response = await fetch(
            BACKEND_URL+"/login/",
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
        Introduce el correo electrónico con el que solicitaste el alta y recibirás en esa dirección el enlace con el que iniciarás sesión.
        <input type="email" onInput={manexadorEmail}/>
        </label>
        <button onClick={enviarLogin}>Enviar</button>
        </>
    )
}