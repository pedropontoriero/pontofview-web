document.addEventListener("DOMContentLoaded", function () {
    let gif = document.getElementById("fondo_subte");
    let png = document.getElementById("fondo_fijo_subte");
    let contenedor_hori = document.getElementById("contenedor_hori");
    let contenedor_ver = document.getElementById("contenedor_ver");

    

setTimeout(function() {
        contenedor_hori.style.backgroundImage = "url('img/Subte_fijo_exp2.png')"; // Último frame del GIF
    }, 3000); // Ajusta el tiempo en milisegundos (ejemplo: 3 segundos)
    

setTimeout(function() {
    contenedor_ver.style.backgroundImage = "url('img/Subte_resp_fijo_exp1.png')"; // Último frame del GIF
}, 3000); // Ajusta el tiempo en milisegundos (ejemplo: 3 segundos)


});

