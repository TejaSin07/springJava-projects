// State for X's turn.
public class XTurnState implements GameState {
    @Override
    public void next(GameContext context) {
        context.setState(new OTurnState());
    }

    @Override
    public boolean isGameOver() {
        return false;
    }
}
