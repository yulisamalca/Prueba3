import "./Empleados.css"
import { useEffect, useState } from "react"
import { ApiWebURL,agregarCarritoEmpleado } from "../utils"

function Empleados() {
    const [listaEmpleados, setListaEmpleados] = useState([])

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "empleados.php"
        fetch(rutaServicio)
            .then(Response => Response.json())
            .then(data => {
                console.log(data)
                setListaEmpleados(data)
            })

    }

    const dibujarCuadricula = () => {
        return (
            <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-4">
                {listaEmpleados.map(item =>
                    <div className="col" key={item.idempleado}>
                        <div className="card h-100" onMouseEnter={(event) => mostrarVistaRapida(event)}
                            onMouseLeave={(event) => ocultarVistaRapida(event)}>
                            <img src={ApiWebURL + "fotos/" + item.foto} className="card-img-top" alt="..." />

                            <i className="bi bi-person-plus"                                
                                title="Agregar Empleado" onClick={() => agregarCarritoEmpleado(item)}></i>


                            <div className="card-body">
                                <h5 className="card-title">{item.nombres} {item.apellidos}</h5>
                                <p className="card-text">{item.cargo}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    const mostrarVistaRapida = (event) => {
        //hace referencia al objeto que recibe al evento
        event.currentTarget.querySelector(".bi-person-plus").classList.add("bi-person-plus-final")
    }

    const ocultarVistaRapida = (event) => {
        //hace referencia al objeto que recibe al evento
        event.currentTarget.querySelector(".bi-person-plus").classList.remove("bi-person-plus-final")
    }


    return (
        <section id='empleados' className='padded'>
            <div className="container">
                <h2>Empleados</h2>
                {dibujarCuadricula()}
            </div>
        </section>
    )
}

export default Empleados