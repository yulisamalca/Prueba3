/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader"
import { ApiWebURL } from "../utils"

function Proveedores() {

    const [listaProveedores, setListaProveedores] = useState([])
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState([])
    const [listaProveedoresFiltrados, setListaProveedoresFiltrados] = useState([])
    const [textoBuscar, setTextoBuscar] = useState("") //varuable texto buscar

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "proveedores.php"
        fetch(rutaServicio)
            .then(Response => Response.json())
            .then(data => {
                console.log(data)
                setListaProveedores(data)
                setListaProveedoresFiltrados(data)
            })

    }

    const dibujarTabla = () => {

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th onClick={() => seleccionarColumna("idproveedor")}>Código</th> {/* buscar */}
                        <th onClick={() => seleccionarColumna("nombreempresa")}>Empresa</th>
                        <th onClick={() => seleccionarColumna("nombrecontacto")}>Contacto</th>
                        <th onClick={() => seleccionarColumna("cargocontacto")}>Cargo</th>
                        <th onClick={() => seleccionarColumna("ciudad")}>Ciudad</th>
                        <th onClick={() => seleccionarColumna("pais")}>País</th>
                        
                        <th></th>
                    </tr>

                </thead>
                <tbody>

                    {listaProveedoresFiltrados.map(item =>
                        <tr key={item.idproveedor}>
                            <td>{item.idproveedor}</td>
                            <td>{item.nombreempresa}</td>
                            <td>{item.nombrecontacto}</td>
                            <td>{item.cargocontacto}</td>
                            <td>{item.ciudad}</td>
                            <td>{item.pais}</td>
                            <td><i className="bi bi-eye-fill" title="Editar" onClick={() => llenarCampos(item)} data-bs-toggle="modal" data-bs-target="#vistaModal"></i></td>
                        </tr>
                    )}

                </tbody>

            </table>
        )

    }

    const llenarCampos = (item) => {
        setProveedorSeleccionado(item)
    }

    const dibujarVistaModal = () => {
        return (
            <div className="modal fade" id="vistaModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Datos Proveedor</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table">
                                <tbody>
                                    <tr><th>Empresa </th> <td>{proveedorSeleccionado.nombreempresa}</td></tr>  
                                    <tr><th>Contacto </th> <td>{proveedorSeleccionado.nombrecontacto}</td></tr>  
                                    <tr><th>Cargo Contacto </th> <td>{proveedorSeleccionado.cargocontacto}</td></tr>  
                                    <tr><th>Dirección </th> <td>{proveedorSeleccionado.direccion}</td></tr>                                      
                                    <tr><th>Ciudad </th> <td>{proveedorSeleccionado.ciudad}</td></tr>  
                                    <tr><th>País </th> <td>{proveedorSeleccionado.pais}</td></tr>  
                                    <tr><th>Región </th> <td>{proveedorSeleccionado.region}</td></tr>  
                                    <tr><th>Código Postal </th> <td>{proveedorSeleccionado.codigopostal}</td></tr>  
                                    <tr><th>Teléfono </th> <td>{proveedorSeleccionado.telefono}</td></tr>  
                                    <tr><th>Fax </th> <td>{proveedorSeleccionado.fax}</td></tr>  

                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const seleccionarColumna = (columna) => {
        const resultado = [...listaProveedoresFiltrados].sort((a, b) => a[columna] > b[columna] ? 1 : -1)
        setListaProveedoresFiltrados(resultado)

    }

    const buscarTexto = (event) => {
        let texto = event.target.value;
        setTextoBuscar(texto) //actualiza el contenid de la variable texto
        const resultado = listaProveedores.filter(item =>
            item["idproveedor"].toUpperCase().includes(texto.toUpperCase()) ||
            item["nombreempresa"].toUpperCase().includes(texto.toUpperCase()) ||
            item["nombrecontacto"].toUpperCase().includes(texto.toUpperCase()) ||
            item["cargocontacto"].toUpperCase().includes(texto.toUpperCase()) ||
            item["ciudad"].toUpperCase().includes(texto.toUpperCase()) ||
            item["pais"].toUpperCase().includes(texto.toUpperCase())
        )
        setListaProveedoresFiltrados(resultado)
    }

    return (
        <>
            <PageHeader titulo="Proveedores" />
            <section id='proveedores' className='padded'>
                <div className="container">
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Indique expresión a buscar"
                            value={textoBuscar} onChange={(event) => buscarTexto(event)} />  {/* text buscar */}
                    </div>
                    {dibujarTabla()}
                </div>
            </section>
            {dibujarVistaModal()}
        </>
    )
}

export default Proveedores