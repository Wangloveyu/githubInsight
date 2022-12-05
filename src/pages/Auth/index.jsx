import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

export default () => {
  const location = useLocation()
  const navigator = useNavigate()
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        navigator('/login')
    }
  }, [])
  return <Outlet />
}
