import { useState, useEffect } from "react"

function Descarga({id}) {
    const [curriculum, setCurriculum] = useState("")
    const [obterCurriculum, SetObterCurriculum] = useState("")
    function obterDatos() {
        
        fetch("http://localhost:8000/curriculums/?id="+id)
    .then(reaccionParaResposta)
    .catch(reaccionErroResposta)
    function reaccionParaResposta(resposta){
        resposta.json().then(reaccionParaResultados)
      }
      function reaccionErroResposta(erro) {
        alert("Estamos tendo problemas coa conexión neste momento, probe a intentalo máis tarde")
        console.error(erro);
      }
    
      function reaccionParaResultados(curriculums){
        SetObterCurriculum(curriculums)
      }
  
    } 
    useEffect(seleccionarCurriculum,[curriculum])
    function seleccionarCurriculum() {
    
     if (!obterCurriculum.replaced) setCurriculum(encodeURI(obterCurriculum.curriculumEnPdf))
    }
    return(
        <>
        <a download="curriculumEnPdf.pdf" href={`data:application/PDF,${curriculum}`}> 
              Descarga o GPX
            </a>
        </>
    )
}