import Cell, { State } from './cell'

class Board {
// STATE:
    private _map: Cell[][] = new Array(this.width).fill(null)
        // fill map with Cells
        .map(() => new Array(this.height).fill(null)
                    .map(() => new Cell(this.numQueen))
        )
    constructor(
        public readonly width: number = 8,
        public readonly height: number = 8,
        public readonly numQueen: number = 8,
    ) {  }
// PUBLIC:
    public isFree(x: number, y: number) {
        return this._map[x][y].isFree
    }

    public placeQueen(x: number, y: number, depth: number) {
        if (!this._map[x][y].isFree) throw new Error('You might not place a queen there')
        this._queenActionHandler(x, y, depth, State.Blocked)
    }

    public removeQueen(depth: number, x: number, y: number) {
        this._queenActionHandler(x, y, depth, State.Free)
    }

    public forEach(callback: (isFree: boolean, index: [number, number], table: this) => void) {
        for (let x = 0; x < this.width; x++) {
            const row = this._map[x]
            for (let y = 0; y < this.height; y++) {
                callback(row[y].isFree, [x, y], this)
            }
        }
    }

    // removeQueen(depth: number) {
    //     this._map.forEach(row => {
    //         row.forEach(cell => {
    //             cell.change(State.Free, depth)
    //         })
    //     })
    // }

    // log() {
    //     const BORDER = '#'
    //     console.log()
    //     console.log(BORDER.repeat(this._map.length + 4))
    //     console.log(BORDER, new Array(this._map.length).fill(0).map((_, i) => i).join(''), BORDER)
    //     this._map.forEach((row, i) => {
    //         let res = ''
    //         row.forEach(cel => {
    //             res += cel.isFree ? ' ' : 'x'
    //         })
    //         console.log(i, res, i)
    //     })
    //     console.log(BORDER, new Array(this._map.length).fill(0).map((_, i) => i).join(''), BORDER)
    //     console.log(BORDER.repeat(this._map.length + 4))
    //     console.log()
    // }

// PRIVATE:
    private _queenActionHandler(x: number, y: number, depth: number, newState: State) {
        this._map[x][y].change(newState, depth) // Place the queen
        const biggerSize = Math.max(this.width, this.height)
        for (let shift = 1; shift < biggerSize; shift++) { // Block Cells

            const shifted = {
                left: x - shift,
                right: x + shift,
                up: y - shift,
                down: y + shift,
            }

            const canGo = {
                left: shifted.left > 0,
                right: shifted.right < this.width,
                up: shifted.up > 0,
                down: shifted.down < this.height,
            }

            { // Block vertically
                const row = this._map[x]
                if (canGo.up) row[shifted.up].change(newState, depth)
                if (canGo.down) row[shifted.down].change(newState, depth)
            }

            if (canGo.left) { // Block left side
                const leftSize = this._map[shifted.left]
                leftSize[y].change(newState, depth) // Block horizontally: left
                if (canGo.down) leftSize[shifted.down].change(newState, depth) // Block bottom-left
                if (canGo.up) leftSize[shifted.up].change(newState, depth) // Block top-left
            }
            if (canGo.right) { // Block right side
                const rightSize = this._map[shifted.right]
                rightSize[y].change(newState, depth) // Block horizontally: right
                if (canGo.down) rightSize[shifted.down].change(newState, depth) // Block: bottom-right
                if (canGo.up) rightSize[shifted.up].change(newState, depth) // Block: bottom-left
            }
        }
    }
}

export default Board
