import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import styles from './index.module.css'
import { useCallback } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { message } from 'antd'
import { Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Card } from 'antd'

const Register = () => {
  const navigator = useNavigate()
  const [myForm] = Form.useForm()

  const register = async res => {
    return new Promise((resolve, reject) => {
      localStorage.setItem('userInfo', JSON.stringify(res))
      resolve(true)
    })
  }

  const handleSumbit = useCallback(async values => {
    myForm
      .validateFields()
      .then(res => {
        register(res)
          .then(data => {
            console.log(data)
            message.success({
              content: 'Register successfully, jumping to login pages...',
              duration: 1,
              onClose: () => {
                navigator('/login')
              }
            })
          })
          .catch(err => {
            console.log(err)
            message.error('Register Fail')
          })
      })
      .catch(err => {
        console.log('表单校验失败', err)
      })
  }, [])
  return (
    <div className={styles.Register}>
      <Card
        title="Register"
        bordered={false}
        style={{
          width: 'auto'
        }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 16
          }}
          initialValues={{
            remember: true
          }}
          autoComplete="off"
          form={myForm}
          onFinish={handleSumbit}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Button onClick={handleSumbit}>Register</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Register
