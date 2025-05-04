// Implements the actual Tic-Tac-Toe game.
public class TicTacToeGame implements BoardGames {
    private Board board;
    private Player playerX;
    private Player playerO;
    private Player currentPlayer;
    private GameContext gameContext;

    public TicTacToeGame(PlayerStrategy xStrategy, PlayerStrategy oStrategy) {
        board = new Board(3, 3); // Fixed size 3x3 board
        playerX = new Player(Symbol.X, xStrategy);
        playerO = new Player(Symbol.O, oStrategy);
        currentPlayer = playerX;
        gameContext = new GameContext();
    }

    @Override
    public void play() {
        do {
            board.printBoard();
            Position move = currentPlayer.makeMove(board);
            board.makeMove(move, currentPlayer.getSymbol());
            board.checkGameState(gameContext);
            switchPlayer();
        } while (!gameContext.isGameOver());

        announceResult();
    }

    private void switchPlayer() {
        currentPlayer = (currentPlayer == playerX) ? playerO : playerX;
    }

    private void announceResult() {
        GameState state = gameContext.getCurrentState();
        if (state instanceof XWonState) {
            System.out.println("Player X wins!");
        } else if (state instanceof OWonState) {
            System.out.println("Player O wins!");
        } else {
            System.out.println("It's a draw!");
        }
    }
}
