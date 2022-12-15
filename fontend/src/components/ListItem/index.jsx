import styles from './index.module.css'
const handleString = str => {
  return ('' + str).replaceAll('"', '')
}

export default props => {
  return (
    <li className={styles.ListItem}>
      <label>{props.item.title}:</label>
      {handleString(props.item.content)}
    </li>
  )
}
