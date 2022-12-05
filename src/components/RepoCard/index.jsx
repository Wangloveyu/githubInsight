import styles from './index.module.css'
import { UserOutlined, FieldTimeOutlined, StarOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
export default props => {
  const navigator = useNavigate()
  return (
    <div className={styles.RepoCard}>
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
  )
}
