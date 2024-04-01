var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);
var cellSize = 20;
var rows = 30;
var cols = 40;
var board = [];
var scene; // Variable para almacenar la referencia a la escena

function preload() {}

function create() {
    scene = this; // Almacena la referencia a la escena actual

    // Crear tablero
    for (var i = 0; i < cols; i++) {
        board[i] = [];
        for (var j = 0; j < rows; j++) {
            var graphics = scene.add.graphics({ // Usa la variable de la escena
                x: i * cellSize,
                y: j * cellSize,
                fillStyle: { color: 0xffffff }
            });
            graphics.fillRect(0, 0, cellSize - 1, cellSize - 1);
            board[i][j] = Math.random() > 0.5 ? 1 : 0; // Células vivas aleatorias
        }
    }

    scene.time.addEvent({ delay: 500, loop: true, callback: updateBoard });
}

function updateBoard() {
    var newBoard = [];
    for (var i = 0; i < cols; i++) {
        newBoard[i] = [];
        for (var j = 0; j < rows; j++) {
            var neighbors = countNeighbors(i, j);
            if (board[i][j] === 1) {
                newBoard[i][j] = neighbors === 2 || neighbors === 3 ? 1 : 0;
            } else {
                newBoard[i][j] = neighbors === 3 ? 1 : 0;
            }
        }
    }
    board = newBoard;
    drawBoard();
}

function countNeighbors(x, y) {
    var sum = 0;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            var col = (x + i + cols) % cols;
            var row = (y + j + rows) % rows;
            sum += board[col][row];
        }
    }
    sum -= board[x][y];
    return sum;
}

function drawBoard() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            var graphics = scene.add.graphics({ // Usa la variable de la escena
                x: i * cellSize,
                y: j * cellSize
            });
            graphics.clear();
            graphics.fillStyle(board[i][j] === 1 ? 0x00ff00 : 0xffffff, 1);
            graphics.fillRect(0, 0, cellSize - 1, cellSize - 1);
        }
    }
}
