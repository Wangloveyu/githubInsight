import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TimeLine from '../../components/TimeLine'
import CommitRank from '../../components/CommitRank'
import CommitTimes from '../../components/CommitTimes'
import CommitCompany from '../../components/CommitCompany'
import styles from './index.module.css'
import '../../assets/iconfont/iconfont.css'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { message } from 'antd'
import { Alert } from 'antd'
import { notification } from 'antd'
import { useAppContext } from '../../context/appContext'
import IssueCompany from '../../components/IssueCompany'

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
  const location = useLocation()
  const navigate = useNavigate()
  const [basicData, setBasicData] = useState({
    commits: 0,
    issues: 0,
    stars: 0,
    forks: 0
  })
  const { displayAlert, detail, showAlert } = useAppContext()
  const { forks, stars, open_issues, timeline, language, commit_frequency, issue_frequency, contributors } = detail

  useEffect(() => {
    if (commit_frequency && commit_frequency.freq) {
      let commits = 0
      if (commit_frequency?.freq?.AllCommits) {
        commits = commit_frequency?.freq?.AllCommits.length
        setBasicData({ commits, issues: open_issues, stars, forks })
      }
    }
  }, [detail])

  return (
    <>
      <div style={{ marginBottom: '20px', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <HeaderCard icon={'icon-git-commit'} color={'#c62828'} content={basicData.commits} type={'Commits'} />
        <HeaderCard icon={'icon-issue-opened'} color={'#1565c0'} content={basicData.issues} type={'Issue'} />
        <HeaderCard icon={'icon-star'} color={'#e65100'} content={basicData.stars} type={'Star Number'} />
        <HeaderCard icon={'icon-fork'} color={'#01579b'} content={basicData.forks} type={'Fork Number'} />
      </div>
      <div className={styles.dataContainer}>
        <div style={{ width: '45%', height: '450px' }}>
          <CommitTimes />
        </div>
        <div style={{ width: '45%' }}>
          <CommitRank />
        </div>
      </div>

      <div style={{ width: '100%', height: '450px', marginTop: '50px' }}>
        <CommitCompany />
      </div>
      <div style={{ width: '100%', height: '450px', marginTop: '50px' }}>
        <IssueCompany />
      </div>
      <TimeLine />
    </>
  )
}
