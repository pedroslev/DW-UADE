"use strict";

const confirmarReserva = (event) => {
    //prevent del comportamiento normal del modal de bootstrap
    event.preventDefault();
    //validacion de campos
    const nombre = document.getElementById("nombre").value
    const apellido = document.getElementById("apellido").value
    const email = document.getElementById("email").value
    const telefono = document.getElementById("phoneNumber").value
    const marca = document.getElementById("inputBrand").value
    const modelo = document.getElementById("inputModel").value
    const anio = document.getElementById("inputYear").value
    //validacion de campos
    if(nombre == "" || apellido == "" || email == "" || telefono == "" || marca == "" || modelo == "" || anio == ""){
        alert("Por favor. Debe completar todos los campos")
    }else{
        //muestreo de modal
        var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {})
        myModal.show()
    }
};

//listener para el boton de confirmacion
const confirmarButton = document.getElementById("confirmarReserva");
confirmarButton.addEventListener("click", confirmarReserva);

document.addEventListener("DOMContentLoaded", () => {
    //obtengo el carro de compras del localStorage
    let kart = JSON.parse(localStorage.getItem('kart')) || [];
    console.log(`kart is: ${kart}`)
    let total = 0;
    kart.forEach(item => {
        total += item.precio;
    });

    //agrego los items al listado
    const lista = document.getElementById("kartDetails");
    kart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.servicio} - $${item.precio}`;
    li.classList.add('list-group-item');
    lista.appendChild(li);
    });

    //agrego el total al final de la lista
    let totalItem = document.createElement('li');
    totalItem.textContent = `Total:   $${total}`;
    totalItem.classList.add('list-group-item');
    lista.appendChild(totalItem);

});

//obtengo el carro de compras del localStorage y lo retorno
const closeButtonContact = document.getElementById("closeButtonContact");
closeButtonContact.addEventListener("click", () => {
    localStorage.clear();
});