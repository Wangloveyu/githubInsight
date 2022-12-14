import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import { Row, Col } from 'antd'
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import { List } from 'antd'
import { Typography } from 'antd'
import { useState } from 'react'
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'
import { useRef } from 'react'
import MySlider from '../MySlider'

var jsonlist = []
jsonlist.push(
  {
    name: '花鸟市场',
    value: 1446
  },
  {
    name: '汽车',
    value: 928
  },
  {
    name: '视频',
    value: 906
  },
  {
    name: '电视',
    value: 825
  },
  {
    name: 'Lover Boy 88',
    value: 514
  },
  {
    name: '动漫',
    value: 486
  },
  {
    name: '音乐',
    value: 5999
  },
  {
    name: '直播',
    value: 163
  },
  {
    name: '广播电台',
    value: 86
  },
  {
    name: '戏曲曲艺',
    value: 17
  },
  {
    name: '演出票务',
    value: 6
  },
  {
    name: '给陌生的你听',
    value: 1
  },
  {
    name: '资讯',
    value: 1437
  },
  {
    name: '商业财经',
    value: 422
  },
  {
    name: '娱乐八卦',
    value: 353
  },
  {
    name: '军事',
    value: 331
  },
  {
    name: '科技资讯',
    value: 313
  },
  {
    name: '社会时政',
    value: 307
  },
  {
    name: '时尚',
    value: 43
  },
  {
    name: '网络奇闻',
    value: 15
  },
  {
    name: '旅游出行',
    value: 438
  },
  {
    name: '景点类型',
    value: 957
  },
  {
    name: '国内游',
    value: 927
  },
  {
    name: '远途出行方式',
    value: 908
  },
  {
    name: '酒店',
    value: 693
  },
  {
    name: '关注景点',
    value: 611
  },
  {
    name: '旅游网站偏好',
    value: 512
  },
  {
    name: '出国游',
    value: 382
  },
  {
    name: '交通票务',
    value: 312
  },
  {
    name: '旅游方式',
    value: 187
  },
  {
    name: '旅游主题',
    value: 163
  },
  {
    name: '港澳台',
    value: 104
  },
  {
    name: '本地周边游',
    value: 3
  },
  {
    name: '小卖家',
    value: 1331
  },
  {
    name: '全日制学校',
    value: 941
  },
  {
    name: '基础教育科目',
    value: 585
  },
  {
    name: '考试培训',
    value: 473
  },
  {
    name: '语言学习',
    value: 358
  },
  {
    name: '留学',
    value: 246
  },
  {
    name: 'K12课程培训',
    value: 207
  },
  {
    name: '艺术培训',
    value: 194
  },
  {
    name: '技能培训',
    value: 104
  },
  {
    name: 'IT培训',
    value: 87
  },
  {
    name: '高等教育专业',
    value: 63
  },
  {
    name: '家教',
    value: 48
  },
  {
    name: '体育培训',
    value: 23
  },
  {
    name: '职场培训',
    value: 5
  },
  {
    name: '金融财经',
    value: 1328
  },
  {
    name: '银行',
    value: 765
  },
  {
    name: '股票',
    value: 452
  },
  {
    name: '保险',
    value: 415
  },
  {
    name: '贷款',
    value: 253
  },
  {
    name: '基金',
    value: 211
  },
  {
    name: '信用卡',
    value: 180
  },
  {
    name: '外汇',
    value: 138
  },
  {
    name: 'P2P',
    value: 116
  },
  {
    name: '贵金属',
    value: 98
  },
  {
    name: '债券',
    value: 93
  },
  {
    name: '网络理财',
    value: 92
  },
  {
    name: '信托',
    value: 90
  },
  {
    name: '征信',
    value: 76
  },
  {
    name: '期货',
    value: 76
  },
  {
    name: '公积金',
    value: 40
  },
  {
    name: '银行理财',
    value: 36
  },
  {
    name: '银行业务',
    value: 30
  },
  {
    name: '典当',
    value: 7
  },
  {
    name: '海外置业',
    value: 1
  },
  {
    name: '汽车',
    value: 1309
  },
  {
    name: '汽车档次',
    value: 965
  },
  {
    name: '汽车品牌',
    value: 900
  },
  {
    name: '汽车车型',
    value: 727
  },
  {
    name: '购车阶段',
    value: 461
  },
  {
    name: '二手车',
    value: 309
  },
  {
    name: '汽车美容',
    value: 260
  },
  {
    name: '新能源汽车',
    value: 173
  },
  {
    name: '汽车维修',
    value: 155
  },
  {
    name: '租车服务',
    value: 136
  },
  {
    name: '车展',
    value: 121
  },
  {
    name: '违章查询',
    value: 76
  },
  {
    name: '汽车改装',
    value: 62
  },
  {
    name: '汽车用品',
    value: 37
  },
  {
    name: '路况查询',
    value: 32
  },
  {
    name: '汽车保险',
    value: 28
  },
  {
    name: '陪驾代驾',
    value: 4
  },
  {
    name: '网络购物',
    value: 1275
  },
  {
    name: '作个人猫',
    value: 1088
  },
  {
    name: '只想要你知道',
    value: 907
  },
  {
    name: '团购',
    value: 837
  },
  {
    name: '比价',
    value: 201
  },
  {
    name: '海淘',
    value: 195
  },
  {
    name: '移动APP购物',
    value: 179
  },
  {
    name: '支付方式',
    value: 119
  },
  {
    name: '代购',
    value: 43
  },
  {
    name: '体育健身',
    value: 1234
  },
  {
    name: '体育赛事项目',
    value: 802
  },
  {
    name: '运动项目',
    value: 405
  },
  {
    name: '体育类赛事',
    value: 337
  },
  {
    name: '健身项目',
    value: 199
  },
  {
    name: '健身房健身',
    value: 78
  },
  {
    name: '运动健身',
    value: 77
  },
  {
    name: '家庭健身',
    value: 36
  },
  {
    name: '健身器械',
    value: 29
  },
  {
    name: '办公室健身',
    value: 3
  },
  {
    name: '商务服务',
    value: 1201
  },
  {
    name: '法律咨询',
    value: 508
  },
  {
    name: '化工材料',
    value: 147
  },
  {
    name: '广告服务',
    value: 125
  },
  {
    name: '会计审计',
    value: 115
  },
  {
    name: '人员招聘',
    value: 101
  },
  {
    name: '印刷打印',
    value: 66
  },
  {
    name: '知识产权',
    value: 32
  },
  {
    name: '翻译',
    value: 22
  },
  {
    name: '安全安保',
    value: 9
  },
  {
    name: '公关服务',
    value: 8
  },
  {
    name: '商旅服务',
    value: 2
  },
  {
    name: '展会服务',
    value: 2
  },
  {
    name: '特许经营',
    value: 1
  },
  {
    name: '休闲爱好',
    value: 1169
  },
  {
    name: '收藏',
    value: 412
  },
  {
    name: '摄影',
    value: 393
  },
  {
    name: '温泉',
    value: 230
  },
  {
    name: '博彩彩票',
    value: 211
  },
  {
    name: '美术',
    value: 207
  },
  {
    name: '书法',
    value: 139
  },
  {
    name: 'DIY手工',
    value: 75
  },
  {
    name: '舞蹈',
    value: 23
  },
  {
    name: '钓鱼',
    value: 21
  },
  {
    name: '棋牌桌游',
    value: 17
  },
  {
    name: 'KTV',
    value: 6
  },
  {
    name: '密室',
    value: 5
  },
  {
    name: '采摘',
    value: 4
  },
  {
    name: '电玩',
    value: 1
  },
  {
    name: '真人CS',
    value: 1
  },
  {
    name: '轰趴',
    value: 1
  },
  {
    name: '家电数码',
    value: 1111
  },
  {
    name: '手机',
    value: 885
  },
  {
    name: '电脑',
    value: 543
  },
  {
    name: '你们电',
    value: 321
  },
  {
    name: '家电关注品牌',
    value: 253
  },
  {
    name: '网络设备',
    value: 162
  },
  {
    name: '摄影器材',
    value: 149
  },
  {
    name: '影音设备',
    value: 133
  },
  {
    name: '办公数码设备',
    value: 113
  },
  {
    name: '生活电器',
    value: 67
  },
  {
    name: '厨房电器',
    value: 54
  },
  {
    name: '智能设备',
    value: 45
  },
  {
    name: '我的护理电器',
    value: 22
  },
  {
    name: '服饰鞋包',
    value: 1047
  },
  {
    name: '服装',
    value: 566
  },
  {
    name: '饰品',
    value: 289
  },
  {
    name: '鞋',
    value: 184
  },
  {
    name: '箱包',
    value: 168
  },
  {
    name: '奢侈品',
    value: 137
  },
  {
    name: '母婴亲子',
    value: 1041
  },
  {
    name: '孕婴保健',
    value: 505
  },
  {
    name: '母婴社区',
    value: 299
  },
  {
    name: '早教',
    value: 103
  },
  {
    name: '奶粉辅食',
    value: 66
  },
  {
    name: '童车童床',
    value: 41
  },
  {
    name: '关注品牌',
    value: 271
  },
  {
    name: '宝宝玩乐',
    value: 30
  },
  {
    name: '母婴护理服务',
    value: 25
  },
  {
    name: '纸尿裤湿巾',
    value: 16
  },
  {
    name: '妈妈用品',
    value: 15
  },
  {
    name: '宝宝起名',
    value: 12
  },
  {
    name: '童装童鞋',
    value: 9
  },
  {
    name: '胎教',
    value: 8
  },
  {
    name: '宝宝安全',
    value: 1
  },
  {
    name: '宝宝洗护用品',
    value: 1
  },
  {
    name: '软件应用',
    value: 1018
  },
  {
    name: '系统工具',
    value: 896
  },
  {
    name: '理财购物',
    value: 440
  },
  {
    name: '生活实用',
    value: 365
  },
  {
    name: '影音图像',
    value: 256
  },
  {
    name: '社交通信',
    value: 214
  },
  {
    name: '手机美化',
    value: 39
  },
  {
    name: '办公学习',
    value: 28
  },
  {
    name: '应用市场',
    value: 23
  },
  {
    name: '母婴育儿',
    value: 14
  },
  {
    name: '游戏',
    value: 946
  },
  {
    name: '手机游戏',
    value: 565
  },
  {
    name: 'PC游戏',
    value: 353
  },
  {
    name: '网页游戏',
    value: 254
  },
  {
    name: '游戏机',
    value: 188
  },
  {
    name: '模拟辅助',
    value: 166
  },
  {
    name: '个护美容',
    value: 942
  },
  {
    name: '护肤品',
    value: 177
  },
  {
    name: '彩妆',
    value: 133
  },
  {
    name: '美发',
    value: 80
  },
  {
    name: '香水',
    value: 50
  },
  {
    name: '我的护理',
    value: 46
  },
  {
    name: '美甲',
    value: 26
  },
  {
    name: 'SPA美体',
    value: 21
  },
  {
    name: '花鸟萌宠',
    value: 914
  },
  {
    name: '绿植花卉',
    value: 311
  },
  {
    name: '狗',
    value: 257
  },
  {
    name: '其余宠物',
    value: 131
  },
  {
    name: '水族',
    value: 125
  },
  {
    name: '猫',
    value: 122
  },
  {
    name: '动物',
    value: 81
  },
  {
    name: '鸟',
    value: 67
  },
  {
    name: '宠物用品',
    value: 41
  },
  {
    name: '宠物服务',
    value: 26
  },
  {
    name: '书籍阅读',
    value: 913
  },
  {
    name: '网络小说',
    value: 483
  },
  {
    name: '关注书籍',
    value: 128
  },
  {
    name: '文学',
    value: 105
  },
  {
    name: '报刊杂志',
    value: 77
  },
  {
    name: '人文社科',
    value: 22
  },
  {
    name: '建材家居',
    value: 907
  },
  {
    name: '装修建材',
    value: 644
  },
  {
    name: '家具',
    value: 273
  },
  {
    name: '家居风格',
    value: 187
  },
  {
    name: '家居家装关注品牌',
    value: 140
  },
  {
    name: '家纺',
    value: 107
  },
  {
    name: '厨具',
    value: 47
  },
  {
    name: '灯具',
    value: 43
  },
  {
    name: '家居饰品',
    value: 29
  },
  {
    name: '家居平常用品',
    value: 10
  },
  {
    name: '生活服务',
    value: 883
  },
  {
    name: '物流配送',
    value: 536
  },
  {
    name: '家政服务',
    value: 108
  },
  {
    name: '摄影服务',
    value: 49
  },
  {
    name: '搬家服务',
    value: 38
  },
  {
    name: '物业维修',
    value: 37
  },
  {
    name: '婚庆服务',
    value: 24
  },
  {
    name: '二手回收',
    value: 24
  },
  {
    name: '鲜花配送',
    value: 3
  },
  {
    name: '维修服务',
    value: 3
  },
  {
    name: '殡葬服务',
    value: 1
  },
  {
    name: '求职创业',
    value: 874
  },
  {
    name: '创业',
    value: 363
  },
  {
    name: '目标职位',
    value: 162
  },
  {
    name: '目标行业',
    value: 50
  },
  {
    name: '兼职',
    value: 21
  },
  {
    name: '指望年薪',
    value: 20
  },
  {
    name: '实习',
    value: 16
  },
  {
    name: '雇主类型',
    value: 10
  },
  {
    name: '星座运势',
    value: 789
  },
  {
    name: '星座',
    value: 316
  },
  {
    name: '算命',
    value: 303
  },
  {
    name: '解梦',
    value: 196
  },
  {
    name: '风水',
    value: 93
  },
  {
    name: '面相分析',
    value: 47
  },
  {
    name: '手相',
    value: 32
  },
  {
    name: '公益',
    value: 90
  }
)

