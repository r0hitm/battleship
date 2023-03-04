import Player from "../js/player.js";

test("Player Factory Function", () => {
    const player = Player("Player");
    expect(player.name).toBe("Player");
    expect(player.isGameOver()).toBe(false);
    expect(player.isMyTurn()).toBe(false);
    expect(player.receiveAttack(0, 0)).toBe(false);
    player.startTurn();
    expect(player.isMyTurn()).toBe(true);
    player.endTurn();
});
