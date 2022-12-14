import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts' //(*===所有)，导入所有 并命名为echarts
import MySlider from '../../components/MySlider'
import { useAppContext } from '../../context/appContext'

const Echarts = () => {
  console.log('Language')
  const { details, selectList } = useAppContext()
  const chartRef = useRef()

  useEffect(() => {
    const nameData = []
    const type = new Set()

    const totalCnt = {}
    details.forEach(item => {
      let tempCnt = 0
      Object.entries(item.pull_requests).forEach(l => {
        type.add(l[0])
        tempCnt += parseInt(l[1])
      })
      totalCnt[item.name] = tempCnt
      nameData.push(item.name)
    })
    const yData = [...type]
    const data = []
    details.forEach(item => {
      const temp = []
      yData.forEach(i => {
        console.log(item.pull_requests[i])
        if (item.pull_requests[i]) {
          temp.push(parseInt((parseInt(item.pull_requests[i]) / totalCnt[item.name]).toFixed(4) * 10000) / 100)
        } else {
          temp.push(0)
        }
      })
      data.push({
        name: item.name,
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: temp,
        label: {
          show: true,
          formatter: e => {
            return e.data + '%'
          }
        }
      })
    })
    console.log(data)
    console.log(details)
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          formatter: e => {
            return e + '%'
          }
        }
      },
      yAxis: {
        type: 'category',
        data: yData
      },
      series: data
    }

    // 创建一个echarts实例，返回echarts实例。不能在单个容器中创建多个echarts实例
    const chart = echarts.init(chartRef.current)

    // 设置图表实例的配置项和数据
    chart.setOption(option)

    // 组件卸载
    return () => {
      // myChart.dispose() 销毁实例。实例销毁后无法再被使用
      chart.dispose()
    }
  }, [details])

  return (
    // 宽度要大，不然y轴有些名称可能不会显示
    <div style={{ width: '100%', height: '100%' }} ref={chartRef}></div>
  )
}
export default Echarts
