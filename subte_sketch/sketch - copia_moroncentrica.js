let lines = [];
let cities = [
  "La Matanza", "San Justo", "Ramos Mejía", "Lomas del Mirador", "Villa Luzuriaga",
  "González Catán", "Virrey del Pino", "Isidro Casanova", "Gregorio de Laferrere",
  "Ciudad Evita", "Tapiales", "Aldo Bonzi", "Villa Madero", "Morón", "Castelar",
  "Castelar Norte", "Castelar Sur", "Haedo", "Haedo Norte", "Haedo Sur",
  "El Palomar", "Gervasio Pavón", "Hurlingham", "Villa Tesei", "William Morris",
  "Ituzaingó", "Villa Udaondo", "San Alberto", "Parque Leloir", "Merlo",
  "Merlo Centro", "Parque San Martín", "Libertad", "Pontevedra", "San Antonio de Padua"
];

let lastUpdate = 0; // Variable para controlar la actualización cada 2 segundos
let fontNeo;
let fontNarrow;
let myCanvas;
let startX = 100;
let startY = 100;


function setup() {
  let cnv = createCanvas(1920, 1080);
  cnv.parent("contenedorCanvas"); // Lo agrega dentro del div
  generateLines(); // Generar líneas al inicio

}

function draw() {
 background(255,255,255,0);
  for (let line of lines) {
    line.display();
  }
}
function generateLines() {
  lines = []; // Reiniciar las líneas
  let numLines = int(random(1, 2));

  for (let i = 0; i < numLines; i++) {
    let edge = int(random(4));
    let x,y;

    if (edge === 0) { x = random(10, 1080); y = height / 10; }
    else if (edge === 1) { x = width - width / 10; y = random(10, 1080); }
    else if (edge === 2) { x = random(10, 1080); y = height - height / 10; }
    else { x = width / 10; y = random(10, 1080); }

    let numTurns = int(random(1, 2));
    let stopDistance = random(700, 700);
    lines.push(new RandomLine(x, y, edge, numTurns, stopDistance));
  }
}

class RandomLine {
  constructor(x, y, edge, numTurns, stopDistance) {
    this.points = [{ x, y }];
    this.color = color(random(255), random(255), random(255));
    this.stopDistance = stopDistance;
    this.cityNames = [];
    this.generatePath(edge, numTurns);

    for (let i = 0; i < this.points.length; i++) {
      this.cityNames.push(random(cities));
    }
  }

 generatePath(edge, numTurns) {
    this.points = [];  // Asegura que el array comienza vacío

    let lastX = 720;  // Fija el primer punto en 600,600
    let lastY = 590;
    let dirX = 0, dirY = 0;
    let lastTurnDirection = null;
    let totalDistance = 0;

    this.points.push({ x: lastX, y: lastY }); // Agrega el primer punto fijo

    if (edge === 0) dirY = 1;
    if (edge === 1) dirX = -1;
    if (edge === 2) dirY = -1;
    if (edge === 3) dirX = 1;

    for (let i = 0; i < numTurns; i++) {
        let segmentLength = random(200, 350);
        totalDistance += segmentLength;
        if (totalDistance > this.stopDistance) break;

        // Evitar que se genere un nodo en (0,0)
let newX = lastX + dirX * segmentLength;
let newY = lastY + dirY * segmentLength;

// Aseguramos que no toque (0,0)
if (newX < 50) newX = 50; 
if (newY < 50) newY = 50;  
if (newX > width - 50) newX = width - 50;
if (newY > height - 50) newY = height - 50;

this.points.push({ x: newX, y: newY });

lastX = newX;
lastY = newY;


        let angleChoice;
        do {
            angleChoice = random(0, 45);
        } while (lastTurnDirection === angleChoice);

        let angleRad = radians(angleChoice);
        let newDirX = cos(angleRad) * dirX - sin(angleRad) * dirY;
        let newDirY = sin(angleRad) * dirX + cos(angleRad) * dirY;

        dirX = round(newDirX);
        dirY = round(newDirY);
        lastTurnDirection = angleChoice;
    }

    // Agregar un nodo en la posición del mouse
    this.points.push({ x: mouseX, y: mouseY });

    // NO agregamos un nodo en la posición del mouse (esto puede causar problemas)
let possibleEdges = [0, 1, 2, 3].filter(e => e !== edge);
let finalEdge = int(random(possibleEdges));

let finalX = lastX;
let finalY = lastY;

// Ajustamos el último punto para que no se vaya a (0,0)
if (finalEdge === 0) finalY = random(50, height * 0.2); 
if (finalEdge === 1) finalX = random(width * 0.8, width - 50);
if (finalEdge === 2) finalY = random(height * 0.8, height - 50);
if (finalEdge === 3) finalX = random(50, width * 0.2);

this.points.push({ x: finalX, y: finalY });

}



  display() {
    beginShape();
    stroke(this.color);
    strokeWeight(15);
    noFill();
    for (let i = 0; i < this.points.length - 1; i++) {
      let p1 = this.points[i];
      let p2 = this.points[i + 1];
      line(p1.x, p1.y, p2.x, p2.y);
    }
    endShape();

    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];

      fill(255);
      strokeWeight(2);
      stroke(0);
      ellipse(p.x, p.y, 27, 27);

      noFill();
      strokeWeight(7);
      stroke(255);
      ellipse(p.x, p.y, 45, 45);
      
      noFill();
      strokeWeight(2);
      stroke(0);
      ellipse(p.x, p.y, 40, 40);
      
      noFill();
      strokeWeight(2);
      stroke(0);
      ellipse(p.x, p.y, 55, 55);
      
  
      // push();

      // translate(p.x + 30, p.y - 10);
      // rotate(radians(-45));
      // fill(255);
      // strokeWeight(2);
      // stroke(0);
      // textSize(14);
      // textAlign(LEFT);
      // text(this.cityNames[i], 0, 0);
      // pop();
    }

    fill(177, 24, 24);
    noStroke();
    textSize(50);
    textAlign(RIGHT);
  
    text("OESTE METRO MAP", width - 10, 50);
  }
}


function mousePressed() {
  generateLines();
}
