/* eslint-disable react-hooks/exhaustive-deps */
import "./Tienda.css"
import { useEffect, useState } from "react"
import Productos from "../components/Productos"
import PageHeader from "../components/PageHeader"
import { ApiWebURL } from "../utils"


function Tienda() {
    const [listaCategorias, setListaCategorias] = useState([])
    const [categoriaSeleccionada,setCategoriaSeleccionada] =useState([])

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "categorias.php"
        fetch(rutaServicio)
            .then(Response => Response.json())
            .then(data => {                
                setListaCategorias(data)
                seleccionarCategoria(null,data[0])
            })

    }

    const dibujarLista = () => {
        return (
            <ul className="list-group" id="lista-categorias">
                {listaCategorias.map(item =>
                    <li className="list-group-item position-relative" key={item.idcategorias}
                        title={item.descripcion}
                        onClick={(event) => seleccionarCategoria(event,item)}>
                        {item.nombre} <span className="badge text-bg-secondary position-absolute end-0">{item.total}</span>
                    </li>
                )}

            </ul>
        )
    }

    const seleccionarCategoria = (event, item) => {
        console.log(item)
        setCategoriaSeleccionada(item)
        let itemsLista = document.querySelectorAll("#lista-categorias li")
        itemsLista.forEach(item => item.classList.remove("active"))
        event.currentTarget.classList.add("active")
    }


    return (
        <>
        <PageHeader titulo="Tienda" />
        <section id='tienda' className='padded'>
            <div className="container">
                
                <div className="row">
                    <div className="col-xxl-3 col-md-4">
                        <h3>Categorias</h3>
                        {dibujarLista()}
                    </div>
                    <div className="col-xxl-9 col-md-8">
                        <h3>{categoriaSeleccionada.nombre}</h3>
                        <p>{categoriaSeleccionada.descripcion}</p>
                        <Productos categoriaProductos={categoriaSeleccionada.idcategoria}/>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Tienda