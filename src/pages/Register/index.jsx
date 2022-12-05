import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import styles from './index.module.css'
import { useCallback } from 'react'

const Register = () => {
  const [myForm] = Form.useForm()

  const handleSumbit = useCallback(() => {
    myForm
      .validateFields()
      .then(res => {
        console.log('在这里登录')
      })
      .catch(err => {
        console.log('表单校验失败')
      })
  }, [])
  return (
    <div className={styles.Register}>
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
          <Button onClick={handleSumbit}>Register</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Register
