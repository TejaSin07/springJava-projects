

public class OTurnState implements GameState {
    @Override
    public void next(GameContext context) {
        // Switch to XTurnState
        context.setState(new XTurnState());
    }
    @Override
    public boolean isGameOver() {
        return false;
    }
}