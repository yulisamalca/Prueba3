import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import nofoto from "./../assets/images/nofoto.jpg"
import { ApiWebURL, agregarCarrito } from "../utils"

function ProductoDetalle() {
    const [productoSeleccionado, setProductoSeleccionado] = useState([])
    const [cantidad, setCantidad] = useState(1)

    useEffect(() => {
        leerServicio()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let params = useParams()//captura valor envuado por get
    console.log(params)

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "productos.php?idproducto=" + params.idproducto
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setProductoSeleccionado(data[0])
            })

    }

    return (
        <section id='inversiones' className='padded'>
            <div className="container">
                <h2>{productoSeleccionado.nombre}</h2>
                <div className="row">
                    <div className="col-md-6">
                        <img src={productoSeleccionado.imagengrande === null
                            ? nofoto
                            : ApiWebURL + productoSeleccionado.imagengrande}
                            className="img-fluid" alt="..." />
                    </div>
                    <div className="col-md-6">
                        <table className="table">
                            <tbody>
                                <tr><th>Detalle </th> <td>{productoSeleccionado.detalle}</td></tr>
                                <tr><th>Precio </th> <td>
                                    S/ {
                                        productoSeleccionado.preciorebajado === "0"
                                            ? parseFloat(productoSeleccionado.precio).toFixed(2) :
                                            parseFloat(productoSeleccionado.preciorebajado).toFixed(2)}
                                    <small className="precio-rebajado">{
                                        productoSeleccionado.preciorebajado === "0"
                                            ? ""
                                            : "S/ " + parseFloat(productoSeleccionado.precio).toFixed(2)
                                    }</small>
                                </td></tr>
                                <tr><th>Categoria </th> <td>{productoSeleccionado.categoria}</td></tr>
                                <tr><th>Stock </th> <td>{productoSeleccionado.unidadesenexistencia}</td></tr>
                                <tr><th>Proveedor </th> <td>{productoSeleccionado.proveedor}</td></tr>
                                <tr><th>País </th> <td>{productoSeleccionado.pais}</td></tr>
                                <tr><th>Atención al cliente </th> <td>{productoSeleccionado.telefono}</td></tr>

                            </tbody>
                        </table>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-2">
                                    <input type="number" className="form-control" 
                                    value={cantidad} onChange={(event) => setCantidad(event.target.value)}/>
                                </div>
                                <div className="col-10">
                                    <button className="btn btn-primary" onClick={() => agregarCarrito(productoSeleccionado,cantidad)}>Añadir al carrito</button>
                                </div>
                            </div>
                        </div>
                        <h3>Descripción</h3>
                        <div dangerouslySetInnerHTML={{ __html: productoSeleccionado.descripcion }}>
                            {/* interpreyta codigo html */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductoDetalle