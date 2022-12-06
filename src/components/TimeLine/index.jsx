import { PropertySafetyFilled } from '@ant-design/icons'
import { TimePicker } from 'antd'
import { DatePicker } from 'antd'
import { Modal } from 'antd'
import { useState } from 'react'
import styles from './index.module.css'
import '../../assets/iconfont/iconfont.css'
import TimeLineItem from '../TimeLineItem'

const timeEvents = [
  { event: '1fdsssssssssgfffffffffffffffffffd', time: '2001/12/12' },
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
        {<i className={`iconfont ${show ? 'icon-down' : 'icon-right'}`}></i>}时间轴
      </h3>
      <div className={styles.content} style={show ? {} : { height: '0px' }}>
        {timeEvents.map(item => {
          return <TimeLineItem item={item} />
        })}
        <TimeLineItem item={{ time: '当前时间', event: 'hfsjkdjfhdj' }} end={true}></TimeLineItem>
      </div>
    </div>
  )
}
