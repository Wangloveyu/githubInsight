import { useState } from 'react'
import styles from './index.module.css'

export default props => {
  const [show, setShow] = useState(false)
  return (
    <div className={styles.container}>
      <div style={{ display: show ? 'block' : 'none' }} className={styles.window}>
        <p>Event: {props.item?.event}</p>
        {/* <p>{props.item?.actor}</p> */}
        <p>Time: {props.item?.time}</p>
      </div>
      <div
        onMouseEnter={() => {
          setShow(true)
        }}
        onMouseLeave={() => {
          setShow(false)
        }}
        className={styles.dot}
      ></div>
      {props.end ? <div className={styles.end}></div> : <div className={styles.line}></div>}
    </div>
  )
}
