import { Space, Button, Col, DatePicker, Drawer, Form, Input, Row, Select } from 'antd'
import ListItem from '../../components/ListItem'
import styles from './index.module.css'
import React, { useState, useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'

const { Option } = Select

const data = [
  { title: 'username', content: 'ceshi' },
  { title: 'username', content: 'ceshi' },
  { title: 'username', content: 'ceshi' }
]

export default () => {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const onSubmit = () => {
    setOpen(false)
  }

  useEffect(() => {
    const temp = []
    let key = 0
    data.forEach(item => {
      temp.push({
        key: key++,
        title: item.title,
        content: item.content
      })
    })
    setItems(temp)
  }, [])
  return (
    <div className={styles.MyRepo}>
      <div>
        <h2>My Information</h2>
        <div></div>
      </div>
      <div className={styles.Info}>
        <img src="https://img2.baidu.com/it/u=1003272215,1878948666&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1670346000&t=600e74135b45cc8cd24140df44d4fc50"></img>
        <ul>
          {items.map(item => {
            return <ListItem key={item.key} item={item} />
          })}
        </ul>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={showDrawer}>Update Info</Button>
          <Button>Retrieve Password</Button>
        </div>
      </div>
      <Drawer
        title="Update Information"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user name'
                  }
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url"
                label="Url"
                rules={[
                  {
                    required: true,
                    message: 'Please enter url'
                  }
                ]}
              >
                <Input
                  style={{
                    width: '100%'
                  }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="owner"
                label="Owner"
                rules={[
                  {
                    required: true,
                    message: 'Please select an owner'
                  }
                ]}
              >
                <Select placeholder="Please select an owner">
                  <Option value="xiao">Xiaoxiao Fu</Option>
                  <Option value="mao">Maomao Zhou</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the type'
                  }
                ]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="approver"
                label="Approver"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the approver'
                  }
                ]}
              >
                <Select placeholder="Please choose the approver">
                  <Option value="jack">Jack Ma</Option>
                  <Option value="tom">Tom Liu</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the dateTime'
                  }
                ]}
              >
                <DatePicker.RangePicker
                  style={{
                    width: '100%'
                  }}
                  getPopupContainer={trigger => trigger.parentElement}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description'
                  }
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  )
}
