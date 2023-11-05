/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader"
import { ApiWebURL } from "../utils"

function Directores() {

    const [listaDirectores, setListaDirectores] = useState([])
    const [iddirector, setIddirector] = useState([])
    const [nombres, setNombres] = useState([])
    const [peliculas, setPeliculas] = useState([])
    

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "directores.php"
        fetch(rutaServicio)
            .then(Response => Response.json())
            .then(data => {
                console.log(data)
                setListaDirectores(data)
            })

    }

    const dibujarTabla = () => {

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombres</th>
                        <th>Peliculas</th>
                        <th></th>
                        <th></th>
                    </tr>

                </thead>
                <tbody>

                    {listaDirectores.map(item =>
                        <tr key={item.iddirector}>
                            <td>{item.iddirector}</td>
                            <td>{item.nombres}</td>
                            <td>{item.peliculas}</td>
                            <td><i className="bi bi-pencil" title="Editar"
                                onClick={() => llenarCampos(item)} data-bs-toggle="modal" data-bs-target="#updateModal"></i></td>
                            <td><i className="bi bi-x-lg" title="Eliminar" 
                                onClick={() => llenarCampos(item)}
                                data-bs-toggle="modal" data-bs-target="#deleteModal"></i></td>
                        </tr>
                    )}

                </tbody>

            </table>
        )

    }

    const llenarCampos = (item) => {
        setIddirector(item.iddirector)
        setNombres(item.nombres)
        setPeliculas(item.peliculas)
    }

    const dibujarInsertModal = () => {
        return (
            <div className="modal fade" id="insertModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Nuevo director</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={(event) => insertDirector(event)}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Nombres" required
                                        minLength="2" maxLength="15"
                                        values={nombres} onChange={(event) => setNombres(event.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Peliculas" required minLength="4" maxLength="20"
                                        values={peliculas} onChange={(event) => setPeliculas(event.target.value)} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary" >Agregar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    //modal de modificar

    const dibujarUpdateModal = () => {
        return (
            <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Actualizar director</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={(event) => updateDirector(event)}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <input type="text" className="form-control" readOnly
                                        value={iddirector} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Nombres" required
                                        minLength="2" maxLength="15"
                                        value={nombres} onChange={(event) => setNombres(event.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Peliculas" required minLength="4" maxLength="20"
                                        value={peliculas} onChange={(event) => setPeliculas(event.target.value)} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary" >Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    const dibujarDeleteModal = () => {
        return (
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Eliminar director</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={(event) => deleteDirector(event)}>
                            <div className="modal-body">
                                ?Está seguro que desea eliminar a {nombres}?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary" >Eliminar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }



    const insertDirector = (event) => {
        event.preventDefault()
        const rutaServicio = ApiWebURL + "directoresinsert.php"

        let formData = new FormData()
        formData.append("nombres", nombres)
        formData.append("peliculas", peliculas)

        fetch(rutaServicio, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                console.log(data)
                leerServicio()
                setNombres("")
                setPeliculas("")  //limpiando las cajas de formularios
                document.querySelector("#insertModal .btn-close").click()//cierra formulario insettar

            })
    }

    const updateDirector = (event) => {
        event.preventDefault()
        const rutaServicio = ApiWebURL + "directoresupdate.php"

        let formData = new FormData()
        formData.append("iddirector", iddirector)
        formData.append("nombres", nombres)
        formData.append("peliculas", peliculas)

        fetch(rutaServicio, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                console.log(data)
                leerServicio()
                setIddirector("")
                setNombres("")
                setPeliculas("")  //limpiando las cajas de formularios
                document.querySelector("#updateModal .btn-close").click()//cierra formulario insettar

            })
    }

    const deleteDirector = (event) => {
        event.preventDefault()
        const rutaServicio = ApiWebURL + "directoresdelete.php"

        let formData = new FormData()
        formData.append("iddirector", iddirector)        

        fetch(rutaServicio, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                console.log(data)
                leerServicio()
                setIddirector("")
                setNombres("")
                setPeliculas("")  //limpiando las cajas de formularios
                document.querySelector("#deleteModal .btn-close").click()//cierra formulario insettar

            })
    }

    return (
        <>
            <PageHeader titulo="Directores" />
            <section id='directores' className='padded'>
                <div className="container">
                    <div className="mb-3">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#insertModal">Nuevo Director</button>
                    </div>
                    {dibujarTabla()}
                </div>
            </section>
            {dibujarInsertModal()}
            {dibujarUpdateModal()}
            {dibujarDeleteModal()}
        </>
    )
}

export default Directores