import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts' //(*===所有)，导入所有 并命名为echarts
import MySlider from '../../components/MySlider'

const Echarts = () => {
  const chartRef = useRef()
  let base = +new Date(1988, 9, 3)
  let oneDay = 24 * 3600 * 1000
  let data = [[base, Math.random() * 300]]
  for (let i = 1; i < 2000; i++) {
    let now = new Date((base += oneDay))
    data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])])
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
      text: 'Commit times'
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'time',
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 20
      },
      {
        start: 0,
        end: 20
      }
    ],
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {},
        data: data
      }
    ]
  }

  useEffect(() => {
    // 创建一个echarts实例，返回echarts实例。不能在单个容器中创建多个echarts实例
    const chart = echarts.init(chartRef.current)

    // 设置图表实例的配置项和数据
    chart.setOption(option)

    // 组件卸载
    return () => {
      // myChart.dispose() 销毁实例。实例销毁后无法再被使用
      chart.dispose()
    }
  }, [])

  return (
    // 宽度要大，不然y轴有些名称可能不会显示
    <div style={{ width: '100%', height: '100%' }} ref={chartRef}></div>
  )
}
export default Echarts
