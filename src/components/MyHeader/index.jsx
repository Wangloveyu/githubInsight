import React from 'react'
import { Menu } from 'antd'
import { Button } from 'antd'
import styles from './index.module.css'

export default () => {
  return (
    <div className={styles.MyHeader}>
      <h1>Hi, user</h1>
      <Button>Login out</Button>
    </div>
  )
}