export default () => {
  console.log('CommitTimes')
  const [top10, setTop10] = useState([])
  const [allData, setAllData] = useState([])
  const { detail } = useAppContext()
  const { commit_frequency } = detail
  const chartRef = useRef()

  useEffect(() => {
    if (commit_frequency?.orgs) {
      console.log('更新')
      const newTop = []
      const temp = []
      commit_frequency.orgs.forEach(item => {
        temp.push({
          name: item.name,
          value: item.num
        })
        if (newTop.length < 10) {
          newTop.push({
            name: item.name,
            value: item.num
          })
        }
      })
      setAllData(temp)
      setTop10(newTop)
    }
  }, [commit_frequency])

  useEffect(() => {
    // 创建一个echarts实例，返回echarts实例。不能在单个容器中创建多个echarts实例
    const chart = echarts.init(chartRef.current)

    let maskImage = new Image()
    // 此为词云图呈现形状的图片base64码，一定要有，可以自定义图片
    // maskImage.src =
    //   'data:image/png;base64,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'

    maskImage.src =
      'data:image/png;base64,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'

    let option = {
      backgroundColor: '#fff',
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      series: [
        {
          type: 'wordCloud',
          gridSize: 1,
          // Text size range which the value in data will be mapped to.
          // Default to have minimum 12px and maximum 60px size.
          sizeRange: [12, 55],
          // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45

          rotationRange: [-45, 0, 45, 90],
          maskImage: maskImage,
          textStyle: {
            normal: {
              color: function () {
                return 'rgb(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ')'
              }
            }
          },
          // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
          // Default to be put in the center and has 75% x 80% size.
          left: 'center',
          top: 'center',
          right: null,
          bottom: null,
          width: '90%',
          height: '100%',
          data: allData
        }
      ]
    }

    // 设置图表实例的配置项和数据
    chart.setOption(option)
    // 组件卸载
    return () => {
      // 销毁实例。实例销毁后无法再被使用
      chart.dispose()
    }
  }, [allData])

  return (
    <div style={{ width: '100%', height: '450px' }}>
      <h2>Commit Company</h2>
      <div style={{ width: '100%', height: '400px', display: 'flex', paddingTop: '10px' }}>
        {/* <ReactEcharts style={{ width: '60%', height: '100%' }} option={wordOption()} theme="ThemeStyle" /> */}

        <div style={{ width: '60%', height: '100%' }} ref={chartRef}></div>
        <List
          style={{
            width: '40%',
            height: '100%',
            overflow: 'auto'
          }}
          header={<h3>Commit Top 10</h3>}
          bordered
          dataSource={top10}
          renderItem={item => (
            <List.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
              {' '}
              <label>{item.name}</label>
              {item.value}
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}
