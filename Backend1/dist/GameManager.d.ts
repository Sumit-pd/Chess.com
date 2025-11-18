import WebSocket from "ws";
export declare class GameManager {
    private games;
    private pendingUser;
    private users;
    constructor();
    addPlayer(user: WebSocket): void;
    removePlayer(user: WebSocket): void;
    handleMessage(socket: WebSocket): void;
}
//# sourceMappingURL=GameManager.d.ts.map