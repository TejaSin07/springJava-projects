// State representing O's win.
public class OWonState implements GameState {
    @Override
    public void next(GameContext context) {
        // No next state after winning
    }

    @Override
    public boolean isGameOver() {
        return true;
    }
}
