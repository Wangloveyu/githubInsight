import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts' //(*===所有)，导入所有 并命名为echarts
import MySlider from '../../components/MySlider'
import { useAppContext } from '../../context/appContext'

const Echarts = () => {
  const chartRef = useRef()
  const { details } = useAppContext()
  let base = +new Date(1988, 9, 3)
  let oneDay = 24 * 3600 * 1000
  let data = [[base, Math.random() * 300]]
  for (let i = 1; i < 2000; i++) {
    let now = new Date((base += oneDay))
    data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])])
  }

  useEffect(() => {
    console.log(details)
    if (chartRef.current && details && details.length !== 0) {
      const chart = echarts.init(chartRef.current)

      const mySet = new Set()
      const data = []
      const legand = []
      details.forEach(item => {
        Object.entries(item.issue_frequency.freq).forEach(it => {
          mySet.add(it[0])
        })
        legand.push(item.name)
      })
      const xData = [...mySet].sort()

      details.forEach(item => {
        const temp = []
        xData.forEach(it => {
          if (item.issue_frequency.freq[it]) {
            temp.push(item.issue_frequency.freq[it])
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
          text: 'Issue Frequency'
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
