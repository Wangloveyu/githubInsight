import styles from './index.module.css'

export default props => {
  return <div className={styles.details}>{props.children}</div>
}
