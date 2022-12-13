import styles from './index.module.css'

export default props => {
  return <div className={`${styles.details} empty`}>{props.children}</div>
}
