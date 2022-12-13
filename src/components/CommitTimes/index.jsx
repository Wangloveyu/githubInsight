import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts' //(*===所有)，导入所有 并命名为echarts
import MySlider from '../../components/MySlider'
import { useAppContext } from '../../context/appContext'

const Echarts = () => {
  console.log('CommitTimes')
  const chartRef = useRef()
  const { detail } = useAppContext()
  useEffect(() => {
    // 创建一个echarts实例，返回echarts实例。不能在单个容器中创建多个echarts实例
    const chart = echarts.init(chartRef.current)

    const { commit_frequency } = detail
    let data = []
    let date = []

    if (commit_frequency && commit_frequency.freq) {
      Object.entries(commit_frequency.freq).map(item => {
        date.push(item[0])
        data.push(item[1])
      })
    }
    const option = {
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%']
        }
      },
      title: {
        left: 'center',
        text: 'Commit Times'
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      series: [
        {
          name: 'Commit Time',
          type: 'line',
          symbol: 'none',
          sampling: 'lttb',
          itemStyle: {
            color: 'rgb(255, 70, 131)'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 158, 68)'
              },
              {
                offset: 1,
                color: 'rgb(255, 70, 131)'
              }
            ])
          },
          data: data
        }
      ]
    }

    // 设置图表实例的配置项和数据
    chart.setOption(option)

    // 组件卸载
    return () => {
      // myChart.dispose() 销毁实例。实例销毁后无法再被使用
      chart.dispose()
    }
  }, [detail])

  return (
    // 宽度要大，不然y轴有些名称可能不会显示
    <div style={{ width: '100%', height: '100%' }} ref={chartRef}></div>
  )
}
export default Echarts
