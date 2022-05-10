console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');

//-- Botones
grises = document.getElementById('grises');
//-- Acceso al deslizador
const deslizador = document.getElementById('deslizador');
const deslizadorverde = document.getElementById('deslizadorverde');
const deslizadorazul = document.getElementById('deslizadorazul');
//-- Valor del deslizador
const range_value = document.getElementById('range_value');
const range_valueverde = document.getElementById('range_valueverde');
const range_valueazul = document.getElementById('range_valueazul');
//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista...");
};

grises.onclick=()=>{
  //-- Obtener la imagen del canvas en pixeles
  var imgDatagris = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //-- Obtener el array con todos los píxeles
  var data = imgDatagris.data;

  for (var i = 0; i < data.length; i+=4) {
      rojo = data[i];
      verde = data[i+1];
      azul = data[i+2];
      brillo = (3 * rojo + 4 * verde + azul)/8;1
      data[i] = brillo;
      data[i+1] = brillo;
      data[i+2] = brillo;
  }
  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgDatagris, 0, 0);
}

//-- Funcion de retrollamada del deslizador
deslizador.oninput = () => {
  //-- Mostrar el nuevo valor del deslizador
  range_value.innerHTML = deslizador.value;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Obtener el umbral de rojo del desliador
  umbral = deslizador.value
  umbralverde = deslizadorverde.value
  umbralazul = deslizadorazul.value
  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbral)
      data[i] = umbral;
    if (data[i+1] > umbralazul)
        data[i+1] = umbralazul;
    if (data[i+2] > umbralverde)
        data[i+2] = umbralverde;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

//-- Funcion de retrollamada del deslizador
deslizadorverde.oninput = () => {
  //-- Mostrar el nuevo valor del deslizador
  range_valueverde.innerHTML = deslizadorverde.value;
  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);
  //-- Obtener la imagen del canvas en pixeles
  let imgDataverde = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //-- Obtener el array con todos los píxeles
  let data = imgDataverde.data

  //-- Obtener el umbral de rojo del desliador
  umbral = deslizador.value
  umbralverde = deslizadorverde.value
  umbralazul = deslizadorazul.value

  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbral)
      data[i] = umbral;
    if (data[i+1] > umbralazul)
        data[i+1] = umbralazul;
    if (data[i+2] > umbralverde)
        data[i+2] = umbralverde;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgDataverde, 0, 0);
}
deslizadorazul.oninput = () => {
  //-- Mostrar el nuevo valor del deslizador
  range_valueazul.innerHTML = deslizadorazul.value;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  let imgDataazul = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgDataazul.data

  //-- Obtener el umbral de rojo del desliador
  umbral = deslizador.value
  umbralverde = deslizadorverde.value
  umbralazul = deslizadorazul.value

  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbral)
      data[i] = umbral;
    if (data[i+1] > umbralazul)
        data[i+1] = umbralazul;
    if (data[i+2] > umbralverde)
        data[i+2] = umbralverde;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgDataazul, 0, 0);
}

console.log("Fin...");