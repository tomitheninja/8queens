"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cell_1 = __importStar(require("./cell"));
class Board {
    constructor(width = 8, height = 8, numQueen = 8) {
        this.width = width;
        this.height = height;
        this.numQueen = numQueen;
        // STATE:
        this._map = new Array(this.width).fill(null)
            // fill map with Cells
            .map(() => new Array(this.height).fill(null)
            .map(() => new cell_1.default(this.numQueen)));
    }
    // PUBLIC:
    isFree(x, y) {
        return this._map[x][y].isFree;
    }
    placeQueen(x, y, depth) {
        if (!this._map[x][y].isFree)
            throw new Error('You might not place a queen there');
        this._queenActionHandler(x, y, depth, cell_1.State.Blocked);
    }
    removeQueen(depth, x, y) {
        this._queenActionHandler(x, y, depth, cell_1.State.Free);
    }
    forEach(callback) {
        for (let x = 0; x < this.width; x++) {
            const row = this._map[x];
            for (let y = 0; y < this.height; y++) {
                callback(row[y].isFree, [x, y], this);
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
    _queenActionHandler(x, y, depth, newState) {
        this._map[x][y].change(newState, depth); // Place the queen
        const biggerSize = Math.max(this.width, this.height);
        for (let shift = 1; shift < biggerSize; shift++) { // Block Cells
            const shifted = {
                left: x - shift,
                right: x + shift,
                up: y - shift,
                down: y + shift,
            };
            const canGo = {
                left: shifted.left > 0,
                right: shifted.right < this.width,
                up: shifted.up > 0,
                down: shifted.down < this.height,
            };
            { // Block vertically
                const row = this._map[x];
                if (canGo.up)
                    row[shifted.up].change(newState, depth);
                if (canGo.down)
                    row[shifted.down].change(newState, depth);
            }
            if (canGo.left) { // Block left side
                const leftSize = this._map[shifted.left];
                leftSize[y].change(newState, depth); // Block horizontally: left
                if (canGo.down)
                    leftSize[shifted.down].change(newState, depth); // Block bottom-left
                if (canGo.up)
                    leftSize[shifted.up].change(newState, depth); // Block top-left
            }
            if (canGo.right) { // Block right side
                const rightSize = this._map[shifted.right];
                rightSize[y].change(newState, depth); // Block horizontally: right
                if (canGo.down)
                    rightSize[shifted.down].change(newState, depth); // Block: bottom-right
                if (canGo.up)
                    rightSize[shifted.up].change(newState, depth); // Block: bottom-left
            }
        }
    }
}
exports.default = Board;
