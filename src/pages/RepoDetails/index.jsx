import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { Input } from 'antd'
import { Dropdown } from 'antd'
import { Space } from 'antd'
import { Button } from 'antd'
import { useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import MySlider from '../../components/MySlider'
import styles from './index.module.css'
import '../../assets/iconfont/iconfont.css'
import { useMemo } from 'react'

const items = [
  {
    label: 'Code analysis',
    key: '1',
    path: 'analysis',
    icon: <i className="iconfont icon-code"></i>
  },
  {
    label: 'comparison',
    key: '2',
    path: 'comparison',
    icon: <i className="iconfont icon-compare"></i>
  }
]

export default () => {
  const location = useLocation()
  const currentPath = useMemo(() => {
    const path = location.pathname.replace(/\/$/, '').split('/')
    return path[path.length - 1]
  }, [location])
  const navigator = useNavigate()

  const handleMenuClick = useCallback(
    e => {
      items.forEach(item => {
        if (item.key === e.key && currentPath !== item.path) {
          navigator(`/home/detail/${item.path}`)
        }
      })
    },
    [currentPath]
  )

  const menuProps = {
    items,
    onClick: handleMenuClick
  }

  const sort = useCallback(() => {
    navigator('sort')
  }, [])
  return (
    <div className={styles.RepoDetails}>
      <div className={styles.header}>
        <i
          onClick={() => {
            navigator(-1)
          }}
          className="iconfont icon-return"
        ></i>
        <h2>Repository Details</h2>
        <div></div>
        {currentPath !== 'sort' ? (
          <Button style={{ marginRight: '10px' }} onClick={sort}>
            sort
          </Button>
        ) : (
          ''
        )}

        <Dropdown menu={menuProps}>
          <Button>
            <Space>
              More
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
      <MySlider>
        <Outlet />
      </MySlider>
    </div>
  )
}
