import { useEffect, useState } from "react"
import { ApiWebURL } from "../utils"
import { useParams } from "react-router-dom"
import PageHeader from "../components/PageHeader"
import nofoto from "./../assets/images/nofoto.jpg"

function PedidosDetalle() {
  const [pedidosSeleccionados, setPedidosSeleccionados] = useState([])

  useEffect(() => {
    leerServicio()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let params = useParams()//captura valor envuado por get

  const leerServicio = () => {
    const rutaServicio = ApiWebURL + "pedidosdetalle.php?idpedido=" + params.idpedido
    fetch(rutaServicio)
      .then(Response => Response.json())
      .then(data => {
        console.log(data)
        setPedidosSeleccionados(data)
      })

  }

  const dibujarCuadricula = () => {
    return (
      <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-2 row-cols-2 g-4 p-5">
        {pedidosSeleccionados.map(item =>
          <div className="col" key={item.idproducto}>
            <div className="card h-100">
                    <img src={item.imagenchica === null
                    ? nofoto : ApiWebURL + item.imagenchica}
                    className="card-img-top" alt="..." />
              <div className="card-body">
                <h6 className="card-title text-center">idPedido: {item.idpedido}</h6>
                <h6 className="card-title text-left">Nombre  : {item.nombre}</h6>
                <h6 className="card-title text-left">Detalle    : {item.detalle}</h6>
                <h6 className="card-title text-left">Cantidad: {item.cantidad}</h6>
                <p className="card-text text-left">Precio: S/ {item.precio}</p>
              </div>
            </div>
          </div>
        )}
      </div >
    )
  }

  return (
    <>
      <PageHeader titulo="Detalle Pedidos" />
      {dibujarCuadricula()}
    </>
  )
}

export default PedidosDetalle