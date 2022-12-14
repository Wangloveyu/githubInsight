import { PropertySafetyFilled } from '@ant-design/icons'
import { TimePicker } from 'antd'
import { DatePicker } from 'antd'
import { Modal } from 'antd'
import { useState } from 'react'
import styles from './index.module.css'
import '../../assets/iconfont/iconfont.css'
import TimeLineItem from '../TimeLineItem'
import { useRef } from 'react'
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'

const timeEvents = [
  { event: 'Commit1', time: 'Time:2001/12/12', actor: 'Actor:Mike' },
  { event: 'Commit2', time: 'Time:2001/12/14', actor: 'Actor:Jack' },
  { event: 'Commit3', time: 'Time:2001/12/16', actor: 'Actor:Eleven' },
  { event: 'Commit4', time: 'Time:2001/12/17', actor: 'Actor:Jordan' }
]

export default props => {
  const [show, setShow] = useState(false)
  const [data, setData] = useState(timeEvents)
  const { detail } = useAppContext()
  useEffect(() => {
    console.log(detail)
    if (detail?.timeline && detail?.commit_frequency?.freq?.AllCommits) {
      const newData = []
      let cnt = 0
      Object.entries(detail.timeline).forEach(item => {
        cnt++
        newData.push({
          event: item[0],
          time: item[1].replaceAll(/([T])|(Z)/g, ' ')
        })
        if (cnt == 1) {
          detail?.commit_frequency?.freq?.AllCommits.forEach(commit => {
            newData.push({
              event: 'commit at',
              time: commit.replaceAll(/([T])|(Z)/g, ' ')
            })
          })
        }
      })
      setData(newData)
    }
  }, [detail?.timeline, detail?.commit_frequency?.freq])
  return (
    <div className={styles.TimeLine}>
      <h3
        className={styles.timeline}
        onClick={() => {
          const newState = !show
          setShow(newState)
        }}
      >
        {<i className={`iconfont ${show ? 'icon-down' : 'icon-right'}`}></i>}TimeLine
      </h3>
      <div className={styles.content} style={show ? {} : { height: '0px' }}>
        {data.map((item, index) => {
          return <TimeLineItem key={index} item={item} />
        })}
        <TimeLineItem item={{ time: 'now', event: '...' }} end={true}></TimeLineItem>
      </div>
    </div>
  )
}
