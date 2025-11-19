class Snake {
    constructor(x, y) {
        this.index = 0
        this.body = [{ x: x, y: y }]
        this.direction = { x: 1, y: 0 }
        this.growUp = 0
        this.alive = true
    }

    newCell(newX, newY) {
        if (this.body.length > 1) {
            let currentDir = this.direction
            if (currentDir.x + newX === 0 && currentDir.y + newY === 0) {
                return;
            }
        }
        this.direction = { x: newX, y: newY };
    }

    move(cols, rows) {
        if (this.alive == false) {
            return
        }
        let head = this.body[0];
        let newHead = { x: head.x + this.direction.x, y: head.y + this.direction.y };
        this.body.unshift(newHead);

        if (this.growUp > 0) {
            this.growUp--;
        } else {
            this.body.pop();
        }

        if (newHead.x < 0 || newHead.x >= cols || newHead.y < 0 || newHead.y >= rows) {
            this.alive = false;
        }

        for (let i = 1; i < this.body.length; i++) {
            if (this.body[i].x === newHead.x && this.body[i].y === newHead.y) {
                this.alive = false;
            }
        }
    }

    grow(n) {
        this.growUp += n
    }

    shrink(n) {
        for (let i = 0; i < n; i++){
            if (this.body.length > 1) {
                this.body.pop();
            }
        }
    }
}
