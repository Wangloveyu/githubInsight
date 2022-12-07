import { PropertySafetyFilled } from '@ant-design/icons'
import { TimePicker } from 'antd'
import { DatePicker } from 'antd'
import { Modal } from 'antd'
import { useState } from 'react'
import styles from './index.module.css'
import '../../assets/iconfont/iconfont.css'
import TimeLineItem from '../TimeLineItem'
import { useRef } from 'react'

const timeEvents = [
  { event: 'Commit1', time: 'Time:2001/12/12', actor: 'Actor:Mike' },
  { event: 'Commit2', time: 'Time:2001/12/14', actor: 'Actor:Jack' },
  { event: 'Commit3', time: 'Time:2001/12/16', actor: 'Actor:Eleven' },
  { event: 'Commit4', time: 'Time:2001/12/17', actor: 'Actor:Jordan' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' },
  { event: '1', time: '2001/12/12' }
]

export default props => {
  const [show, setShow] = useState(false)
  return (
    <div className={styles.TimeLine}>
      <h3
        className={styles.timeline}
        onClick={() => {
          const newState = !show
          // Modal.confirm({
          //   title: 'choose time frame',
          //   content: (
          //     <>
          //       <DatePicker />
          //       {' - '}
          //       <DatePicker />
          //     </>
          //   ),
          //   onOk: () => {
          //     setShow(newState)
          //   }
          // })
          setShow(newState)
        }}
      >
        {<i className={`iconfont ${show ? 'icon-down' : 'icon-right'}`}></i>}TimeLine
      </h3>
      <div className={styles.content} style={show ? {} : { height: '0px' }}>
        {timeEvents.map((item, index) => {
          return <TimeLineItem key={index} item={item} />
        })}
        <TimeLineItem item={{ time: '当前时间', event: 'hfsjkdjfhdj' }} end={true}></TimeLineItem>
      </div>
    </div>
  )
}
