const carrito = {
    productos: [],
    delivery: 3_990,
    buscarProducto: function(id){
        let productoBuscado = this.productos.find(
            (producto) => producto.id == id
        );
        return productoBuscado;
    },

    actualizarProducto: function(id, cantidad){

    let productoBuscado = this.buscarProducto(id);
    productoBuscado.cantidad = cantidad;

    return productoBuscado;

    },
    agregarProducto: function (id, cantidad = 1) {
        
        let productoBuscado = this.buscarProducto(id);

        

        if (productoBuscado) {
            let nuevaCantidad = productoBuscado.cantidad + cantidad;
            this.actualizarProducto(id, nuevaCantidad);
        } else {

            let productoBD = listaProductosBD.find(producto=> producto.id == id);

            if(productoBD){
                const detalleProducto = {
                id: id,
                cantidad: cantidad,
            };
            this.productos.push(detalleProducto);
            }else {
                return alert("Producto ya no existe en la Base de datos.");
            }
             

        }
    },
    eliminarProducto: function (id) {
        let indiceElemento = this.productos.findIndex(
            (producto) => producto.id == id
        );

        if (indiceElemento >= 0) {
            console.log("elemento encontrado.");

            this.productos.splice(indiceElemento, 1);
            return this.productos;
        } else {
            console.log("Producto no encontrado en el carrito");
        }
    },
    cantidadProductos: function () {
        return this.productos.length;
    },
    limpiarCarrito: function () {
        if (this.productos.length == 0) {
            return alert("Carrito vació.");
        }

        let confirmacion = confirm(
            "¿Está seguro que desea eliminar todos los productos del carrito?"
        );

        if (confirmacion) {
            this.productos.length = 0;
            return alert("Carrito en cero!");
        }
    },
    productosConDetalle: function(){
        const listaProductosConDetalle = [];
        this.productos.forEach(producto => {
        let productoBuscadoBD = listaProductosBD.find(productoBD => productoBD.id == producto.id);
        productoBuscadoBD.cantidad = producto.cantidad;

        listaProductosConDetalle.push(productoBuscadoBD);
        }); 

        return listaProductosConDetalle;
    }
};


document.addEventListener("DOMContentLoaded", (event) => {

    carrito.agregarProducto(1, 2);
    carrito.agregarProducto(2, 1);
    carrito.agregarProducto(3, 5);

    //console.log(carrito.productosConDetalle());

    function agregarTarjetasProductos(listaProductos){

        let tarjetas = "";

        listaProductos.forEach(producto => {
                        tarjetas += `
                        
                        <div class="row align-items-center text-center mb-3">
                                        <div class="col-3">
                                            <img src="${producto.imagen}" class="img-fluid" style="max-width: 100px; height: auto;" >
                                        </div>

                                        <div class="col-4 d-flex align-items-start">
                                            <p>${producto.nombre}</p>
                                        </div>

                                        <div class="col-3">
                                            <p><strong>$${producto.precio}</strong></p>
                                        </div>

                                        <div class="col-2">
                                            <div class="col-auto">
                                                <div class="quantity-widget">
                                                    <button class="qty-btn minus-btn" type="button">−</button>
                                                    <span class="qty-value">${producto.cantidad}</span>
                                                    <button class="qty-btn plus-btn" type="button">+</button>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Caja clickable (mitad del ancho + color más oscuro) -->
                                    <div class="p-1 bg-secondary-subtle rounded d-flex justify-content-end align-items-center"
                                        style="width:fit-content; cursor: pointer;margin-left: 40px;"
                                        data-bs-toggle="collapse" data-bs-target="#serviciosCollapse${producto.id}">

                                        <span class="fw-normal">
                                            Servicios adicionales:
                                            <strong class="text-success">1 por $14.990</strong>
                                        </span>

                                        <i class="bi bi-caret-down-fill"></i>
                                    </div>

                                    <!-- Contenido desplegable -->
                                    <div id="serviciosCollapse${producto.id}" class="collapse mt-2" style="width: 50%;">
                                        <div class="p-3 border rounded bg-white">
                                            Armado de Silla
                                        </div>
                                    </div>
                                     <hr>
                                     </div>
                                     

            `

                        
            });

        document.getElementById("contenedor-detalle-productos").innerHTML = tarjetas;

        }

    function  cargarDetalleCobro(carrito){
        document.getElementById("costo-envio").innerText = carrito.delivery;
    }

    function main(){
    
        let productos = carrito.productosConDetalle();
        agregarTarjetasProductos(productos);
        cargarDetalleCobro(carrito);
    }
    main();
});




