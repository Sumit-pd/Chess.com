import { useEffect, useState } from "react";
import { useSocket } from "../useSocket";
import ChessBoard from "./ChessBoard";
import { Chess } from "chess.js";
import { MOVE,INIT_GAME,INVALID_MOVE } from "../../../Backend1/src/messages";




const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board,setBoard] = useState(chess.board())
    const [start,setStarted] = useState(true)

    useEffect(() => {
        if(!socket)
        {
            return;
        }

        socket.onmessage = (e) => {
            const message = JSON.parse(e.data);
            switch(message.type)
            {
            case INIT_GAME:
                setChess(new Chess())
                setBoard(chess.board())
                setStarted(false)
                console.log("game initialized");
                break
            case MOVE:
                const move = message.payload;
                chess.move(move)
                setBoard(chess.board())
                console.log("Move");
                break
            case INVALID_MOVE:
                console.log("invalid Move");
            }

            
            
                
        }
    },[socket])

    if(!socket)
    {
        return <div style={{color: "whitegame"}}>Connecting</div>
    }
    return (
        <div className="flex justify-center">
            <div>
                <div className="pt-8 max-w-screen-lg w-full">
                    <div className="grid grid-cols-6 gap-4 w-full">
                        <div className="col-span-4">
                            <ChessBoard board={board} socket={socket} />
                        </div>
                        <div className="col-span-2 flex items-center justify-center">
                            {start && <button className="bg-green-500 text-white text-2xl px-12 py-6 rounded-2xl font-bold hover:bg-green-600 transition-all"
                                onClick={() => {
                                    console.log("clicked");
                                    
                                    socket.send(JSON.stringify({
                                        type:INIT_GAME
                                    }))
                                }}>
                                Play
                            </button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Game;