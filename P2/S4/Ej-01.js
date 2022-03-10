//-- Contador de clicks de boton

console.log("Ejecutando JS...");

//-- Acceder a los elementos del DOM
const display = document.getElementById("display");
const boton1 = document.getElementById("boton1");
const boton2 = document.getElementById("boton2");

//-- Configurar retrollamada del boton
boton1.onclick = () => {
    console.log("Boton1 pulsado");
    display.innerHTML += "1";
}
boton2.onclick = () => {
    console.log("Boton2 pulsado");
    display.innerHTML += "2";
}
   