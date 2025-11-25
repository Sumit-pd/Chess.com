import { Game } from "./Game.js";
import WebSocket from "ws";
import { INIT_GAME, MOVE } from "./messages.js";
export class GameManager {
    games;
    pendingUser;
    users;
    constructor() {
        this.games = [];
        this.users = [];
        this.pendingUser = null;
    }
    addPlayer(user) {
        this.users.push(user);
        this.handleMessage(user);
    }
    removePlayer(user) {
        this.users = this.users.filter(elem => elem !== user);
    }
    handleMessage(socket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());
            switch (message.type) {
                case INIT_GAME:
                    if (this.pendingUser) {
                        const game = new Game(this.pendingUser, socket);
                        this.games.push(game);
                        //  socket.send(JSON.stringify({ type: 'START_GAME' }));
                        this.pendingUser = null;
                    }
                    else {
                        this.pendingUser = socket;
                        console.log("one user connected waiting for another user");
                    }
                    break;
                case MOVE:
                    const game = this.games.find(g => g.hasPlayer(socket));
                    if (game) {
                        game.movePlayer(socket, message.payload);
                    }
                    else {
                        socket.send(JSON.stringify({ type: 'NOT_IN_GAME' }));
                    }
                    break;
                // handle other message types
            }
        });
    }
}
//# sourceMappingURL=GameManager.js.map