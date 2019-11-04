"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = __importDefault(require("./board"));
const config_1 = __importDefault(require("./config"));
const myTable = new board_1.default(config_1.default.width, config_1.default.height, config_1.default.numQueen);
// const queens = new Array(NUM_QUEEN).fill(null)
const queensLog = [];
let numFound = 0;
const start = Number(new Date());
function worker(depth = 0) {
    if (depth === config_1.default.numQueen) {
        numFound += 1;
        if (numFound % 524288 === 0) {
            const now = Number(new Date());
            // const [firstQueen] = queens
            // const pos_now = firstQueen.x * HEIGHT + firstQueen.y
            // const pos_max = config.numQueen * config.height + config.width
            // const pos = (pos_now / pos_max) * 100
            const msDiff = now - start;
            const secDiff = Math.round(msDiff / 1000);
            // console.log(pos.toFixed(0)+'%', numFound, `${secDiff}s`/*, queens*/)
            console.log(numFound, `${secDiff}s`, ...queensLog);
        }
        // myTable.log()
        return;
    }
    myTable.forEach((isFree, [x, y], board) => {
        if (isFree) {
            if (depth < config_1.default.queensLogLength)
                queensLog[depth] = { x, y };
            board.placeQueen(x, y, depth);
            // queens[depth] = { x, y }
            worker(depth + 1);
            board.removeQueen(depth, x, y);
            // queens[depth] = null
        }
    });
}
worker();
console.log(numFound);
