package main
import (
	"fmt"
	"time"
)

const numQueens = 8
const tableSize = numQueens

var queens [numQueens]int // queens[x the index] == y the value 

func abs(x int) int {
	if x > 0 { return x }
	return -x
}

func isFree (candidateX int, candidateY int) bool {
	for x := 0; x < numQueens; x++ { // TODO: should i reverse this? 
		y := queens[x]
		if y == - 1 {
			return true // HACK
		}
		if candidateY == y || abs(candidateX - x) == abs(candidateY - y) {
			return false
		}
	}
	return true
}

func worker (depth int) int {
	if (depth == numQueens) {
		return 1
	}
	numFound := 0;
	for y := 0; y < tableSize; y++ {
		if isFree(depth, y) {
			queens[depth] = y // place queen to x=depth, y=y
			numFound += worker(depth + 1)
			queens[depth] = - 1 // remove queen
		}
	}
	return numFound
}

func main() {
	// init array
	for y := 0; y < numQueens; y++ {
		queens[y] = -1
	}
	fmt.Println("starting...")
	start := time.Now()
	
	numFound := worker(0)
	
	end := time.Now()
	
	diff := float64(end.Sub(start)) / 1000000
	
	fmt.Printf("%d queens: found %d in %f ms", numQueens, numFound, diff)
}