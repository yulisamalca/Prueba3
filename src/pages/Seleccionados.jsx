

import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader"
import { ApiWebURL} from "../utils"

function Seleccionados() {
    const [listaItems, setListaItems] = useState([])    
    

    useEffect(() => {
        leerDatosCarritoEmpleados()
    }, [])

    const leerDatosCarritoEmpleados = () => {
        //leer datos almacenados storage
        let datosCarritoEmpleado = JSON.parse(sessionStorage.getItem("carritocomprasEmpleado"))
        console.log(datosCarritoEmpleado)
        setListaItems(datosCarritoEmpleado)        
    }



    const dibujarTabla = () => {

      return (
          <table className="table">
              <thead>
                  <tr>
                      <th></th>                      
                      <th>Nombre</th>
                      <th className="text-center">Cargo</th>
                      <th className="text-center">Dirección</th>
                      <th className="text-center">Ciudad</th>
                      <th className="text-center">País</th>
                      <th className="text-center">Teléfono</th>
                  </tr>
              </thead>
              <tbody>
                  {listaItems != null
                      ? listaItems.map(item =>
                          <tr key={item.idempleado}>                          
                              <td>
                                
                                  <img src={ApiWebURL + "fotos/" + item.foto} className="img-thumbnail" width="34" alt="..." />
                                
                              </td>
                              <td>{item.apellidos +", "+ item.nombres}</td>
                              <td className="text-center">{item.cargo}</td>                              
                              <td className="text-center">{item.direccion}</td>                              
                              <td className="text-center">{item.ciudad}</td>                              
                              <td className="text-center">{item.pais}</td>                              
                              <td className="text-center">{item.telefono}</td>                              
                          </tr>
                      )

                      : <></>}

              </tbody>

          </table>
      )

  }

  const vaciarCarrito = () => {
    setListaItems([])
    sessionStorage.removeItem("carritocomprasEmpleado")    
}

  return (
    <>
      <PageHeader titulo="Seleccionados" />
      <section id='carrito' className='padded'>
                <div className="container">                    
                    <div className="row">
                        <div className="col-md-10">
                            {dibujarTabla()}
                            <button className="btn btn-danger" onClick={() => vaciarCarrito()}>Vaciar carrito</button>
                        </div>
                    </div>
                </div>
      </section>
    </>
  )}

export default Seleccionados