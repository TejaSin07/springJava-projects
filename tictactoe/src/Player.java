// Represents a player in the game.
public class Player {
    private Symbol symbol;
    private PlayerStrategy strategy;

    public Player(Symbol symbol, PlayerStrategy strategy) {
        this.symbol = symbol;
        this.strategy = strategy;
    }

    public Symbol getSymbol() {
        return symbol;
    }

    public Position makeMove(Board board) {
        return strategy.makeMove(board);
    }
}
