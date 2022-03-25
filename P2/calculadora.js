console.log("Ejecutando JS...");

//-- Estados de la calculadora
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3
}

//-- Leer y almacenar los elementos de entrada
display = document.getElementById("display")
digitos = document.getElementsByClassName("digito") 
operadores = document.getElementsByClassName("operador") 
igual = document.getElementById("igual")
AC = document.getElementById("AC")
borrar = document.getElementById("delete")

//-- Al principio la calculadora se encuentra en estado INIT
let estadocalculadora = ESTADO.INIT;

 //-- Función manejadora de los números introducidos
function digito(ev){
    if (estadocalculadora == ESTADO.INIT) {
        display.innerHTML = ev.target.value;
        estadocalculadora = ESTADO.OP1;
    } else if (estadocalculadora == ESTADO.OP1){
        display.innerHTML += ev.target.value;
    } else if (estadocalculadora == ESTADO.OPERATION){
        display.innerHTML += ev.target.value;
        estadocalculadora = ESTADO.OP2;
    } else if (estadocalculadora == ESTADO.OP2){
        display.innerHTML += ev.target.value;
    }
}

//-- Llamar a la función digito siempre que se introduzca un número
for (let boton of digitos) {
    boton.onclick = digito;
}

//-- Establecer la misma función de retrollamada
//-- para todos los botones de tipo signo
for (let boton of operadores) {
    boton.onclick = (ev) => {
      if(estadocalculadora == ESTADO.OP1){
        display.innerHTML += ev.target.value;
       estadocalculadora = ESTADO.OPERATION;
      }
    }
}

//-- Evaluar la expresión introducida
igual.onclick = () =>  {
    if(estadocalculadora == ESTADO.OP1 ||  estadocalculadora == ESTADO.OP2){
    display.innerHTML = eval(display.innerHTML);
    estadocalculadora = ESTADO.OP1;
    }
}
  
//-- Borrar último elemento introducido
borrar.onclick = () => {
    display.innerHTML = display.innerHTML.slice(0,-1);
    if (display.innerHTML == 0){
      display.innerHTML = "0";
      console.log("Delete");
      estadocalculadora = ESTADO.INIT;
    }
}

//-- Volver al estado inicial con el boton AC
AC.onclick = () => {
    display.innerHTML = "0";
    console.log("AC");
    estadocalculadora = ESTADO.INIT;
}