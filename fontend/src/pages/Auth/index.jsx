import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

export default () => {
  const location = useLocation()
  const navigator = useNavigate()
  useEffect(() => {
    const temp = location.pathname.replace(/\/$/g, '').split('/')
    const lastPath = temp[temp.length - 1]
    switch (location.pathname) {
      case '/':
        navigator('/login')
      default:
        if (lastPath === 'home') {
          navigator('/home/repo')
        }
    }
  }, [location.pathname])
  return <Outlet />
}
