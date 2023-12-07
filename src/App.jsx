import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from './pages/Home.jsx'
import MapPage from './pages/MapPage.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="harita" element={<MapPage />} />
      </Routes>
    </>
  )
}

export default App
