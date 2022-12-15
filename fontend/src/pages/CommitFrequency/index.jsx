import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts' //(*===所有)，导入所有 并命名为echarts
import MySlider from '../../components/MySlider'
import { useAppContext } from '../../context/appContext'
import CommitFrequency from '../../components/CommitFrequency'
import CommitMonth from '../../components/CommitMonth'

const Echarts = () => {
  return (
    <>
      <div style={{ height: '450px', width: '100%' }}>
        <CommitFrequency />
      </div>
      <div style={{ height: '450px', width: '100%' }}>
        <CommitMonth />
      </div>
    </>
  )
}
export default Echarts
