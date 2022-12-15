import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts' //(*===所有)，导入所有 并命名为echarts
import MySlider from '../MySlider'
import { useAppContext } from '../../context/appContext'

const Echarts = () => {
  const chartRef = useRef()
  const { details } = useAppContext()

  useEffect(() => {
    if (chartRef.current && details && details.length !== 0) {
      const chart = echarts.init(chartRef.current)

      const mySet = new Set()
      const data = []
      const legand = []
      details.forEach(item => {
        if (item?.issue_frequency?.freq?.Day) {
          Object.entries(item?.issue_frequency?.freq?.Day).forEach(it => {
            mySet.add(it[0])
          })
        }
        legand.push(item.name)
      })
      const xData = [...mySet].sort()

      details.forEach(item => {
        const temp = []
        xData.forEach(it => {
          if (item?.issue_frequency?.freq?.Day[it]) {
            temp.push(item.issue_frequency.freq.Day[it])
          } else {
            temp.push(0)
          }
        })
        data.push({
          name: item.name,
          type: 'line',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: temp
        })
      })

      const option = {
        title: {
          text: 'Issue Frequency -Day'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: legand,
          top: '25px'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: xData
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: data
      }

      // 设置图表实例的配置项和数据
      chart.setOption(option)

      // 组件卸载
      return () => {
        // myChart.dispose() 销毁实例。实例销毁后无法再被使用
        chart.dispose()
      }
    }
  }, [chartRef.current, details])

  return (
    // 宽度要大，不然y轴有些名称可能不会显示
    <div style={{ height: '100%', width: '100%' }} ref={chartRef}></div>
  )
}
export default Echarts
