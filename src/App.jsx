import { Routes, Route } from 'react-router-dom'
import LandingPage from "./pages/landingPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Add more routes here as needed */}
    </Routes>
  )
}

export default App
