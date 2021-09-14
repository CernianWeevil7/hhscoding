const
    RESOLUTION = 30, // pixels per square
    TEXT_SIZE = 20,
    SQUARES = Math.floor((Math.min(window.innerHeight, window.innerWidth) - 50) / RESOLUTION),
    CANVAS_SIZE = SQUARES * RESOLUTION,
    UPDATE_FRAMETIME = 5;
    CONTROLS = {
        RESET: {code: 82, text: '[R]'},
        PAUSE: {code: 32, text: '[SPACE]'},
        MAX_TEXT_SIZE: 3.8
    },
    BIRTH_COND = totalAdj => totalAdj === 3,
    DEATH_COND = totalAdj => totalAdj < 2 || totalAdj > 3

function setup() {
    frameRate(60);
    createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    textAlign(LEFT, TOP);
    textFont('Courier New', TEXT_SIZE);
}

class Grid {
    constructor() {
        this.arr = Array(SQUARES).fill(undefined).map(() => Array(SQUARES).fill(0));
    }

    draw() {
        this.arr.forEach((row, y) => {
            row.forEach((element, x) => {
                if (element === 1) {
                    fill(255);
                } else {
                    noFill();
                }
                square(x * RESOLUTION, y * RESOLUTION, RESOLUTION);
            });
        });
    }

    interact() {
        this.arr[Math.floor(mouseY / RESOLUTION)][Math.floor(mouseX / RESOLUTION)] = 1;
    }

    update() {
        let newArr = new Grid().arr;

        this.arr.forEach((row, y) => {
            row.forEach((element, x) => {
                let totalAdj = -element;
                for (let yOffset = -1; yOffset <= 1; yOffset++) {
                    for (let xOffset = -1; xOffset <= 1; xOffset++) {
                        totalAdj += this.arr[(y + yOffset + SQUARES) % SQUARES][(x + xOffset + SQUARES) % SQUARES];
                    }
                }

                if (element === 0 && BIRTH_COND(totalAdj)) newArr[y][x] = 1;
                else if (element === 1 && !DEATH_COND(totalAdj)) newArr[y][x] = 1;
            });
        });

        this.arr = newArr;
    }
}

let g;
let paused;
let framesSinceLastUpdate;

function reset() {
    g = new Grid();
    paused = true;
    framesSinceLastUpdate = 0;
}

reset();

function draw() {
    if (!paused) {
        if (framesSinceLastUpdate === UPDATE_FRAMETIME) {
            g.update();
            framesSinceLastUpdate = 0;
        }
        else framesSinceLastUpdate++;
    }
    
    background(25);
    g.draw();
    fill(0);
    stroke(0);
    rect(0, 0,
        Math.ceil((5.6 + CONTROLS.MAX_TEXT_SIZE) * TEXT_SIZE / RESOLUTION) * RESOLUTION + 2,
        Math.ceil(2.2 * TEXT_SIZE / RESOLUTION) * RESOLUTION + 2
    );
    fill(255);
    stroke(255);
    text(`RESET: ${CONTROLS.RESET.text}\n${paused ? 'UNPAUSE' : 'PAUSE'}: ${CONTROLS.PAUSE.text}`, 2, 0);
}

function keyPressed() {
    if (keyCode === CONTROLS.RESET.code) {
        reset();
    } else if (keyCode === CONTROLS.PAUSE.code) {
        paused = paused ? false : true;
    }
}

function mouseDragged() {
    g.interact();
}

function mousePressed() {
    g.interact();
}