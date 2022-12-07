import React from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import MySider from '../../components/MySider'
import MyHeader from '../../components/MyHeader'
import { Outlet } from 'react-router-dom'
const { Header, Content, Sider, Footer } = Layout

const App = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
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
