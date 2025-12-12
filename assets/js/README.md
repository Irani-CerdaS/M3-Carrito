# 🛒 Proyecto Web: Carrito y Contacto (My Home)

Este proyecto está compuesto por dos páginas principales que forman parte de un sitio de e-commerce: el **Carrito de Compras** y un **Formulario de Contacto**.

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura de las páginas.
* **Bootstrap 5:** Framework principal para el diseño y la maquetación responsiva (CSS y JS).
* **JavaScript (JS):** Lógica y validaciones del lado del cliente, especialmente en la página de Contacto.
* **CSS Puro/Externo:** Estilos específicos (`carrito.css`, `contacto.css`).

---

## 📄 Páginas del Proyecto

### 1. 🛍️ Carrito de Compras 

Esta página muestra el resumen de los productos seleccionados y los costos.

* **Función principal:** Detallar el Subtotal, Costo de Envío y el Total.
* **Componente clave:** El formulario para **"Ingresar Cupón"** está diseñado de forma compacta usando el `Input Group` de Bootstrap, colocando el campo de texto y el botón **"Aplicar"** juntos en una sola línea para una mejor experiencia de usuario.

![Captura de pantalla ](/assets/img/Captura%20de%20pantalla%20.png)

### 2. 📧 Formulario de Contacto 

Esta página permite a los usuarios enviar consultas a través de un formulario.

* **Función principal:** Recibir datos del usuario (Nombre, Correo y Mensaje).
* **Validación con JS:** Se incluye código JavaScript en la página para validar los campos del formulario antes de enviarlos (ej: verificar el formato del nombre, la longitud del mensaje y que el correo use dominios específicos como `gmail.com` o `sustantiva.cl`).
* **Botón de Envío:** Utiliza la clase `btn btn-primary` de Bootstrap.

![Captura de pantalla ](/assets/img/Captura%20de%20pantalla%20-Contacto.png)


