// CARRITO
const carritoDeCompras = [];
let cantCarrito = carritoDeCompras.length;
let cantUpdate = parseInt(cantCarrito);

const card = document.querySelector('#contenedorProductos');
const carroEmoji = "🛒";
const iconoCandado = "🔐";
card.innerHTML = " ";

// DATA .JSON con fetch
fetch('/json/productos.json')
.then(response => response.json())
.then(dataArray => {
    // CHECKSTOCK
    for (const producto of dataArray) {
        if (producto.stock === false) {
            
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
            class="btnStock hover:cursor-not-allowed px-5 py-1  my-2 text-xs md:text-md w-4/5 lg:h-4/5 lg:w-4/5 lg:px-0 lg:mx-5 md:w-3/5 md:h-4/5 font-serif font-bold lg:text-base lg:font-extrabold md:uppercase rounded-full  bg-neutral-400/75 text-black  border-2 border-gray-900 focus:outline-none tracking-widest lg:tracking-wide">Sin stock ${iconoCandado}</button>
            </div>
            </div>
            </div>
            </div>`;
            $('.btnStock').attr('disabled', 'disabled');
        } else {
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


        const buttonCart = document.querySelectorAll('.añadirAlCarrito')
        for (let botones of buttonCart) {
            botones.addEventListener('click', (e) => {
                // Detectar producto   
                let target = e.target
                console.log('------------------------------------');
                console.log(target.id);
                console.log('------------------------------------');
                let productoParaElCarrito = dataArray.find(prod => prod.id === target.id)
                const existe = carritoDeCompras.includes(productoParaElCarrito)
                
                // Detectar si ya existe en el carrito
                if (existe == true){
            productoParaElCarrito.cantidad ++
            imprimirEnCarrito(producto)
            actualizarTotal()
              eliminarProductosDelCarrito()
            } else{
            carritoDeCompras.push(productoParaElCarrito)
            imprimirEnCarrito(producto)
            actualizarTotal()
            eliminarProductosDelCarrito()
          }  
          })
        }


        


    } 
    
    function eliminarProductosDelCarrito(){
        let buttons = document.querySelectorAll(".botonParaEliminarProducto")
        for(let button of buttons){
            button.addEventListener('click', (e) => {
              let producto = carritoDeCompras.find(productos => productos.id === e.target.id)
              console.log(producto)
              if (producto.cantidad >= 1){
                producto.cantidad --
                $("#productosCarrito").empty()
                imprimirEnCarrito()
                actualizarTotal()
                eliminarProductosDelCarrito()
            } 
            if (producto.cantidad == 0){
                let div = document.getElementById("div" + producto.id)
                div.parentNode.removeChild(div)
                let Array = carritoDeCompras.indexOf(producto);
                carritoDeCompras.splice(Array, 1);
                producto.cantidad = 1
            }
            })
        }
    }


    function imprimirEnCarrito() {
        $("#carrito").empty()
      for (let producto of carritoDeCompras) {
          $("#carrito").append(`
          <div class="productoCarrito" id="div${producto.id}">
              <div class="imagenCarrito">
                  <img src="${producto.img}" alt="Imagen de Producto">
              </div>
              <div class="tituloProductoCarrito">
                  <h3 class="nombreProducto">${producto.nombreProd}</h3>
                  <div class="precioYCantidadProducto">
                      <p id="cantidadProductoCarrito ${producto.id}">${producto.cantidad}x </p>
                      <p class="precioProducto">$${producto.precio}</p>
                  </div>                    
              </div>
              <div class="botonCarrito ">
              <button class="botonParaEliminarProducto" id="${producto.id}">X</button>
              </div>
          </div>
          `);
      }
  }

 


      // Función para actualizar el precio del carrito
      function actualizarTotal(){
        let precioTotalDeCadaProducto = 0
        let precioTotalDelCarrito = 0
        carritoDeCompras.forEach (producto => {
        precioTotalDeCadaProducto = producto.cantidad * producto.precio;
        precioTotalDelCarrito += precioTotalDeCadaProducto;
        // let textoDePrecioTotal = document.querySelector("#totalCarrito");
        // textoDePrecioTotal.innerHTML=`Total: $${precioTotalDelCarrito}`;
        // localStorage.setItem('precioTotal', JSON.stringify(precioTotalDelCarrito));
        });
        }

    
    
  });