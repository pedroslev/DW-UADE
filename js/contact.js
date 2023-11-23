"use strict";

const confirmarReserva = (event) => {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value
    const apellido = document.getElementById("apellido").value
    const email = document.getElementById("email").value
    const telefono = document.getElementById("phoneNumber").value
    const marca = document.getElementById("inputBrand").value
    const modelo = document.getElementById("inputModel").value
    const anio = document.getElementById("inputYear").value

    if(nombre == "" || apellido == "" || email == "" || telefono == "" || marca == "" || modelo == "" || anio == ""){
        alert("Por favor. Debe completar todos los campos")
    }else{
        var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {})
        myModal.show()
    }
};

const confirmarButton = document.getElementById("confirmarReserva");
confirmarButton.addEventListener("click", confirmarReserva);

document.addEventListener("DOMContentLoaded", () => {
    let kart = JSON.parse(localStorage.getItem('kart')) || [];
    console.log(`kart is: ${kart}`)
    let total = 0;
    kart.forEach(item => {
        total += item.precio;
    });

    const lista = document.getElementById("kartDetails");
    kart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.servicio} - $${item.precio}`;
    li.classList.add('list-group-item');
    lista.appendChild(li);
    });

    let totalItem = document.createElement('li');
    totalItem.textContent = `Total:   $${total}`;
    totalItem.classList.add('list-group-item');
    lista.appendChild(totalItem);

});

