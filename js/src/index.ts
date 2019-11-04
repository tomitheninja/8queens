import Board from './board'
import config from './config'

const myTable = new Board(config.width, config.height, config.numQueen)
// const queens = new Array(NUM_QUEEN).fill(null)
const queensLog: ({x: number, y: number})[] = []

let numFound = 0
const start = Number(new Date())


function worker (depth = 0) {
    if (depth === config.numQueen) {
        numFound += 1
        if (numFound % 524288 === 0) {
            const now = Number(new Date())
            // const [firstQueen] = queens
            // const pos_now = firstQueen.x * HEIGHT + firstQueen.y
            // const pos_max = config.numQueen * config.height + config.width
            // const pos = (pos_now / pos_max) * 100
            const msDiff = now - start
            const secDiff = Math.round(msDiff / 1000)
            // console.log(pos.toFixed(0)+'%', numFound, `${secDiff}s`/*, queens*/)
            console.log(numFound, `${secDiff}s`, ...queensLog)
        }
        // myTable.log()
        return
    }
    myTable.forEach((isFree, [x, y], board) => {
        if (isFree) {
            if (depth < config.queensLogLength) queensLog[depth] = { x, y }
            board.placeQueen(x, y, depth)
            // queens[depth] = { x, y }
            worker(depth + 1)
            board.removeQueen(depth, x, y)
            // queens[depth] = null
        }
    })
}

worker()
console.log(numFound)
