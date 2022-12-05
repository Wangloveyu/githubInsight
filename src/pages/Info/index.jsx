import { Space } from 'antd'
import { Button } from 'antd'
import { useEffect } from 'react'
import { useState } from 'react'
import ListItem from '../../components/ListItem'
import styles from './index.module.css'

const data = [
  { title: 'username', content: 'ceshi' },
  { title: 'username', content: 'ceshi' },
  { title: 'username', content: 'ceshi' }
]

export default () => {
  const [items, setItems] = useState([])
  useEffect(() => {
    const temp = []
    let key = 0
    data.forEach(item => {
      temp.push({
        key: key++,
        title: item.title,
        content: item.content
      })
    })
    setItems(temp)
  }, [])
  return (
    <div className={styles.Info}>
      <img src="https://img2.baidu.com/it/u=1003272215,1878948666&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1670346000&t=600e74135b45cc8cd24140df44d4fc50"></img>
      <ul>
        {items.map(item => {
          return <ListItem key={item.key} item={item} />
        })}
      </ul>
      <Space>
        <Button>编辑信息</Button>
        <Button>找回密码</Button>
      </Space>
    </div>
  )
}
