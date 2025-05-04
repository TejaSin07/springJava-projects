// State representing X's win.
public class XWonState implements GameState {
    @Override
    public void next(GameContext context) {
        // No next state after winning
    }

    @Override
    public boolean isGameOver() {
        return true;
    }
}
