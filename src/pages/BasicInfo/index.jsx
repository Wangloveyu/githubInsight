import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TimeLine from '../../components/TimeLine'
import CommitRank from '../../components/CommitRank'
import styles from './index.module.css'
export default () => {
  useState(() => {}, [])
  const navigator = useNavigate()

  return (
    <>
      <div className={styles.dataContainer}>
        <div style={{ width: '60%' }}></div>
        <div style={{ width: '40%' }}>
          <CommitRank />
        </div>
      </div>
      <TimeLine />
    </>
  )
}
