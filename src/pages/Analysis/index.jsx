import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts' //(*===所有)，导入所有 并命名为echarts
import MySlider from '../../components/MySlider'

const Echarts = () => {
  const chartRef = useRef()
  const option = {
    title: {
      text: 'Code quality Chart'
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
      data: ['Repo1', 'Repo2', 'Repo3', 'Repo4', 'Repo5']
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
        data: ['Version1', 'Version2', 'Version3', 'Version4', 'Version5', 'Version6', 'Version7']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Repo1',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Repo2',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Repo3',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Repo4',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Repo5',
        type: 'line',
        stack: 'Total',
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320]
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
    <MySlider>
      <div style={{ width: '100%', height: '400px' }} ref={chartRef}></div>
    </MySlider>
  )
}
export default Echarts
