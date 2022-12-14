import { Modal } from 'antd'
import { Input } from 'antd'
import { Spin } from 'antd'
import { Space } from 'antd'
import { Button } from 'antd'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MySlider from '../../components/MySlider'
import RepoCard from '../../components/RepoCard'
import { useAppContext } from '../../context/appContext'
import styles from './index.module.css'
import RepoSearch from '../../components/RepoSearch'
import { message } from 'antd'

const data = [
  { repoName: 'repoName', owner: 'fjlsdfjlksd', star: 100, importTime: '1999/12/10' },
  { repoName: 'repoName', owner: 'fjlsdfjlksd', star: 100, importTime: '1999/12/10' },
  { repoName: 'repoName', owner: 'fjlsdfjlksd', star: 100, importTime: '1999/12/10' },
  { repoName: 'repoName', owner: 'fjlsdfjlksd', star: 100, importTime: '1999/12/10' },
  { repoName: 'repoName', owner: 'fjlsdfjlksd', star: 100, importTime: '1999/12/10' },
  { repoName: 'repoName', owner: 'fjlsdfjlksd', star: 100, importTime: '1999/12/10' },
  { repoName: 'repoName', owner: 'fjlsdfjlksd', star: 100, importTime: '1999/12/10' },
  { repoName: 'repoName', owner: 'fjlsdfjlksd', star: 100, importTime: '1999/12/10' },
  { repoName: 'repoName', owner: 'fjlsdfjlksd', star: 100, importTime: '1999/12/10' },
  { repoName: 'repoName', owner: 'fjlsdfjlksd', star: 100, importTime: '1999/12/10' },
  { repoName: 'repoName', owner: 'fjlsdfjlksd', star: 100, importTime: '1999/12/10' },
  { repoName: 'repoName', owner: 'fjlsdfjlksd', star: 100, importTime: '1999/12/10' },
  { repoName: 'repoName', owner: 'fjlsdfjlksd', star: 100, importTime: '1999/12/10' },
  { repoName: 'repoName', owner: 'fjlsdfjlksd', star: 100, importTime: '1999/12/10' },
  { repoName: 'repoName', owner: 'fjlsdfjlksd', star: 100, importTime: '1999/12/10' },
  { repoName: 'repoName', owner: 'fjlsdfjlksd', star: 100, importTime: '1999/12/10' },
  { repoName: 'repoName', owner: 'fjlsdfjlksd', star: 100, importTime: '1999/12/10' },
  { repoName: 'repoName', owner: 'fjlsdfjlksd', star: 100, importTime: '1999/12/10' }
]

const selectList = new Set()
export default () => {
  const [modal, contextHolder] = Modal.useModal()
  const navigate = useNavigate()
  // const [repos, setRepos] = useState([])
  const [mult, setMult] = useState(false)
  const { deleteRepo, setSelectedRepos, importRepo, user, getRepos, repos, viewMyRepos, isLoading, search, page, numOfPages, showAlert, alertType, alertText } = useAppContext()

  useEffect(() => {
    getRepos()
  }, [page, viewMyRepos])

  const onClick = useCallback(() => {
    let owner = ''
    let repoName
    Modal.confirm({
      title: 'import repository',
      content: (
        <>
          <label>Owner</label>
          <Input
            onBlur={e => {
              owner = e.target.value
            }}
          />
          <br />
          <br />
          <label>RepoName</label>
          <Input
            onBlur={e => {
              repoName = e.target.value
            }}
          />
        </>
      ),
      onOk: () => {
        importRepo({
          owner,
          repoName
        })
      }
    })
  }, [])

  useEffect(() => {
    if (showAlert) {
      message.open({
        content: alertText,
        type: alertType
      })
    }
  }, [showAlert])

  return (
    <div className={styles.MyRepo}>
      {contextHolder}
      <div>
        <h2>My Repository</h2>
        <div></div>
        {mult ? (
          <>
            <Button
              onClick={() => {
                setSelectedRepos(selectList)
                navigate('/home/detail/basic')
              }}
            >
              {'Go in->'}
            </Button>
            <Button
              onClick={() => {
                modal.warning({
                  content: 'Are you sure to delete the selected warehouse?',
                  okText: 'yes',
                  onOk: f => {
                    f()
                    selectList.forEach(item => {
                      deleteRepo(item.key)
                    })
                  }
                })
              }}
            >
              Delete
            </Button>
          </>
        ) : (
          ''
        )}
        <Button
          style={{
            backgroundColor: mult ? '#efefef' : ''
          }}
          onClick={() => {
            if (mult) {
              setMult(false)
            } else {
              selectList.clear()
              setMult(true)
            }
          }}
        >
          MultiSelect
        </Button>

        <Button onClick={onClick}>Import</Button>
      </div>
      <MySlider>
        {isLoading ? (
          <Spin tip="This operation may take a long time, please be patient" className="Loading" size="large"></Spin>
        ) : (
          repos.map(item => {
            return (
              <RepoCard
                onChange={(key, name) => {
                  if (selectList.has({ key: key, label: name })) {
                    selectList.delete({ key: key, label: name })
                  } else {
                    selectList.add({ key: key, label: name })
                  }
                }}
                mult={mult}
                key={item._id}
                item={item}
                onDelete={() => deleteRepo(item._id)}
              />
            )
          })
        )}
      </MySlider>
    </div>
  )
}
