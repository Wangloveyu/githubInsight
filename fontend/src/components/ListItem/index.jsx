import styles from './index.module.css'
const handleString = str => {
  return ('' + str).replaceAll('"', '')
}

export default props => {
  console.log(props.item.content)
  return (
    <li className={styles.ListItem}>
      <label>{props.item.title}:</label>
      {handleString(props.item.content)}
    </li>
  )
}
