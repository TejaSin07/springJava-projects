// GameState Interface
public interface GameState {
    void next(GameContext context);
    boolean isGameOver();
}