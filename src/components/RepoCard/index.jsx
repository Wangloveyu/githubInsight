import styles from './index.module.css'
import { UserOutlined, FieldTimeOutlined, StarOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
export default props => {
  const navigator = useNavigate()
  const [display, setDisplay] = useState(false)
  let timer = null
  return (
    <div className={styles.container}>
      <div style={{ display: display ? 'block' : 'none' }} className={styles.delete} onClick={props.onDelete}>
        delete
      </div>
      <div
        onMouseDown={() => {
          if (!timer) {
            console.log('按下')
            timer = setTimeout(() => {
              setDisplay(true)
            }, 1000)
          }
        }}
        onMouseUp={() => {
          if (timer) {
            console.log('释放')
            clearTimeout(timer)
          }
        }}
        onClick={() => {
          if (timer) setDisplay(false)
        }}
        className={styles.RepoCard}
      >
        <h3>{props.item.repoName}</h3>
        <p>
          <UserOutlined /> {props.item.owner}
        </p>
        <p>
          <FieldTimeOutlined />
          {props.item.importTime}
        </p>
        <p>
          <StarOutlined />
          {props.item.star}
        </p>
        <div></div>
        <p
          onClick={() => {
            navigator('/home/detail')
          }}
        >
          {'Go->'}
        </p>
      </div>
    </div>
  )
}
