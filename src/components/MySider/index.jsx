import React from 'react'
import { Menu } from 'antd'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useEffect } from 'react'

import styles from './index.module.css'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const data = [
  { title: 'my repo', path: 'repo' },
  { title: 'info', path: 'info' }
]

export default () => {
  const navigator = useNavigate()
  const location = useLocation()
  const [menu, setMenu] = useState([])
  const [currentkey, setCurrentKey] = useState(0)
  useEffect(() => {
    let key = 0
    const temp = []
    data.forEach(item => {
      temp.push({
        key: key++,
        title: item.title,
        path: item.path
      })
    })
    const myPath = location.pathname.split('/')
    const curPath = myPath[myPath.length - 1]
    temp.forEach(item => {
      if (item.path === curPath) {
        setCurrentKey(item.key)
      }
    })
    setMenu(temp)
  }, [])
  return (
    <ul>
      {menu.map(item => {
        return (
          <li
            onClick={() => {
              setCurrentKey(item.key)
              navigator(item.path)
            }}
            className={item.key === currentkey ? styles.menuItem_chosen : styles.menuItem}
            key={item.key}
          >
            {item.title}
          </li>
        )
      })}
    </ul>
  )
}
