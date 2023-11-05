
import { useEffect } from "react"
import { useState } from "react"
import { ApiWebURL } from "../utils"

function Envios() {

    const [listaEmpresas, setListaEmpresas] = useState([])

    useEffect(() => {
        leerServicio()
    },[])// PARA SOLUCIONAR EL PROBLEMA DE CARGUE CONSTANTEMENTE


    /*    function leerServicio()
       {
       } */

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "servicioenvios.php"
        fetch(rutaServicio)
            .then(Response => Response.json())
            .then(data => {
                console.log(data)
                setListaEmpresas(data)
            })

    }

    return (
        <section id='envios' className='padded'>
            <div className="container">
                <h2>Empresa de envíos</h2>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Empresa</th>
                            <th>Teléfono</th>
                            <th>Latitud</th>
                            <th>Longuitud</th>
                        </tr>

                    </thead>
                    <tbody>

                    {listaEmpresas.map(item => 
                    <tr key={item.idempresaenvio}>
                    <td>{item.idempresaenvio}</td>
                    <td>{item.nombre}</td>
                    <td>{item.telefono}</td>
                    <td>{item.latitud}</td>
                    <td>{item.longuitud}</td>
                </tr>
                        )}
                        
                    </tbody>

                </table>


            </div>
        </section>
    )
}

export default Envios