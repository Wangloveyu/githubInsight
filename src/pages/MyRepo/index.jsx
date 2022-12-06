import { Modal } from 'antd'
import { Input } from 'antd'
import { Space } from 'antd'
import { Button } from 'antd'
import { useCallback } from 'react'
import { useState } from 'react'
import MySlider from '../../components/MySlider'
import RepoCard from '../../components/RepoCard'
import styles from './index.module.css'

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

export default () => {
  const [repos, setRepos] = useState([])
  useState(() => {
    const temp = []
    let key = 0
    data.forEach(item => [
      temp.push({
        key: key++,
        repoName: item.repoName,
        star: item.star,
        owner: item.owner,
        importTime: item.importTime
      })
    ])
    setRepos(temp)
  }, [])

  const onClick = useCallback(() => {
    Modal.confirm({
      title: 'import repository',
      content: (
        <>
          <Input />
        </>
      ),
      onOk: () => {}
    })
  }, [])
  return (
    <div className={styles.MyRepo}>
      <div>
        <h2>My Repository</h2>
        <div></div>
        <Button style={{ marginRight: '10px' }}>Search</Button>

        <Button onClick={onClick}>Import</Button>
      </div>
      <MySlider>
        {repos.map(item => {
          return <RepoCard key={item.key} item={item} />
        })}
      </MySlider>
    </div>
  )
}
