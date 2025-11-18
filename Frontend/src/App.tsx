import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import ErrorPage from './Components/ErrorPage'
import Game from './Components/Game'

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<ErrorPage />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
