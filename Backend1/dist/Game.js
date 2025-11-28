import WebSocket from "ws";
import { Chess } from 'chess.js';
import ws from "ws";
import { INIT_GAME, MOVE } from "./messages.js";
export class Game {
    player1;
    player2;
    board;
    startTime;
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        player1.send(JSON.stringify({ type: INIT_GAME, payload: this.board.fen() }));
        player2.send(JSON.stringify({ type: INIT_GAME, payload: this.board.fen() }));
    }
    hasPlayer(socket) {
        return socket === this.player1 || socket === this.player2;
    }
    movePlayer(socket, move) {
        const isPlayer1 = socket === this.player1;
        const isPlayer2 = socket === this.player2;
        if (!isPlayer1 && !isPlayer2) {
            throw new Error("Invalid player");
        }
        try {
            this.board.move(move);
        }
        catch (error) {
            socket.send(JSON.stringify({ type: 'INVALID_MOVE', payload: error }));
            return;
        }
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({ type: 'GAME_OVER', payload: this.board.turn() === 'w' ? 'black' : 'white' }));
            this.player2.send(JSON.stringify({ type: 'GAME_OVER', payload: this.board.turn() === 'w' ? 'black' : 'white' }));
            return;
        }
        else {
            if (this.board.moves.length % 2 == 0) {
                this.player1.send(JSON.stringify({ type: MOVE, payload: move, color: "White" }));
                this.player2.send(JSON.stringify({ type: MOVE, payload: move, color: "Black" }));
            }
            else {
                this.player1.send(JSON.stringify({ type: MOVE, payload: move, color: "White" }));
                this.player2.send(JSON.stringify({ type: MOVE, payload: move, color: "Black" }));
            }
        }
    }
}
//# sourceMappingURL=Game.js.map