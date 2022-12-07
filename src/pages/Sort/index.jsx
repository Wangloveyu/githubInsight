import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts' //(*===所有)，导入所有 并命名为echarts
import MySlider from '../../components/MySlider'

const Echarts = () => {
  const chartRef = useRef()
  const option = {
    title: {
      text: 'Pull Request'
    },
    dataset: {
      source: [
        ['score', 'amount', 'product'],
        [89.3, 58212, 'Matcha Latte'],
        [57.1, 78254, 'Milk Tea'],
        [74.4, 41032, 'Cheese Cocoa'],
        [50.1, 12755, 'Cheese Brownie'],
        [89.7, 20145, 'Matcha Cocoa'],
        [68.1, 79146, 'Tea'],
        [19.6, 91852, 'Orange Juice'],
        [10.6, 101852, 'Lemon Juice'],
        [32.7, 20112, 'Walnut Brownie']
      ]
    },
    grid: { containLabel: true },
    xAxis: { name: 'amount' },
    yAxis: { type: 'category' },
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      bottom: -100,
      min: 10,
      max: 100,
      text: ['High Score', 'Low Score'],
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ['#65B581', '#FFCE34', '#FD665F']
      }
    },
    series: [
      {
        type: 'bar',
        encode: {
          // Map the "amount" column to X axis.
          x: 'amount',
          // Map the "product" column to Y axis
          y: 'product'
        }
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
      <div style={{ width: '100%', height: '100%' }} ref={chartRef}></div>
    </MySlider>
  )
}
export default Echarts
