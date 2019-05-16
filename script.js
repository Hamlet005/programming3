var side = 20;
function setup() {
    noStroke();
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side); 
    background('#acacac');
}

    function draw() {
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


        //յուրաքանչյուր խոտ փորձում է բազմանալ
        for (var i in xotArr) {
            xotArr[i].mul();
        }

        //յուրաքանչյուր խոտակեր փորձում է ուտել խոտ
        for (var i in eatArr) {
            eatArr[i].eat();
        }

        //յուրաքանչյուր գիշատիչ փորձում է ուտել խոտակերՖ
        for (var i in gishArr) {
            gishArr[i].eat();
        }

        for (var i in vorsArr) {
            vorsArr[i].eat();
        }

        for (var i in amenArr) {
            amenArr[i].eat();
        }
    }

