import styles from './index.module.css'

export default props => {
  return (
    <li className={styles.ListItem}>
      <label>{props.item.title}:</label>
      {props.item.content}
    </li>
  )
}
