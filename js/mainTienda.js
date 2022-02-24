// CARRITO
const carritoDeCompras = [];
let cantCarrito = carritoDeCompras.length;
let cantUpdate = parseInt(cantCarrito);

//container tienda 
const card = document.querySelector('#contenedorProductos');
card.innerHTML = " ";
// emojis
const carroEmoji = "🛒";
const iconoCandado = "🔐";

// DATA .JSON con fetch
fetch('/json/productos.json')
    .then(response => response.json())
    .then(dataArray => {
        // CHECKSTOCK
        for (const producto of dataArray) {
            if (producto.stock === false) {
                // si no tiene stock imprimimos esta carta con boton de compra deshabilitado
                card.innerHTML += `
            <div class="container my-10 mx-auto max-w-sm w-72 md:w-3/5 p-4">
            <div class="card flex flex-col justify-center p-10 bg-neutral-400/50 rounded-sm shadow-lg">
            <input value="${producto.id}" type="hidden">
            <div class="prod-title">
            <p class="md:uppercase font-mono text-xs md:text-md md:text-lg text-center text-black space-letter">
            ${producto.nombreProd}
            </p>
            </div>
            <div class="prod-img opacity-25	">
            <img src="${producto.img}"
            class="w-full rounded rounded-3xl py-2 object-cover object-center"/>
            </div>
            <div class="prod-info grid pt-3 w-full h-2/5 gap-10">
            <div class="flex flex-col md:flex-row justify-between items-center text-gray-900">
            <p class="font-bold text-xl font-serif">$${producto.precio}</p>
            <button
            class="btnStock outline-offset-8 hover:cursor-not-allowed px-5 py-1  my-2 text-xs md:text-md w-4/5 lg:h-4/5 lg:w-4/5 lg:px-0 lg:mx-5 md:w-3/5 md:h-4/5 font-serif font-bold lg:text-base lg:font-extrabold md:uppercase rounded-full  bg-neutral-400/75 text-black  border-2 border-gray-900 focus:outline-none tracking-widest lg:tracking-wide">Sin stock ${iconoCandado}</button>
            </div>
            </div>
            </div>
            </div>`;
                $('.btnStock').attr('disabled', 'disabled');
            } else {
                // si tiene stock imprimos esta carta
                card.innerHTML += `
          <div class="container my-10 mx-auto max-w-sm w-72 md:w-3/5 p-4">
          <div class="card flex flex-col justify-center p-10 bg-neutral-400/50 rounded-sm shadow-lg">
          <input value="${producto.id}" type="hidden">
          <div class="prod-title">
          <p class="md:uppercase font-mono text-xs md:text-md md:text-lg text-center text-black space-letter">
          ${producto.nombreProd}
          </p>
          </div>
          <div class="prod-img ">
          <img src="${producto.img}"
          class="w-full rounded rounded-3xl py-2 object-cover object-center" />
          </div>
          <div class="prod-info grid pt-3 w-full h-2/5 gap-10">
          <div class="flex flex-col md:flex-row justify-between items-center text-gray-900">
          <p class="font-bold text-xl font-serif">$${producto.precio}</p>
          <button id="${producto.id}"
          class="añadirAlCarrito px-5 py-1  my-2 text-xs md:text-md w-4/5 lg:h-4/5 lg:w-4/5 lg:px-0 lg:mx-5 md:w-3/5 md:h-4/5 font-serif font-bold lg:text-base lg:font-extrabold ease-in duration-200 md:uppercase rounded-full bg-gray-800 hover:bg-neutral-400/75 hover:text-white text-white border-2 border-gray-900 focus:outline-none tracking-widest lg:tracking-wide">Añadir ${carroEmoji}</button>
          </div>
          </div>
          </div>
          </div>`;
            }

            // boton de agregar al carrito
            const buttonCart = document.querySelectorAll('.añadirAlCarrito')
            // recorremos los botones de todas las cards y le asignamos el evento on click
            for (let botones of buttonCart) {
                botones.addEventListener('click', (e) => {
                    // Detectar producto   
                    let target = e.target
                    let productoParaElCarrito = dataArray.find(prod => prod.id === target.id)
                    const existe = carritoDeCompras.includes(productoParaElCarrito)

                    // Detectar si ya existe en el carrito
                    if (existe == true) {
                        productoParaElCarrito.caja++
                        imprimirEnCarrito()
                        actualizarTotal()
                        eliminarProductosDelCarrito()
                    } else {
                        carritoDeCompras.push(productoParaElCarrito)
                        imprimirEnCarrito()
                        actualizarTotal()
                        eliminarProductosDelCarrito()
                    }
                })
            }





        }

        function eliminarProductosDelCarrito() {
            // boton para eliminar prod del carrito
            let buttons = document.querySelectorAll(".botonParaEliminarProducto")
            for (let button of buttons) {
                button.addEventListener('click', (e) => {
                    let producto = carritoDeCompras.find(productos => productos.id === e.target.id)
                    if (producto.caja >= 1) {
                        producto.caja--
                        $("#productosCarrito").empty()
                        imprimirEnCarrito()
                        actualizarTotal()
                        eliminarProductosDelCarrito()
                    }
                    if (producto.caja == 0) {
                        let div = document.getElementById("div" + producto.id)
                        div.parentNode.removeChild(div)
                        let Array = carritoDeCompras.indexOf(producto);
                        carritoDeCompras.splice(Array, 1);
                        producto.caja = 1
                    }
                })
            }
        }


        function imprimirEnCarrito() {
            $("#carrito").empty()
            for (let producto of carritoDeCompras) {
                $("#carrito").append(`
          <div class="productosCarrito flex items-center gap-6 justify-between md:gap-10 mt-6 px-3 h-max" id="div${producto.id}">
              <div class="imagenCarrito cover h-min w-1/4 lg:w-1/3">
                  <img class="rounded-md" src="${producto.img}" alt="Imagen de Producto">
              </div>
              <div class="tituloProductoCarrito text-white py-2 my-1">
                  <h3 class="nombreProducto text-md md:text-lg font-semibold">${producto.nombreCarrito}</h3>
                  <div class="precioYCantidadProducto py-4">
                      <p id="cantidadProductoCarrito ${producto.id}" class="text-xs md:text-lg text-center my-4">${producto.caja} Caja </p>
                      <p class="precioProducto bottom-0 text-center tracking-widest md:text-lg font-semibold">$${producto.precio}</p>
                  </div>                    
              </div>
              <div class="botonCarrito bg-black right-0">
              <button class="botonParaEliminarProducto bg-black text-white font-extrabold py-2 px-4 rounded w-6 h-5 mt-4" id="${producto.id}">X</button>
              </div>
              </div>
              `);
            }

        }




        // Función para actualizar el precio del carrito
        function actualizarTotal() {
            let precioTotalDeCadaProducto = 0
            let precioTotalDelCarrito = 0
            carritoDeCompras.forEach(producto => {
                let productoCaja = producto.caja;
                productoCaja === producto.precio;
                precioTotalDeCadaProducto = productoCaja * producto.precio;
                precioTotalDelCarrito += precioTotalDeCadaProducto;
                localStorage.setItem('precioTotal', JSON.stringify(precioTotalDelCarrito));
                let textoDePrecioTotal = document.querySelector("#totalCarrito");
                textoDePrecioTotal.innerHTML = "";
                textoDePrecioTotal.innerHTML += `Total: $${precioTotalDelCarrito}`;
            });
        }



    });

//   animacion titulo carrito onclick jquery

const mostrarTituloCarrito = () => {
    $('#tituloCarrito').slideToggle(300, 'slow');
}