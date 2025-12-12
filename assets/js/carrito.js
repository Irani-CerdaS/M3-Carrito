const carrito = {
  productos: [],
  delivery: 3990,
  descuentos: 0,
  envioGratisActivado: false,

  buscarProducto(id) {
    return this.productos.find((p) => p.id == id);
  },

  actualizarProducto(id, cantidad) {
    let producto = this.buscarProducto(id);
    if (producto) producto.cantidad = cantidad;
    return producto;
  },

  agregarProducto(id, cantidad = 1) {
    let producto = this.buscarProducto(id);

    if (producto) {
      this.actualizarProducto(id, producto.cantidad + cantidad);
    } else {
      let productoBD = listaProductosBD.find((p) => p.id == id);

      if (productoBD) {
        this.productos.push({ id, cantidad });
      } else {
        alert("Producto ya no existe en la Base de datos.");
      }
    }
  },

  eliminarProducto(id) {
    let indice = this.productos.findIndex((p) => p.id == id);

    if (indice >= 0) {
      return this.productos.splice(indice, 1);
    } else {
      return false;
    }
  },

  cantidadProductos() {
    return this.productos.length;
  },

  limpiarCarrito() {
    if (this.productos.length == 0) return alert("Carrito vacío.");

    this.productos = [];
    this.descuentos = 0;
    this.delivery = 3990;
    this.envioGratisActivado = false;

    alert("Carrito en cero!");
  },

  productosConDetalle() {
    return this.productos.map((p) => {
      let prodBD = listaProductosBD.find((bd) => bd.id == p.id);
      return { ...prodBD, cantidad: p.cantidad };
    });
  },

  subtotal() {
    return this.productosConDetalle().reduce(
      (sum, p) => sum + p.precio * p.cantidad,
      0
    );
  },

  totalDelivery() {
    if (this.envioGratisActivado) return 0;
    return this.productos.length > 0 ? 3990 : 0;
  },

  totalConImpuestos() {
    return this.subtotal() - this.descuentos + this.totalDelivery();
  },

  
 ingresoCupon(cupon){
        let cuponesValidos = ["PROMO10", "ENVIOGRATIS"];

        if(cuponesValidos.includes(cupon)){
            // SIGO CON LA APLICACIÓN DEL DESCUENTO
            console.log(cupon);
            return true;
        }else {
            return false;
        }

    }

};
