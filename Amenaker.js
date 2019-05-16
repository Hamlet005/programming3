let LivingCreature = require("./base")
module.exports = class Amenaker extends LivingCreature {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 30;
        this.directions = [];
    }

    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y - 1]
        ];
    }

    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }



    eat() {

        var fundCords2 = this.getDirections(2);
        var fundCords = this.getDirections(1);
        var fundCords1 = this.getDirections(4);
        fundCords = fundCords.concat(fundCords2)
        fundCords = fundCords.concat(fundCords1)
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;

            this.multiply++;

            this.energy++;

            for (var i in xotArr) {
                if (x == xotArr[i].x && y == xotArr[i].y) {
                    xotArr.splice(i, 1);
                }
            }

            for (var i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1);
                }
            }

            for (var i in vorsArr) {
                if (x == vorsArr[i].x && y == vorsArr[i].y) {
                    vorsArr.splice(i, 1);
                }
            }
            if (this.multiply == 35) {
                this.mul()
                this.multiply = 0;
            }


        } else {

            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }


    mul() {

        var fundCords = this.getDirections(0);
        var cord = random(fundCords);


        if (cord) {
            var x = cord[0];
            var y = cord[1];

            var noramenaker = new Amenaker(x, y);
            vorsArr.push(noramenaker);

            matrix[y][x] = 5;

        }
    }

    լ
    die() {

        matrix[this.y][this.x] = 0;

        for (var i in amenArr) {
            if (this.x == amenArr[i].x && this.y == amenArr[i].y) {
                amenArr.splice(i, 1);
            }
        }
    }
}