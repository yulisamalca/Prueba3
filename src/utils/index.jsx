export const ApiWebURL = "https://servicios.campus.pe/"

export const agregarCarrito = (item, cantidad) => {
    item.cantidad = cantidad === null ? 1 : cantidad; //agrega cantidad lista seleccionada
    //local storage almacena datos navegador permanentemente salvo eliminie la cache (API ALAMCENAMIENTO WEB)
    item.precio = item.preciorebajado === "0" ? item.precio : item.preciorebajado
    let carrito = [];
    if (sessionStorage.getItem("carritocompras")) {
        carrito = JSON.parse(sessionStorage.getItem("carritocompras"))
        let index = -1 //captura la posicion si existe carrito compras
        for(let i=0; i< carrito.length ; i++){
                if(item.idproducto=== carrito[i].idproducto){
                    index = i
                    break
                }
        }
        if(index === -1){
            carrito.push(item)
            sessionStorage.setItem("carritocompras", JSON.stringify(carrito))//guarda carrito formato texto solo se guarda 1 producto a la ves
        }
        else{
            carrito[index].cantidad += parseInt(item.cantidad)
            sessionStorage.setItem("carritocompras", JSON.stringify(carrito))//guarda carrito formato texto solo se guarda 1 producto a la ves
        }

        
    } else {
        carrito.push(item)
        sessionStorage.setItem("carritocompras", JSON.stringify(carrito))//guarda carrito formato texto solo se guarda 1 producto a la ves
    }

}

export const agregarCarritoEmpleado = (item) => {   
    let carritoEmpledo = [];
    if (sessionStorage.getItem("carritocomprasEmpleado")) {
        carritoEmpledo = JSON.parse(sessionStorage.getItem("carritocomprasEmpleado"))
        let index = -1 //captura la posicion si existe carrito compras    
        for(let i=0; i< carritoEmpledo.length ; i++){
            if(item.idempleado=== carritoEmpledo[i].idempleado){
                index = i
                break
            }
    }
        if(index === -1){
            carritoEmpledo.push(item)
            sessionStorage.setItem("carritocomprasEmpleado", JSON.stringify(carritoEmpledo))//guarda carrito formato texto solo se guarda 1 producto a la ves
        }
        
    } else {
        carritoEmpledo.push(item)
        sessionStorage.setItem("carritocomprasEmpleado", JSON.stringify(carritoEmpledo))//guarda carrito formato texto solo se guarda 1 producto a la ves
    }

}