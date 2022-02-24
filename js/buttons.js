// menu hamburguesa

// ABRIR MENU NAV RESPONSIVE
const openMenu = () => {
    let menu = document.getElementById('menuBurger')

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
}



// ABRIR CARRITO FUNCTION

let x = $(document);
x.ready(inicializarEventos);

// $('#menuBurger').hide();
$('#cartEntero').hide();
// EJECUCION CLICK AÑADIR CARRITO
function inicializarEventos() {
    let btn = $('#btnBurger')
    let x = $('#btnCarrito');
    btn.click(verOcultarMenu)
    x.click(ocultarMostrarCarrito);
}

function verOcultarMenu() {
    let menu = $('#menuBurger');
    if (menu.is(':hidden')) {
        menu.slideDown("fast");
    } else {
        menu.slideUp('slow');
    }
    // menu.slideToggle('fast', 'linear');
    activarDesactivarScroll()
}

function ocultarMostrarCarrito() {
    let x = $('#cartEntero');
    if (x.is(':hidden')) {
        x.slideDown("fast");
    } else {
        x.slideUp('slow');
    }
    if($(window).width() > 1024){
        activarDesactivarScroll()
    }
}

function activarDesactivarScroll() {
    $('body').toggleClass('activeScroll')
}




if ($(window).width() < 1024) {
    $('#menuBurger').hide();
    // verOcultarMenu()
} else {
    $('#menuBurger').show();
}


// if ($(window).width() >= 768) {
//     $('#bodyContacto').addClass('overflow-y-hide')
// }
