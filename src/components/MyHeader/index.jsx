import React from 'react'
import { Menu } from 'antd'
import { Button } from 'antd'
import styles from './index.module.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useMemo } from 'react'

export default props => {
  const navigator = useNavigate()
  const user = useMemo(() => {
    const data = JSON.parse(localStorage.getItem('userInfo'))
    return data.username
  }, [localStorage.getItem('userInfo')])
  return (
    <div className={styles.MyHeader}>
      <h1>Hi, {user}</h1>
      <Button
        onClick={() => {
          localStorage.removeItem('login')
          navigator('/login')
        }}
      >
        Login out
      </Button>
    </div>
  )
}
