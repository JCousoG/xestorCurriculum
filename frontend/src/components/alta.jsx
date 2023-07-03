const { useState } = require("react")

function Alta() {
    const [alias, setAlias] = useState("")
    const [email, setEmail] = useState("")

    function manexadorAlias(event) {
        setAlias(event.target.value)
    }
    function manexadorEmail(event) {
        setEmail(event.target.value)
    }
    async function enviarAlta() {
        const usuario = {alias, email}
        try{
            const usuarioJSON = JSON.stringify(usuario)
            const response = await fetch(
                "http://localhost:8000/usuarios/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: usuarioJSON              
                 }
            )
        }
        catch (excepcion) {
            console.log(excepcion)
        }
    }

    return(
        <>
        <h2>Introduce tu alias y una dirección de correo electrónico para poder iniciar sesión</h2>
        <label>
            Usuario:
            <input type="text" placeholder="Alias" onInput={manexadorAlias}/>
        </label>
        <label>
            Dirección de correo electrónico:
            <input type="email" onInput={manexadorCorreo}/>
        </label>
        <button onClick={enviarAlta}>Enviar</button>
        </>
    )
}
export default Alta