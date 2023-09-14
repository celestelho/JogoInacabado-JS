
//variáveis da posição do personagem
var posx = 100
var posy = 350
var vely = 10

//Variaveis de cena
var colidindoR = false
var colidindoL = false//colidindo com paredes
var apoiadoR = false  //apoiado no chão
var apoiadoL = false
var x = 0 //usado nos laços For para colisão com plataformas e chãos
var i = 0 //usado nos laços com plataformas
var cen = 0
//colisões
var chao = 450
var platL = 0
var platR = 0
var paredeL = 0
var paredeR = 666
var pass = 'fechado' //variável da passagem

var altura = 'semvalor' //variável do pulo

var contador = 1
var contado = 0

//Setup
function setup() {
  createCanvas(650, 500);
  faselua = random(windowWidth)
}

//Função do pulo
function pulo(){
  if(altura == 'semvalor'){
    altura = posy - 150
    apoiadoR = false
    apoiadoL = false
    //console.log(altura)
    }
    if(posy > altura){
      posy -= vely
    }
    if(posy <= altura){
      vely = 0
    }
  }


//----Função do cenário----//
function cenario(){
  if(cen == 0){
    //chao = 450
    //paredeL = 100
    platR = [[550, 400]]
    platL = [[650, 450], [50, 180]]
    fill('brown')
    rect(560, 400, 100, 50)
    rect(0, 200, 50, 300)
    fill('green')
    rect(0, 450, 650, 50)
    rect(550, 400, 100, 20) 
    rect(0, 180, 50, 20)
  }
  
  //----segundo cenário----//
  else if(cen == 1){
    //Colisào da plataforma
    if(pass =='fechado'){
      platR = [[400, 275]]
    }
    else{
      platR = [[585, 275]]
    }
    platL = [[400, 400]]
    chao = 500
    fill('brown')
    //triangulo = [ponto1[400, 400], ponto2[400, 500], ponto3[550, 500]]
    //p2 ao p3 parte de colisão
    triangle(400, 400, 400, 500, 550, 500)
    fill('green')
    triangle(400, 275, 650, 275, 650, 400)
    rect(0, 400, 400, 100)
    if(posx == 375){
      if(mouseIsPressed){
        if(pass == 'fechado'){
          pass = 'aberto'
        rect(0, 400, 400, 100)
        }  }  }
    
    if(pass == 'fechado'){
    rect(400, 275, 250, 126)
    rect(0, 400, 650, 100)
    }  
    //colisão triângulo
  if(posx+25 >= 400 && posx+25 <= 550 && posy+25 >= 400 && posy+25 <= 500){
    colidindoR = true
    apoiadoR = true
    colidindoL = true
    apoiadoL = true
    console.log('colisão')
  }
  }  }
//colisões especiais
  //-----TRIANGULO-----

//Jogo
function draw() {
    background(0)
  //lua
  fill('white')
  circle(windowWidth/2, 100, 200)
  fill('black')
  circle(faselua, 100, 200)
  
  cenario()
  
  //Personagem
  fill('purple')
  circle(posx, posy, 50)
  
  //Pulo
    if(keyIsDown(UP_ARROW)){
      pulo()
  }
  else{
    vely = 0}
  
  //Quedas
    apoiadoR = false
  for(x = 0; x < platR.length; x++){
    if(posx >= platR[x][0] && posy+25 >= platR[x][1]){
    apoiadoR = true
  }  }
  apoiadoL = false
   for(x = 0; x < platL.length; x++){
    if(posx <= platL[x][0] && posy+26 >= platL[x][1]){
    apoiadoL = true
  }  }
  if(apoiadoR == false && apoiadoL == false){
    if(posy+25 >= chao){
    apoiado = true
    //console.log('chao caido')
  }  }
  if(apoiadoR == false && apoiadoL == false){
    posy += 5
  }
  if(apoiadoR == true || apoiadoL == true){
    vely = 20
    altura = 'semvalor'
  }

  //Direita
  if(keyIsDown(RIGHT_ARROW)){
    colidindoR = false
    for(i = 0; i < platR.length; i++){
    if(posx+26 >= platR[i][0] && posy >= platR[i][1]){
      colidindoR = true
    }  }
    if(colidindoR == false){
      posx += 5
    }
    if(posx+25 >= 650){
      posx = 0
      cen ++
      paredeL = 0
      paredeR = 666
      chao = 0
    }  }
  
  //Esquerda
  if(keyIsDown(LEFT_ARROW)){
    colidindoL = false
    for(i = 0; i < platL.length; i++){
    if(posx-26 <= platL[i][0] && posy >= platL[i][1]){
      colidindoL = true
    }  }
    if(posx+25 <= paredeL){
    colidindoL = true
    }
    if(colidindoL == false){
      posx -= 5
    }
    if(posx <= 0){
      posx = 650
      cen --
      paredeL = 0
      paredeR = 666
      chao = 0
    }  }
  
  //facilitação
  if(mouseIsPressed){
    console.log('MouseX:', mouseX)
    console.log('MouseY:', mouseY)
    contador ++
  }  }  

