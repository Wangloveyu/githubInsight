import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import styles from './index.module.css'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { Card } from 'antd'
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'
import { Alert } from 'antd'

const Login = () => {
  const navigate = useNavigate()
  const [myForm] = Form.useForm()
  const { user, isLoading, showAlert, alertType, alertText, displayAlert, registerUser, loginUser } = useAppContext()

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/home')
      }, 500)
    }
  }, [user, navigate])

  useEffect(() => {
    if (showAlert) {
      if (alertType === 'error') {
        message.error({
          content: alertText,
          duration: 1
        })
      } else {
        message.success({
          content: alertText,
          duration: 1
        })
      }
    }
  }, [showAlert])
  const onSubmit = () => {
    myForm
      .validateFields()
      .then(res => {
        loginUser(res)
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              },
              {
                type: 'email',
                message: 'please input correct email'
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="primary" onClick={onSubmit}>
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate('/register')
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
