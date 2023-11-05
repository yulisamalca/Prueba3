import PageHeader from "../components/PageHeader"
import { useEffect, useState } from "react"
import { ApiWebURL } from "../utils"
import { Link } from "react-router-dom"

function Pedidos() {
    const [listaPedidos, setListaPedidos] = useState([])

    useEffect(() => {
        leerServicio()
    }, [])


    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "pedidos.php"
        fetch(rutaServicio)
            .then(Response => Response.json())
            .then(data => {
                console.log(data)
                setListaPedidos(data)
            })

    }

    const dibujarCuadricula = () => {

        return (
            <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-2 row-cols-2 g-4">
                {listaPedidos.map(item =>
                    <div className="col" key={item.idpedido}>
                        <Link to={"/pedidosdetalle/" + item.idpedido}>
                            <div className="card">

                                <div className="card-body">
                                    <h6 className="card-title text-center">{item.idpedido}</h6>
                                    <p className="card-text">Nombre: {item.nombres}</p>
                                </div>

                            </div>
                        </Link>
                    </div>
                )}
            </div>
        )

    }


    return (
        <>
            <PageHeader titulo="Pedidos" />
            <section id='Pedidos' className='padded'>
                <div className="container">
                    {dibujarCuadricula()}
                </div>
            </section>
        </>
    )
}

export default Pedidos