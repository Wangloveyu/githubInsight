import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
