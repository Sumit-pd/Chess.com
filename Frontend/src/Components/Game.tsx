import { useEffect } from "react";
import { useSocket } from "../useSocket";
import ChessBoard from "./ChessBoard";
import { WHITE } from "chess.js";

export const INIT_GAME = 'INIT_GAME';
export const MOVE = "MOVE"


const Game = () => {
    const socket = useSocket();
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
                console.log("game initialized");
                break
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
                        <div className="col-span-4 bg-red-200">
                            <ChessBoard />
                        </div>
                        <div className="col-span-2">
                            <button className="w-full bg-green-500 text-white text-2xl px-12 py-6 rounded-2xl font-bold hover:bg-green-600 transition-all mt-8"
                            onClick={() => {
                                console.log("clicked");
                                
                                socket.send(JSON.stringify({
                                    type:INIT_GAME
                                }))
                            }}>
                                Play
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Game;