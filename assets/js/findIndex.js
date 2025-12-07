let producto1 = {
    id:1, 
    precio: 198_000, 
    nombre: "Sillón Huevo Diseño Moderno", 
    categoria: "Jardín y terraza",
};
let producto2 = {
    id:2, 
    precio: 144_990, 
    nombre: "Cómoda 6 cajón Naia", 
    categoria: "Muebles de Dormitorio",
};
let producto3 = {
    id:3, 
    precio: 84_990, 
    nombre: "Espejo joyero organizador blanco", 
    categoria: "Decoración Y hogar",
};
const elementosCarrito ={producto1, producto2, producto3};

let idBuscado = 2;
let indiceElemento = elementosCarrito.findIndex(producto => producto.id == idBuscado);

console.log(indiceElemento);


