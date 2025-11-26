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
                return
            }
        }
        this.direction = { x: newX, y: newY }
    }

    move(cols, rows, wrapAround) {
        if (this.alive == false){
            return
        } 
    
        let head = this.body[0];
        let newX = head.x + this.direction.x
        let newY = head.y + this.direction.y
    
        if (wrapAround) {
            if (newX < 0) {
                newX = cols - 1
            }
            if (newX >= cols) {
                newX = 0
            }
            if (newY < 0) {
                newY = rows - 1
            }
            if (newY >= rows) {
                newY = 0
            }
        } else {
            if (newX < 0 || newX >= cols || newY < 0 || newY >= rows) {
                this.alive = false
                return
            }
        }
    
        let newHead = { x: newX, y: newY }
        this.body.unshift(newHead)
    
        if (this.growUp > 0) {
            this.growUp--
        } else {
            this.body.pop()
        }
    
        for (let i = 1; i < this.body.length; i++) {
            if (this.body[i].x === newHead.x && this.body[i].y === newHead.y) {
                this.alive = false
            }
        }
    }
    

    grow(n) {
        this.growUp += n
    }

    shrink(n) {
        for (let i = 0; i < n; i++) {
            if (this.body.length > 1) {
                this.body.pop()
            }else {
                this.alive = false
                return
            }
        }
    }
}
