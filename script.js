var side = 20;
let socket = io()
function setup() {
    noStroke();
    frameRate(5);
    createCanvas(20 * side, 20 * side);
    background('#acacac');
}

socket.on("display message", drawMatrix)
function drawMatrix(matrix) {
    //Գծում է աշխարհը, հիմվելով matrix-ի վրա
    

    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 2) {
                fill("orange");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 3) {
                fill("red");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 4) {
                fill("yellow");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 5) {
                fill("blue");
                rect(j * side, i * side, side, side);
            }
        }
    }


}

function kill(){
    socket.emit('spani')
}