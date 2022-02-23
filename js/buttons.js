// menu hamburguesa

// ABRIR MENU NAV RESPONSIVE
const  openMenu = () => {
    let menu = document.getElementById('menuBurger')

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
}


// ABRIR CARRITO FUNCTION
const openCarrito = () => {
    let carrito = document.getElementById('carrito')
    if (carrito.classList.contains('hidden')) {
        carrito.classList.remove('hidden');
    } else {
        carrito.classList.add('hidden');
    }   
}

// EJECUCION CLICK AÑADIR CARRITO