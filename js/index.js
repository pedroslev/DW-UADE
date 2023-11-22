//cada onclick de servicios se agrega al localStorage.
const addToKart = (servicio, precio) => {
    let kart = JSON.parse(localStorage.getItem('kart')) || [];
    kart.push({ servicio, precio });
    localStorage.setItem('kart', JSON.stringify(kart));
    document.getElementById(servicio).disabled = true;
}

//filtro el servicio recibido del json de kart y lo actualizo. Despues habilito nuevamente el boton para que se pueda volver a agregar al carrito.
const delFromKart = (servicio) => {
    let kart = JSON.parse(localStorage.getItem('kart')) || [];
    kart = kart.filter(item => item.servicio !== servicio);
    localStorage.setItem('kart', JSON.stringify(kart));
    document.getElementById(servicio).disabled = false;
}

//obtengo el carro de compras del localStorage y lo retorno
const getKart = () => {
    let kart = JSON.parse(localStorage.getItem('kart')) || [];
    return kart;
}

//renderizo el carro de compras en el dom
const renderKart = () => {
    const kartItems = getKart();
    const kartList = document.getElementById('kartList');
    // Clear existing items in the kart
    kartList.innerHTML = '';

    if (kartItems.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No hay productos aún';
        kartList.appendChild(li);
    } else {
        // Add new items to the kart
        kartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.servicio} - $${item.precio}`;

            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'quitar';
            deleteButton.type = 'button';
            deleteButton.classList.add('btn', 'btn-danger', 'kart-del-btn'); 

            deleteButton.addEventListener('click', () => {
                delFromKart(item.servicio);
                renderKart(); // Re-render the kart after deleting an item
            });

            // Append delete button to li
            li.appendChild(deleteButton);

            kartList.appendChild(li);
        });
    }
}

//cada vez que se recibe un evento de click del boton de carro de compras se re-renderiza el carro.
const shoppingKartButton = document.getElementById('shoppingKartButton');
shoppingKartButton.addEventListener('click', renderKart);