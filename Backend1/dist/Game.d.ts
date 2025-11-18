import WebSocket from "ws";
import { Chess } from 'chess.js';
export declare class Game {
    private player1;
    private player2;
    board: Chess;
    startTime: Date;
    constructor(player1: WebSocket, player2: WebSocket);
    hasPlayer(socket: WebSocket): boolean;
    movePlayer(socket: WebSocket, move: {
        from: string;
        to: string;
    }): void;
}
//# sourceMappingURL=Game.d.ts.map