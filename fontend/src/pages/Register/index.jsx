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
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'

const Register = () => {
  const navigate = useNavigate()
  const [myForm] = Form.useForm()
  const { user, isLoading, showAlert, alertText, alertType, displayAlert, registerUser, loginUser } = useAppContext()

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/home')
      }, 500)
    }
  }, [user, navigate])

  const register = async res => {
    return new Promise((resolve, reject) => {
      localStorage.setItem('user', JSON.stringify(res))
      resolve(true)
    })
  }

  const handleSumbit = useCallback(async values => {
    myForm
      .validateFields()
      .then(res => {
        const { username, email, password } = res
        if (!email || !password || !username) {
          displayAlert()
          return
        }
        const currentUser = { username, email, password }
        registerUser(currentUser)
      })
      .catch(err => {
        console.log(err)
        message.error('Register Fail')
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (showAlert) {
      message.open({
        type: alertType,
        content: alertText
      })
    }
  }, [showAlert])

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
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!'
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
              <Button type="primary" onClick={handleSumbit}>
                Register
              </Button>
              <Button
                onClick={() => {
                  navigate('/login')
                }}
              >
                Login
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Register
