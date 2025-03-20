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
  let cnv = createCanvas(windowWidth, windowHeight);
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
    let x = startX;
    let y = startY;

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
    this.color = color(random(255), random(255), random(255), 80);  
    this.stopDistance = stopDistance;
    this.cityNames = [];
    this.generatePath(edge, numTurns);

    for (let i = 0; i < this.points.length; i++) {
      this.cityNames.push(random(cities));
    }
  }

  generatePath(edge, numTurns) {
    let lastX = this.points[0].x;
    let lastY = this.points[0].y;
    let dirX = 0, dirY = 0;
    let lastTurnDirection = null;
    let totalDistance = 0;

    if (edge === 0) dirY = 1;
    if (edge === 1) dirX = -1;
    if (edge === 2) dirY = -1;
    if (edge === 3) dirX = 1;

    for (let i = 0; i < numTurns; i++) {
        let segmentLength = random(200, 350);
        totalDistance += segmentLength;
        if (totalDistance > this.stopDistance) break;

        lastX += dirX * segmentLength;
        lastY += dirY * segmentLength;
        lastX = constrain(lastX, 0, width - random(width / 2.3, width / 2.7));
        lastY = constrain(lastY, 0, height - random(height / 2.3, height / 2.7));

        this.points.push({ x: lastX, y: lastY });

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

    // Agregar un nodo en el punto del mouse
    if (mouseX > 0 && mouseY > 0) {
      this.points.push({ x: mouseX, y: mouseY });
    } else {
      // Si el mouse no se ha movido, usa el último punto de la línea
      let lastPoint = this.points[this.points.length - 1];
      this.points.push({ x: lastPoint.x, y: lastPoint.y });
    }
    

    let possibleEdges = [0, 1, 2, 3].filter(e => e !== edge);
    let finalEdge = random(possibleEdges);

    if (finalEdge === 0) lastY = 0;
    if (finalEdge === 1) lastX = width;
    if (finalEdge === 2) lastY = height;
    if (finalEdge === 3) lastX = 0;

    if (finalEdge === 0) lastY -= width / 5;
    if (finalEdge === 1) lastX -= width / 5;
    if (finalEdge === 2) lastY += width / 5;
    if (finalEdge === 3) lastX += width / 5;

    this.points.push({ x: lastX, y: lastY });
}


  display() {
    beginShape();
    stroke(this.color);
    strokeWeight(windowHeight/70);
    noFill();
    for (let i = 0; i < this.points.length - 1; i++) {
      let p1 = this.points[i];
      let p2 = this.points[i + 1];
      line(p1.x, p1.y, p2.x, p2.y);
    }
    endShape();

    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];

      fill(255);windowHeight
      strokeWeight(windowHeight/540);
      stroke(0);
      ellipse(p.x, p.y, windowHeight/40,  windowHeight/40);

      noFill();
      strokeWeight(windowHeight/154.28);
      stroke(255);
      ellipse(p.x, p.y, windowHeight/24, windowHeight/24);
      
      noFill();
      strokeWeight(windowHeight/540);
      stroke(0);
      ellipse(p.x, p.y, windowHeight/27, windowHeight/27);
      
      noFill();
      strokeWeight(windowHeight/540);
      stroke(0);
      ellipse(p.x, p.y, windowHeight/19.63, windowHeight/19.63);
      
  
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
  
  }
}


function mousePressed() {
  generateLines();
}
