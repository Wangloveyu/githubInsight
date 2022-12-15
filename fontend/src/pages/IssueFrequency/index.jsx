import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts' //(*===所有)，导入所有 并命名为echarts
import MySlider from '../../components/MySlider'
import { useAppContext } from '../../context/appContext'
import IssueFrequency from '../../components/IssueFrequency'
import IssueMonth from '../../components/IssueMonth'

const Echarts = () => {
  return (
    // 宽度要大，不然y轴有些名称可能不会显示
    // <div style={{ height: '100%', width: '100%' }} ref={chartRef}></div>
    <>
      <div style={{ height: '100%', width: '100%' }}>
        <IssueFrequency />
      </div>
      <div style={{ height: '100%', width: '100%' }}>
        <IssueMonth />
      </div>
    </>
  )
}
export default Echarts
