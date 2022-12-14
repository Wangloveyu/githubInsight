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
import { useState } from 'react'
import { useEffect } from 'react'
import RepoSearch from '../../components/RepoSearch'
import { useAppContext } from '../../context/appContext'
import { notification } from 'antd'
import { Spin } from 'antd'
import { message } from 'antd'

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

const myFuncList = [
  {
    key: 1,
    label: 'Basic Info',
    path: 'basic'
  },
  {
    key: 2,
    label: 'Pull Request',
    path: 'request'
  },
  {
    key: 3,
    label: 'Commit Frequency',
    path: 'commit'
  },
  {
    key: 4,
    label: 'Issue Frequency',
    path: 'issue'
  },
  {
    key: 5,
    label: 'Languages',
    path: 'languages'
  }
]

export default () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [curRepoId, setCurRepoId] = useState('')
  const [repoList, setRepoList] = useState({ items })
  const [funcList, setFuncList] = useState({ items })
  const [modal, contexthandler] = Modal.useModal()

  const { showAlert, isLoading, detail, getDashBoard, selectedList, getAllSelectedReposInfo, updateRepo } = useAppContext()

  useEffect(() => {
    console.log('detail', detail, selectedList)
    if (selectedList.size > 0) {
      setCurRepoId([...selectedList][0].key)
      // 在这里设置仓库列表
      setRepoList({
        items: [...selectedList],
        onClick: e => {
          setCurRepoId(e.key)
          getDashBoard(e.key)
        }
      })
      getAllSelectedReposInfo()
    } else {
      setCurRepoId('')
    }
  }, [selectedList])

  useEffect(() => {
    if (curRepoId !== '') {
      const temp = [...selectedList]
      getAllSelectedReposInfo()
      getDashBoard(temp[0].key)
    }
  }, [curRepoId])

  // 计算当前路径
  const currentPath = useMemo(() => {
    const path = location.pathname.replace(/\/$/, '').split('/')
    return path[path.length - 1]
  }, [location])

  // 将当前仓库的id转化为仓库名
  const curRepoName = useMemo(() => {
    let flag = true
    let curRepoName = 'Current Repo'
    if (curRepoId !== '') {
      repoList.items.forEach(item => {
        if (item.key === curRepoId) {
          curRepoName = item.label
          flag = false
        }
      })
    }
    return curRepoName
  }, [repoList, curRepoId])

  // 设置当前的功能
  const curFunc = useMemo(() => {
    let curFunc = 'MyFunction'
    myFuncList.forEach(item => {
      if (item.path === currentPath) {
        curFunc = item.label
      }
    })
    return curFunc
  }, [funcList, currentPath])

  // 根据路径切换下拉菜单选项
  useEffect(() => {
    if (currentPath === 'detail') {
      navigate('/home/detail/basic')
      return
    }
    // 设置功能列表
    setFuncList({
      items: myFuncList.filter(item => {
        return item.path !== currentPath
      }),
      onClick: e => {
        // 跳转到对应的界面
        myFuncList.forEach(item => {
          if ('' + item.key === e.key) {
            navigate('/home/detail/' + item.path)
          }
        })
      }
    })
  }, [currentPath])

  const reSelect = () => {
    modal.confirm({
      title: 'ReSelect Repo',
      content: <RepoSearch />,
      cancelButtonProps: {
        style: {
          display: 'none'
        }
      }
    })
  }

  return (
    <div className={styles.RepoDetails}>
      <div className={styles.header}>
        <i
          onClick={() => {
            navigate('/home/repo')
          }}
          className="iconfont icon-return"
        ></i>
        {/* <h2>Repository Details</h2> */}
        {currentPath === 'basic' ? (
          <Dropdown disabled={isLoading || curRepoId === ''} menu={repoList}>
            <Button>
              <Space>
                {curRepoName}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        ) : (
          ''
        )}

        <div></div>
        {currentPath !== 'sort' ? (
          <Button style={{ marginRight: '10px' }} onClick={reSelect}>
            Re-Select Repo
          </Button>
        ) : (
          ''
        )}
        <Button
          disabled={!detail._id}
          style={{ marginRight: '10px' }}
          onClick={() => {
            updateRepo(detail._id)
            message.info({
              content: 'Updating in the background, please refresh the interface later'
            })
          }}
        >
          Update
        </Button>

        <Dropdown disabled={isLoading} menu={funcList}>
          <Button>
            <Space>
              {curFunc}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
      <MySlider>{isLoading ? <Spin tip="Loading" className="Loading" size="large"></Spin> : <Outlet />}</MySlider>
      {contexthandler}
    </div>
  )
}
