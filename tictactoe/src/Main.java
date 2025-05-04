// Main class to run the game.
public class Main {
    public static void main(String[] args) {
        PlayerStrategy playerXStrategy = new HumanPlayerStrategy("Player X");
        PlayerStrategy playerOStrategy = new HumanPlayerStrategy("Player O");

        TicTacToeGame game = new TicTacToeGame(playerXStrategy, playerOStrategy);
        game.play();
    }
}
