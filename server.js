var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var seasonTime = 0

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
var fs = require('fs');
xotArr = [];
eatArr = [];
gishArr = [];
vorsArr = [];
amenArr = [];


matrix = [];
let rows = 20; // Տողերի քանակ
let columns = 20; // Սյուների քանակ

for (let y = 0; y < rows; y++) {
    matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
    for (let x = 0; x < columns; x++) {
        let a = Math.floor(Math.random() * 100);
        if (a >= 0 && a < 20) {
            matrix[y][x] = 0; // Մատրիցի 20 տոկոսը կլինի 0
        }
        if (a >= 20 && a < 60) {
            matrix[y][x] = 1; // Մատրիցի 20 տոկոսը կլինի 1
        }
        else if (a >= 60 && a < 80) {
            matrix[y][x] = 2; // Մատրիցի 10 տոկոսը կլինի 2
        }
        else if (a >= 80 && a < 90) {
            matrix[y][x] = 3; // Մատրիցի 20 տոկոսը կլինի 3
        }
        else if (a >= 90 && a < 95) {
            matrix[y][x] = 4; // Մատրիցի 20 տոկոսը կլինի 4
        }
        else if (a >= 95 && a < 100) {
            matrix[y][x] = 5; // Մատրիցի 10 տոկոսը կլինի 5
        }
    }
}
function createObjects() {
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
}
createObjects()
let obj = {
    'matrix': matrix,
    'season': "winter",
}
io.on('connection', function (socket) {
    socket.on('spani', function () {
        xotArr = [];
        eatArr = [];
        gishArr = [];
        vorsArr = [];
        amenArr = [];
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 0
            }
        }
    })
})


function game() {
    seasonTime++
    if (seasonTime <= 8) {
        obj.season = "winter"
    }
    else if (seasonTime <= 16) {
        obj.season = "summer"
    }
    else {
        seasonTime = 0
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

    io.sockets.emit("display message", matrix)
}
setInterval(game, 500)

let statistics = {};


setInterval(function () {
    statistics.Grass = xotArr.length;
    statistics.Eatgrass = eatArr.length;
    statistics.Gishatich = gishArr.length;
    statistics.Vorsord = vorsArr.length;
    statistics.Amenaker = amenArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {

    })
}, 10)