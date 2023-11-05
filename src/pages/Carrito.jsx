/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader"

function Carrito() {
    const [listaItems, setListaItems] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        leerDatosCarrito()
    }, [])

    const leerDatosCarrito = () => {
        //leer datos almacenados storage
        let datosCarrito = JSON.parse(sessionStorage.getItem("carritocompras"))
        setListaItems(datosCarrito)
        calcularTotal(datosCarrito)
    }

    const calcularTotal = (datosCarrito) => {
        let sumaTotal = datosCarrito.reduce((acumulador, fila) => acumulador + fila["precio"] * fila["cantidad"], 0)
        setTotal(sumaTotal)
    }

    const dibujarTabla = () => {

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th className="text-end">Precio</th>
                        <th className="text-end">Cantidad</th>
                        <th className="text-end">SubTotal</th>
                    </tr>
                </thead>
                <tbody>
                    {listaItems != null
                        ? listaItems.map(item =>
                            <tr key={item.idproducto}>
                                <td>{item.idproducto}</td>
                                <td>{item.nombre}</td>
                                <td className="text-end">{parseFloat(item.precio).toFixed(2)}</td>
                                <td className="text-end">{item.cantidad}</td>
                                <td className="text-end">{(item.precio * item.cantidad).toFixed(2)}</td>
                                <td><i className="bi bi-x-lg eliminar-item" onClick={() => eliminarItem(item)}></i></td>
                            </tr>
                        )

                        : <></>}

                </tbody>

            </table>
        )

    }

    const eliminarItem = (item) => {
        let carritoMenos = listaItems.filter(itemCart => itemCart.idproducto !== item.idproducto)
        setListaItems(carritoMenos)
        sessionStorage.setItem("carritocompras", JSON.stringify(carritoMenos)) //actualizamos storage
        calcularTotal(carritoMenos)

    }

    const vaciarCarrito = () => {
        setListaItems([])
        sessionStorage.removeItem("carritocompras")
        setTotal(0)
    }

    return (
        <>
            <PageHeader titulo="Carrito de compras" />
            <section id='carrito' className='padded'>
                <div className="container">                    
                    <div className="row">
                        <div className="col-md-10">
                            {dibujarTabla()}
                            <button className="btn btn-danger" onClick={() => vaciarCarrito()}>Vaciar carrito</button>
                        </div>
                        <div className="col-md-2">
                            <div className="card border-dark mb-3">
                                <div className="card-header">Totales</div>
                                <div className="card-body">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th>Total: </th> <td className="text-end">S/ {total.toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Carrito