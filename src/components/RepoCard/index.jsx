import styles from './index.module.css'
import { UserOutlined, FieldTimeOutlined, StarOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Checkbox } from 'antd'
import { useAppContext } from '../../context/appContext'

export default props => {
  const navigator = useNavigate()
  const [display, setDisplay] = useState(false)
  const { setSelectedRepos } = useAppContext()
  let timer = null
  return (
    <div className={styles.container}>
      <div style={{ display: display ? 'block' : 'none' }} className={styles.delete} onClick={props?.onDelete}>
        delete
      </div>
      <Checkbox
        style={{
          display: props.mult ? 'block' : 'none'
        }}
        className={styles.myCheckBox}
        onChange={() => props.onChange(props.item._id, props.item.name)}
      />
      <div
        onMouseDown={() => {
          if (!timer) {
            timer = setTimeout(() => {
              setDisplay(true)
            }, 1000)
          }
        }}
        onMouseUp={() => {
          if (timer) {
            clearTimeout(timer)
          }
        }}
        onClick={() => {
          if (timer) setDisplay(false)
        }}
        className={styles.RepoCard}
      >
        <h3>{props.item.name}</h3>
        <p>
          <UserOutlined /> {props.item.owner}
        </p>
        <p>
          <FieldTimeOutlined /> {props.item.uploaded_time.split('T')[0]}
        </p>
        <p>
          <StarOutlined /> {props.item.stars}
        </p>
        <div></div>
        <p
          onClick={() => {
            const temp = new Set()
            temp.add({ key: props.item._id, label: props.item.name })
            setSelectedRepos(temp)
            navigator('/home/detail/basic')
          }}
        >
          {'Go->'}
        </p>
      </div>
    </div>
  )
}
