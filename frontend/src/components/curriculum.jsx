import { useState } from "react"

function EnviarCurriculum() {
    const [fichero, setFichero] = useState()
    const [servicio, setServicio] = useState(false)
    const [privacidad, setPrivaciad] = useState(false)
    const [curriculum, setCurriculum] = useState()

function condicionsDeServicio(evento) {
    setServicio(evento.target.checked)
}
function politicasPrivacidade(evento) {
setPrivaciad(evento.target.checked)
}
async function enviarFichero() {
    const token = localStorage.getItem("token")
        
        if (token&&privacidad&&servicio) {
        try {
            const response = await fetch(
                "http://localhost:8000/curriculums",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/JSON",
                        authorization: "Bearer "+token
                    },
                    body: curriculum
                }
            )
            if (response.ok) {
               
                setFichero("")
                }
                else { (alert("No se pudo enviar el currículum"))}
                console.log(response);
        }
       
        catch(excepcion) {
console.log(excepcion)
        }
    }
    else {alert("Debes aceptar las condiciones de privacidad y servicio")}
    }

 
function manexadorCurriculum(evento) {
    setFichero(evento.target.value)
   const reader = new FileReader()
   reader.readAsDataURL(evento.target.files[0])
   reader.addEventListener("load",()=>setCurriculum(reader.result))
}
    return(
        <>
        <input type="file" value={fichero} onInput={manexadorCurriculum}/>
        <button onClick={enviarFichero}>Enviar</button>
        <label>
            ¿Aceptas las condiciones del servicio?
        <input name="servcio" type="checkbox" onClick={condicionsDeServicio}/>
        </label>
        <label>
            ¿Aceptas las políticas de privacidad?
        <input name="privacidad" type="checkbox" onClick={politicasPrivacidade}/>
        </label>
        </>
    )
}

export default EnviarCurriculum