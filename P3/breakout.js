console.log("Ejecutando JS...");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ESTADO = {
  START: 0,
  INIT: 1,
  INGAME: 2,
  FINISH: 3,
}

let estado = ESTADO.START;


let x = 300;
let y = 520;


let velx = 4;
let vely = -4;
 

let l = 250;
let p = 530;


let vell = 30;


let lifes = 3;


let rightPressed = false;
let leftPressed = false;
let score = 0;


const LADRILLO = {
  F: 5,  
  C: 9,  
  w: 60, 
  h: 20, 
  origen_x: 8,
  origen_y: 60,
  padding: 5,
  visible: true
};

const ladrillos = [];
for (let i = 0; i < LADRILLO.F; i++) {
    ladrillos[i] = []; 
    for (let j = 0; j < LADRILLO.C; j++) {
      ladrillos[i][j] = {
          x: (LADRILLO.w + LADRILLO.padding) * j +  LADRILLO.origen_x,
          y: (LADRILLO.h + LADRILLO.padding) * i + LADRILLO.origen_y,
          w: LADRILLO.w,
          h: LADRILLO.h,
          padding: LADRILLO.padding,
          visible: LADRILLO.visible
        };
    }
}

function update() 
{
  

     if (x < 0 || x >= (canvas.width - 20) ) {
      velx = -velx;
    }
  

    if (y <= 60) {
      vely = -vely;
    }

    if (y >= 550 ) {
      console.log("fuera");
      estado = ESTADO.START;
      x = 250;
      y = 520;
      vely = -vely;
      velx = -velx;
      lifes -= 1;
      if (lifes == 0) {
        estado = ESTADO.FINISH;
      }
    }


    window.onkeydown = (e) => {
    if (e.key == ' ' && estado == ESTADO.START){
      console.log("DIBUJAR");
      estado = ESTADO.INGAME;
      }
    }
    
    
    if ((x + 10) >= l && x <=(l + 100)  &&
    (y + 5) >= p && y <=(p + 10)) {
    vely = -vely;
    }


    if (estado == ESTADO.INGAME){
      for (let i = 0; i < LADRILLO.F; i++) {
          for (let j = 0; j < LADRILLO.C; j++) {
            if (ladrillos[i][j].visible == true){
                  if ((x + 10) >= ladrillos[i][j].x && x <=(ladrillos[i][j].x + 70) &&
                      (y + 10) >= ladrillos[i][j].y && y <=(ladrillos[i][j].y + 25)) {
                      ladrillos[i][j].visible = false;
                      vely = -vely;
                      if (i==4){
                        score += 1;
                      }else if (i==3){
                        score += 2;
                      }else if (i==2){
                        score += 3;
                      }else if (i==1){
                        score += 4;
                      }else if (i==0){
                        score += 10;
                      }
                      
                  }
            }
          }
      }
    }

  
    
    if (estado == ESTADO.INGAME) {
      x = x + velx;
      y = y + vely;

      window.onkeydown = (e) => {     
        if(e.keyCode == 39 && l < 507) { 
            rightPressed = true;
            l = l + vell;
        }else if(e.keyCode == 37 && l > 2) { 
            leftPressed = true;
            l = l - vell;
        } 
      }
    

        window.onkeyup = (e) => {       
          if (e.keyCode == 39) {
              rightPressed = false;
              
            
          }else if(e.keyCode == 37) {
              leftPressed = false;
              
              
          }
        } 
    }
  
    
  
   
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    

  ctx.beginPath();
  
    if (estado == ESTADO.INGAME) {
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
    }
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#CCFF00';

   
    ctx.fill()

   
    ctx.stroke()
    ctx.closePath();


  ctx.beginPath();
    
    ctx.rect(l ,p , 90, 8);
    ctx.fillStyle = '#000000';
    ctx.stroke()
    ctx.fill()
      
  ctx.closePath()
 
  ctx.font = "25px Arial";
  ctx.fillStyle = '#FF0000';
  ctx.fillText("Score " + score, 10, 40);
  
  if (lifes == 3){
    var img = new Image();
    img.src = "heart.png";
    ctx.drawImage(img, 550, 10, 40, 40);
    ctx.drawImage(img, 500, 10, 40, 40);
    ctx.drawImage(img, 450, 10, 40, 40);
  }else if (lifes == 2){
    var img = new Image();
    img.src = "heart.png";
    ctx.drawImage(img, 550, 10, 40, 40);
    ctx.drawImage(img, 500, 10, 40, 40);
  }else if (lifes == 1){
    var img = new Image();
    img.src = "heart.png";
    ctx.drawImage(img, 550, 10, 40, 40);
  }

  if (score == 180){
  ctx.font = "30px Arial Black";
  ctx.fillStyle = 'green'
  ctx.fillText("YOU WIN!!!", 200, 300);
  estado = ESTADO.FINISH;
  }

  if (lifes == 0){
      ctx.font = "30px Arial Black";
      ctx.fillStyle = 'red'
      ctx.fillText("YOU LOST. TRY AGAIN!!!", 100, 300);
      console.log("Has perdido");
      estado = ESTADO.FINISH;  
  }
 

  //-- Dibujar ladrillos
  for (let i = 0; i < LADRILLO.F; i++) {
    for (let j = 0; j < LADRILLO.C; j++) {

      if (ladrillos[i][j].visible == true) {
        ctx.beginPath();
        ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.w, LADRILLO.h);
        if (i==4){
          ctx.fillStyle = '#CCCCFF';
        }else if (i==3){
          ctx.fillStyle = '#CC99FF';
        }else if (i==2){
          ctx.fillStyle = '#CC66FF';
        }else if (i==1){
          ctx.fillStyle = '#CC00FF';
        }else if (i==0){
          ctx.fillStyle = '#990099';
        }
        
        ctx.fill();
        ctx.closePath();
      
      }else if(ladrillos[i][j].visible == false){
      ladrillos[i][j] = [];
      }
    }
  }
  requestAnimationFrame(update);

}

update();