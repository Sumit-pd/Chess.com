import {  type Color, type PieceSymbol, type Square } from "chess.js";
import { useState } from "react";
import {MOVE} from "../../../Backend1/src/messages.ts"

interface iChessBoardProps {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket
}

const ChessBoard = ({ board, socket }: iChessBoardProps) => {
    const [from, setFrom] = useState<null | Square>(null)
    const [to, setTo] = useState<null | Square>(null)

    const handleMove = (square:{
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null) => {
        if (from) {
            setFrom(square?.square ?? null)
            try {
                socket.send(JSON.stringify({
                    type:MOVE,
                    payload:{
                        from,
                        to
                    }
                }))
            } catch (error) {
                
            }
        }
        else
        {
            setTo(square?.square ?? null)
        }
    }


    return <div className="text-white-200">
        {board.map((row, i) => {
            return <div key={i} className="flex">
                {row.map((square, j) => {
                    return <div 
                    onClick={() => {
                        handleMove(square)
                    }}
                    key={j} className={`w-16 h-16 ${(i + j) % 2 === 0 ? 'bg-green-500' : 'bg-white'}`}>
                        <div className="w-full justify-center flex h-full">
                            <div className="h-full justify-center flex flex-col">

                                {square ? square.type : ''}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        })}
    </div>
}
export default ChessBoard;