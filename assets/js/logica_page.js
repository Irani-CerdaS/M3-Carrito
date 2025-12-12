 const carrito = {
  productos: [],
  delivery: 3_990,
  descuentos: 0,
  buscarProducto: function (id) {
    let productoBuscado = this.productos.find((producto) => producto.id == id);

    // SI ENCUENTRA DEVUELVE EL OBJETO, DE LO CONTRARIO DEVUELVE UNDEFINED
    return productoBuscado;
  },

  actualizarProducto: function (id, cantidad) {
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
      let productoBD = listaProductosBD.find((producto) => producto.id == id);

      if (productoBD) {
        const detalleProducto = {
          id: id,
          cantidad: cantidad,
        };
        this.productos.push(detalleProducto);
      } else {
        return alert("Producto ya no existe en la Base de datos.");
      }
    }
  },
  eliminarProducto: function (id) {
    let indiceElemento = this.productos.findIndex(
      (producto) => producto.id == id
    );

    if (indiceElemento >= 0) {
      let productosEliminados = this.productos.splice(indiceElemento, 1);
      return productosEliminados;
    } else {
      return false;
    }
  },
  cantidadProductos: function () {
    return this.productos.length;
  },
  limpiarCarrito: function () {
    if (this.productos.length == 0) {
      return alert("Carrito vació.");
    }

    this.productos.length = 0;
    return alert("Carrito en cero!");
  },
  productosConDetalle: function () {
    const listaProductosConDetalle = [];
    this.productos.forEach((producto) => {
      let productoBuscadoBD = listaProductosBD.find(
        (productoBD) => productoBD.id == producto.id
      );
      productoBuscadoBD.cantidad = producto.cantidad;

      listaProductosConDetalle.push(productoBuscadoBD);
    });

    return listaProductosConDetalle;
  },
  //NUEVOS METODOS DE TOTALES
  subtotal: function () {
    let productos = this.productosConDetalle();

    let subtotal = 0;

    productos.forEach((producto) => {
      subtotal += producto.precio * producto.cantidad;
    });
    return subtotal;
  },
  totalConImpuestos: function () {
    let total = this.subtotal() + this.totalDelivery();
    return total;
  },
  totalDelivery: function () {
    if (this.productos.length > 0) {
      return this.delivery;
    } else {
      return 0;
    }
  },
};

function eliminarProducto(id, nombre) {
  let productosEliminados = carrito.eliminarProducto(id);
  console.log(productosEliminados);
  let producto = productosEliminados[0];
  if (producto) {
    alert(
      `Producto con ID: ${producto.id} (${nombre}) eliminado correctamente.`
    );
    main();
  } else {
    alert("Este producto ya no se encuentra en su carrito");
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  carrito.agregarProducto(1, 2);
  carrito.agregarProducto(2, 1);
  carrito.agregarProducto(3, 5);

  //console.log(carrito.productosConDetalle());

  function agregarTarjetasProductos(listaProductos) {
    let tarjetas = "";

    listaProductos.forEach((producto) => {
      tarjetas += `
                        
                        <div class="row align-items-center text-center mb-3">
                                        <div class="col-3">
                                            <img src="${producto.imagen}" class="img-fluid" style="max-width: 100px; height: auto;">
                                        </div>

                                        <div class="col-4 d-flex align-items-start">
                                            <p>${producto.nombre}</p>
                                        </div>

                                        <div class="col-2">
                                            <p><strong>$${producto.precio}</strong></p>
                                        </div>
                                        

                                        <div class="col-3">
                                            <div class="col-auto">

                                                <div class="quantity-widget d-flex align-items-center">
                                                <button class="qty-btn minus-btn" type="button" data-id="${producto.id}">−</button>
                                                    <span class="qty-value">${producto.cantidad}</span>
                                                    <button class="qty-btn plus-btn" type="button" data-id="${producto.id}">+</button>
                                                    <i class="bi bi-trash ms-5 mb-1" onclick="eliminarProducto(${producto.id}, '${producto.nombre}')"></i>
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
            `;
    });

    document.getElementById("contenedor-detalle-productos").innerHTML =
      tarjetas;
  }

  function cargarDetalleCobro(carrito) {
    document.getElementById("costo-envio").innerText = carrito.totalDelivery().toLocaleString("es-CL");
    document.getElementById("subtotal").innerText = carrito.subtotal().toLocaleString("es-CL");
    document.getElementById("total-con-impuestos").innerText = carrito.totalConImpuestos().toLocaleString("es-CL");
    document.getElementById("btn-pago").innerText = carrito.totalConImpuestos().toLocaleString("es-CL");
  }

  document.getElementById("btn-vaciar-carro").addEventListener("click", (event) => {
      let confirmacion = confirm(
        "¿Esta seguro que desea eliminar todos los productos del carrito"
      );

      if (confirmacion) {
        carrito.limpiarCarrito();
        main();
      }
    });

  //LOGICA INGRESO CUPONES 

   let elementCodigoCupon = document.getElementById("cod-cupon");
    let btnCupon = document.getElementById("btn-cupon");

    btnCupon.addEventListener("click", (event) => {
        let codigoCupon = elementCodigoCupon.value;

        if(codigoCupon.length == 0){
            alert("Debe ingresar un código de cupón válido");
        }else {
        
          let respuesta = carrito.ingresoCupon(codigoCupon);

            if(respuesta){
                cargarDetalleCobro(carrito);
                elementCodigoCupon.value = "";
            }
            else{
                alert("Error al intentar ingresar el cupón, debe válidar el código ingresado.");
            }

        }


    });
    
  window.main = () => {
    let productos = carrito.productosConDetalle();
    agregarTarjetasProductos(productos);
    cargarDetalleCobro(carrito);
  };

  main();
});
