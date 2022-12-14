import React from 'react'
import { Menu } from 'antd'
import { Button } from 'antd'
import styles from './index.module.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { useAppContext } from '../../context/appContext'

export default props => {
  const navigator = useNavigate()
  const { user, logoutUser } = useAppContext()
  const userName = useMemo(() => {
    return user?.userName
  }, [localStorage.getItem('user')])
  return (
    <div className={styles.MyHeader}>
      <h1>Hi, {userName}</h1>
      <Button
        onClick={() => {
          logoutUser()
          navigator('/login')
        }}
      >
        Login out
      </Button>
    </div>
  )
}
