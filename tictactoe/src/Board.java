// Represents the game board and provides board-related logic.
public class Board {
    private final int rows;
    private final int columns;
    private Symbol[][] grid;

    public Board(int rows, int columns) {
        this.rows = rows;
        this.columns = columns;
        grid = new Symbol[rows][columns];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                grid[i][j] = Symbol.EMPTY;
            }
        }
    }

    public boolean isValidMove(Position pos) {
        return pos.row >= 0 && pos.row < rows &&
                pos.col >= 0 && pos.col < columns &&
                grid[pos.row][pos.col] == Symbol.EMPTY;
    }

    public void makeMove(Position pos, Symbol symbol) {
        grid[pos.row][pos.col] = symbol;
    }

    public void checkGameState(GameContext context) {
        for (int i = 0; i < rows; i++) {
            if (grid[i][0] != Symbol.EMPTY && isWinningLine(grid[i])) {
                setWinnerState(context, grid[i][0]);
                return;
            }
        }

        for (int i = 0; i < columns; i++) {
            Symbol[] column = new Symbol[rows];
            for (int j = 0; j < rows; j++) {
                column[j] = grid[j][i];
            }
            if (column[0] != Symbol.EMPTY && isWinningLine(column)) {
                setWinnerState(context, column[0]);
                return;
            }
        }

        Symbol[] diagonal1 = new Symbol[rows];
        Symbol[] diagonal2 = new Symbol[rows];
        for (int i = 0; i < rows; i++) {
            diagonal1[i] = grid[i][i];
            diagonal2[i] = grid[i][columns - 1 - i];
        }

        if (diagonal1[0] != Symbol.EMPTY && isWinningLine(diagonal1)) {
            setWinnerState(context, diagonal1[0]);
            return;
        }

        if (diagonal2[0] != Symbol.EMPTY && isWinningLine(diagonal2)) {
            setWinnerState(context, diagonal2[0]);
            return;
        }

        // Optional: implement draw state when board is full
    }

    private boolean isWinningLine(Symbol[] line) {
        Symbol first = line[0];
        for (Symbol s : line) {
            if (s != first) {
                return false;
            }
        }
        return true;
    }

    private void setWinnerState(GameContext context, Symbol symbol) {
        if (symbol == Symbol.X) {
            context.setState(new XWonState());
        } else if (symbol == Symbol.O) {
            context.setState(new OWonState());
        }
    }

    public void printBoard() {
        System.out.println("Current Board:");
        for (Symbol[] row : grid) {
            for (Symbol s : row) {
                System.out.print((s == Symbol.EMPTY ? "." : s) + " ");
            }
            System.out.println();
        }
    }
}
