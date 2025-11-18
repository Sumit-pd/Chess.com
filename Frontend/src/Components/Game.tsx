import ChessBoard from "./ChessBoard";

const Game = () => {
    return (
        <div className="flex justify-center">
            <div>
                <div className="pt-8 max-w-screen-lg w-full">
                    <div className="grid grid-cols-6 gap-4 w-full">
                        <div className="col-span-4 bg-red-200">
                            <ChessBoard />
                        </div>
                        <div className="col-span-2">
                            <button className="w-full bg-green-500 text-white text-2xl px-12 py-6 rounded-2xl font-bold hover:bg-green-600 transition-all mt-8">
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