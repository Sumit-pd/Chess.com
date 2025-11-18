import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen  flex items-center justify-center p-12">
            <div className="flex items-center justify-center gap-32 max-w-7xl">
                {/* Left side - Image */}
                <div className="flex-shrink-0">
                    <img className="w-[500px] h-auto" src="/chessgame-bg.png" alt="Chess pieces" />
                </div>

                {/* Right side - Text content */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-white text-4xl font-bold leading-tight">Play chess.</h1>
                        <h2 className="text-white text-4xl font-bold leading-tight">Improve your game.</h2>
                        <h3 className="text-white text-4xl font-bold leading-tight">Have fun!</h3>
                    </div>
                    <button className="w-full bg-green-500 text-white text-2xl px-12 py-6 rounded-2xl font-bold hover:bg-green-600 transition-all mt-8"
                    onClick={() => navigate("/game")}>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
  )
}
export default Home