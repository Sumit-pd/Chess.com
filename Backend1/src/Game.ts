import WebSocket from "ws";
import { Chess } from 'chess.js'
import ws from "ws";
import {MOVE} from "./messages.js"


export class Game{
    private player1: WebSocket;
    private player2: WebSocket; 
    public board: Chess;
    public startTime: Date;


    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        player1.send(JSON.stringify({ type: 'START_GAME', payload: this.board.fen() }));
        player2.send(JSON.stringify({ type: 'START_GAME', payload: this.board.fen() }));
    }

    hasPlayer(socket: WebSocket): boolean {
        return socket === this.player1 || socket === this.player2;
    }

    movePlayer(socket: WebSocket, move: {
        from:string,
        to:string
    }): void {
        const isPlayer1 = socket === this.player1;
        const isPlayer2 = socket === this.player2;

        if (!isPlayer1 && !isPlayer2) {
            throw new Error("Invalid player");
        }
        try{
            this.board.move(move);
        }catch (error) {
            socket.send(JSON.stringify({ type: 'INVALID_MOVE', payload: error }));
            return
        }

        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({ type: 'GAME_OVER', payload: this.board.turn() === 'w' ? 'black' : 'white' }));
            this.player2.send(JSON.stringify({ type: 'GAME_OVER', payload: this.board.turn() === 'w' ? 'black' : 'white' }));
            return;
        }
        else{
            if(this.board.moves.length % 2 == 0 )
            {
                this.player1.send(JSON.stringify({ type: MOVE, payload: move , color : "White"}));
                this.player2.send(JSON.stringify({ type: MOVE, payload: move , color : "Black"}));

            }
            else{
                this.player1.send(JSON.stringify({ type: MOVE, payload: move , color : "White"}));
                this.player2.send(JSON.stringify({ type: MOVE, payload: move , color : "Black"}));
            }
        }
    }
}