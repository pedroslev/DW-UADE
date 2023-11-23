"use strict";

//cada onclick de servicios se agrega al localStorage.
const addToKart = (servicio, precio) => {
    let kart = JSON.parse(localStorage.getItem('kart')) || [];
    kart.push({ servicio, precio });
    localStorage.setItem('kart', JSON.stringify(kart));
    //deshabilito el boton para no volver a agregar el mismo servicio al carro.
    document.getElementById(servicio).disabled = true;
};

//filtro el servicio recibido del json de kart y lo actualizo. Despues habilito nuevamente el boton para que se pueda volver a agregar al carrito.
const delFromKart = (servicio) => {
    let kart = JSON.parse(localStorage.getItem('kart')) || [];
    kart = kart.filter(item => item.servicio !== servicio);
    localStorage.setItem('kart', JSON.stringify(kart));
    //vuelvo a habilitar el boton por si el usuario quiere agregar el servicio nuevamente
    document.getElementById(servicio).disabled = false;
    kart.forEach(item => {
        //recalculo el total del carrito
        let total = 0;
        total += item.precio;
        let totalItem = document.getElementById("totalPrice");
        totalItem.textContent = `Tu carrito:  $${total}`;
    })
};

//obtengo el carro de compras del localStorage y lo retorno
const getKart = () => {
    let kart = JSON.parse(localStorage.getItem('kart')) || [];
    return kart;
};

//Renderizo el carro de compras en el dom
const renderKart = () => {
    const kartItems = getKart();
    const kartList = document.getElementById('kartList');
    // Limpio el listado de productos
    kartList.innerHTML = '';

    //si el largo de mi kart es 0, no hay productos, por ende lo notifico
    if (kartItems.length === 0) {
        let totalItem = document.getElementById("totalPrice");
        totalItem.textContent = `Tu carrito: $0`;
        document.getElementById("payButton").disabled = true;
        const li = document.createElement('li');
        li.textContent = 'No hay productos aún';
        kartList.appendChild(li);
    } else {
        document.getElementById("payButton").disabled = false;
        let total = 0
        // adiciono items al carro
        kartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.servicio} - $${item.precio}`;

            //Creo el boton de quitar elemento del carro
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'quitar';
            deleteButton.type = 'button';
            deleteButton.classList.add('btn', 'btn-danger', 'kart-del-btn'); 

            total = total + item.precio;
            //evento de click para eliminar el item del carro y re-renderizar
            deleteButton.addEventListener('click', () => {
                delFromKart(item.servicio);
                renderKart(); // Re-render del carro tras eliminacion
            });

            // Append delete button to li
            li.appendChild(deleteButton);
            //agregado de li item al ol
            kartList.appendChild(li);
            let totalItem = document.getElementById("totalPrice");
            totalItem.textContent = `Tu carrito:  $${total}`;
        });
    }
}

//Esta funcion elimina el localStorage y re-renderiza el carrito de compras
const emptyKart = () => {
    //traigo items del localStorage
    let items = JSON.parse(localStorage.getItem('kart'));
    //recorro para habilitar los botones de los anteriormente deshabilitados
    for (let i = 0; i < items.length; i++) {
        document.getElementById(items[i].servicio).disabled = false;
    }
    //borro y re renderizo localstorage
    localStorage.clear();
    renderKart();
}

//cada vez que se recibe un evento de click del boton de carro de compras se re-renderiza el carro.
const shoppingKartButton = document.getElementById('shoppingKartButton');
shoppingKartButton.addEventListener('click', renderKart);


//cada vez que se recibe un evento de click del boton de vaciar carro de compras se vacia el carro.
const deleteKartButton = document.getElementById("deleteKart");
deleteKartButton.addEventListener("click", emptyKart);
