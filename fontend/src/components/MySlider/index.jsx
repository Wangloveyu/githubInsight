import styles from './index.module.css'

export default props => {
  return (
    <div style={props?.style} className={`${styles.details} empty`}>
      {props.children}
    </div>
  )
}
