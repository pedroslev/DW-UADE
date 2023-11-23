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
        alert("Debe completar todos los campos")
    }else{
        var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {})
        myModal.show()
    }
};

const confirmarButton = document.getElementById("confirmarReserva");
confirmarButton.addEventListener("click", confirmarReserva);