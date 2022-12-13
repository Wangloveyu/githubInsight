import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Info from './pages/Info'
import Login from './pages/Login'
import MyRepo from './pages/MyRepo'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import RepoDetails from './pages/RepoDetails'
import PullRequest from './pages/PullRequest'
import CommitFrequency from './pages/CommitFrequency'
import IssueFrequency from './pages/IssueFrequency'
import Languages from './pages/Languages'
import Sort from './pages/Sort'
import BasicInfo from './pages/BasicInfo'
import Analysis from './pages/Analysis'
import Comparison from './pages/Comparison'
import CommitCompany from './components/CommitCompany'

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
            <Route path="detail" element={<RepoDetails />}>
              <Route path="basic" element={<BasicInfo />}></Route>
              <Route path="request" element={<PullRequest />}></Route>
              <Route path="commit" element={<CommitFrequency />}></Route>
              <Route path="issue" element={<IssueFrequency />}></Route>
              <Route path="languages" element={<Languages />}></Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
