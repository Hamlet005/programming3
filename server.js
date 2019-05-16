express = require('express');
app = express();
server = require('http').Server(app);
io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('index.html');
});
server.listen(3000);

let Eatgrass = require("./Eatgrass")
let Grass = require("./Grass")
let Gishatich = require("./Gishatich")
let Vorsord = require("./Vorsord")
let Amenaker = require("./Amenaker")

xotArr = [];
eatArr = [];
gishArr = []; 
vorsArr = [];
amenArr = [];

matrix = []; // Մատրիցի ստեղծում
rows = 100; // Տողերի քանակ
columns = 100; // Սյուների քանակ

for (let y = 0; y < rows; y++) {
matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
for (let x = 0; x < columns; x++) {
let a = Math.floor(Math.random()*100);
if (a >= 0 && a < 50) {
matrix[y][x] = 0; // Մատրիցի 20 տոկոսը կլինի 0
} 
if (a >= 60 && a < 70) {
matrix[y][x] = 1; // Մատրիցի 20 տոկոսը կլինի 1
} 
else if (a >= 70 && a < 80) {
matrix[y][x] = 2; // Մատրիցի 10 տոկոսը կլինի 2
} 
else if (a >= 80 && a < 85) {
matrix[y][x] = 3; // Մատրիցի 20 տոկոսը կլինի 3
} 
else if(a >= 85 && a < 95) {
matrix[y][x] = 4; // Մատրիցի 20 տոկոսը կլինի 4
} 
else if(a >= 95 && a < 100) {
matrix[y][x] = 5; // Մատրիցի 10 տոկոսը կլինի 5
} 
}
}


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                eatArr.push(eatgrass);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                xotArr.push(grass);
            } else if (matrix[y][x] == 3) {
                var gishatich = new Gishatich(x, y);
                gishArr.push(gishatich);
            }
            else if (matrix[y][x] == 4) {
                var vorsord = new Vorsord(x, y);
                vorsArr.push(vorsord);
            }
            else if (matrix[y][x] == 5) {
                var amenaker = new Amenaker(x, y);
                amenArr.push(amenaker);
            }
        }
    }

function game(){
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
        io.sockets.emit("display message", matrix)
}    
setInterval(game, 10)