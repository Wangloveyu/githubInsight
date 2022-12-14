import React from 'react'
import { Layout } from 'antd'
import MySider from '../../components/MySider'
import MyHeader from '../../components/MyHeader'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAppContext } from '../../context/appContext'
const { Header, Content, Sider } = Layout

const App = () => {
  const navigator = useNavigate()
  const { user } = useAppContext()
  useEffect(() => {
    if (!user) {
      message.error({
        content: 'The user is not logged in',
        duration: 1,
        onClose: () => {
          navigator('/login')
        }
      })
    }
  }, [])
  return (
    <Layout style={{ height: '100%' }}>
      <Header className="header">
        <MyHeader />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: '#fafafa'
          }}
        >
          <MySider />
        </Sider>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: '#f0f4f8'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export default App
