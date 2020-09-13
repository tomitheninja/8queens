const NUM_QUEENS: i32 = 8;

#[derive(Debug)]
struct Queen {
    row: i32,
    col: i32,
}

impl Queen {
    pub fn new(row: i32, col: i32) -> Self {
        Self { row, col }
    }

    pub fn blocks(&self, other: &Self) -> bool {
        let col_diff = self.col - other.col;
        let row_diff = self.row - other.row;

        col_diff == 0 || row_diff == 0 || col_diff.abs() == row_diff.abs()
    }
}

impl std::fmt::Display for Queen {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "({},{})", self.row + 1, self.col + 1)
    }
}

fn find_queens(queens: &mut Vec<Queen>, row: i32, mut found: &mut usize) {
    assert_eq!(row as usize, queens.len());
    if row >= NUM_QUEENS {
        *found += 1;
        if *found % 347 == 0 {
            let row1_status = (queens[0].col + 1) * NUM_QUEENS ;
            let row2_status = (queens[1].col + 1) * 1;
            eprint!("{}% {} found\n", (row1_status + row2_status) * 10 / (NUM_QUEENS + 1), found);
        }
    } else {
        for col in 0..NUM_QUEENS {
            let queen = Queen::new(row, col);
            if !queens.iter().any(|q| q.blocks(&queen)) {
                queens.push(queen);
                find_queens(queens, row + 1, &mut found);
                queens.pop();
            }
        }
    }
}

fn main() {
    let mut many = 0;
    find_queens(&mut Vec::with_capacity(NUM_QUEENS as _,), 0, &mut many);
    eprintln!();
    println!("{}", many);
}

#[cfg(test)]
mod tests {
    use super::Queen;

    #[test]
    fn blocks_col() {
        let q1 = Queen::new(2, 0);
        let q2 = Queen::new(2, 5);
        assert!(q1.blocks(&q2));
    }

    #[test]
    fn not_blocks_valid() {
        let q1 = Queen::new(2, 1);
        let q2 = Queen::new(3, 6);
        assert!(!q1.blocks(&q2));
    }

    #[test]
    fn blocks_row() {
        let q1 = Queen::new(3, 5);
        let q2 = Queen::new(0, 5);
        assert!(q1.blocks(&q2));
    }

    #[test]
    fn blocks_cross_1() {
        let q1 = Queen::new(2, 3);
        let q2 = Queen::new(6, 7);
        assert!(q1.blocks(&q2));
    }

    #[test]
    fn block_cross_2() {
        let q1 = Queen::new(3, 7);
        let q2 = Queen::new(4, 6);
        assert!(q1.blocks(&q2));
    }
}
