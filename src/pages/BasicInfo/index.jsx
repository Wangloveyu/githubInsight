import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TimeLine from '../../components/TimeLine'
import CommitRank from '../../components/CommitRank'
import CommitTimes from '../../components/CommitTimes'
import styles from './index.module.css'
import '../../assets/iconfont/iconfont.css'

const basicData = {
  commits: 234,
  issue: 13,
  star: 2820,
  fork: 1270
}

const HeaderCard = props => {
  return (
    <div className={styles.HeaderCard} style={{ color: props?.color }}>
      <i style={{ background: `radial-gradient(farthest-side at 5% 5%,white 10%, ${props?.color})` }} className={`iconfont ${props?.icon}`}></i>
      <h2>{props.content}</h2>
      <h5>{props.type}</h5>
    </div>
  )
}

export default () => {
  useState(() => {}, [])
  const navigator = useNavigate()

  return (
    <>
      <div style={{ marginBottom: '20px', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <HeaderCard icon={'icon-git-commit'} color={'#c62828'} content={basicData.commits} type={'Commits'} />
        <HeaderCard icon={'icon-issue-opened'} color={'#1565c0'} content={basicData.issue} type={'Issue'} />
        <HeaderCard icon={'icon-star'} color={'#e65100'} content={basicData.star} type={'Star Number'} />
        <HeaderCard icon={'icon-fork'} color={'#01579b'} content={basicData.fork} type={'Fork Number'} />
      </div>
      <div className={styles.dataContainer}>
        <div style={{ width: '45%', height: '450px' }}>
          <CommitTimes />
        </div>
        <div style={{ width: '40%' }}>
          <CommitRank />
        </div>
      </div>
      <TimeLine />
    </>
  )
}
