import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Info from './pages/Info'
import Login from './pages/Login'
import MyRepo from './pages/MyRepo'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import RepoDetails from './pages/RepoDetails'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<Home />}>
            <Route path="repo" element={<MyRepo />}></Route>
            <Route path="info" element={<Info />}></Route>
            <Route path="detail" element={<RepoDetails />}></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
