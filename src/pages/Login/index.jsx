import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import styles from './index.module.css'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { Card } from 'antd'

const Login = () => {
  const navigator = useNavigate()
  const [myForm] = Form.useForm()
  const onSubmit = () => {
    myForm
      .validateFields()
      .then(res => {
        const data = JSON.parse(localStorage.getItem('userInfo'))
        console.log(res, data)
        if (res.username === data.username && res.password === data.password) {
          console.log(res)
          localStorage.setItem('login', true)
          message.success({
            content: 'login in successfully',
            duration: 1,
            onClose: () => {
              navigator('/home')
            }
          })
        } else {
          message.error({ content: 'username or password is wrong', duration: 1 })
        }
      })
      .catch(err => [message.error({ content: 'username or password is wrong', duration: 1 })])
  }
  return (
    <div className={styles.Register}>
      <Card
        title="Login"
        bordered={false}
        style={{
          width: 'auto'
        }}
      >
        <Form
          form={myForm}
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
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="primary" onClick={onSubmit}>
                Submit
              </Button>
              <Button
                onClick={() => {
                  navigator('/register')
                }}
              >
                Register
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Login
