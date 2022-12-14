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
    const language = new Set()

    const totalCnt = {}
    details.forEach(item => {
      let tempCnt = 0
      Object.entries(item.language).forEach(l => {
        language.add(l[0])
        tempCnt += parseInt(l[1])
      })
      totalCnt[item.name] = tempCnt
      nameData.push(item.name)
    })
    const yData = [...language]
    const data = []
    let cnt = 1
    details.forEach(item => {
      const temp = []
      cnt *= -1
      yData.forEach(i => {
        if (item.language[i]) {
          temp.push(parseInt(((parseInt(item.language[i]) * cnt) / totalCnt[item.name]).toFixed(4) * 10000) / 100)
        } else {
          temp.push(0)
        }
      })
      data.push({
        name: item.name,
        type: 'bar',
        label: {
          show: true,
          position: cnt < 0 ? 'left' : 'right',
          formatter: e => {
            if (e.data < 0) return -e.data + '%'
            else return e.data
          }
        },
        emphasis: {
          focus: 'series'
        },
        data: temp
      })
    })
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: nameData
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'value',
          min: -100,
          max: 100,
          axisLabel: {
            formatter: e => {
              if (e < 0) {
                return -e + '%'
              } else {
                return e + '%'
              }
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: {
            show: false
          },
          data: yData
        }
      ],
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
