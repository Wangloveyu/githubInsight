import { SearchOutlined } from '@ant-design/icons'
import { Checkbox } from 'antd'
import { Input } from 'antd'
import { List } from 'antd'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAppContext } from '../../context/appContext'

export default props => {
  const [data, setData] = useState([
    {
      label: 'repoName',
      key: 1
    },
    {
      label: 'repoName',
      key: 2
    }
  ])
  const { selectedList, repos, setSelectedRepos } = useAppContext()

  useEffect(() => {
    if (repos && repos.length !== 0) {
      const temp = []
      repos.forEach(item => {
        temp.push({
          label: item.name,
          key: item._id
        })
      })
      setData(temp)
    }
  }, [repos])

  const itemSelected = item => {
    let res = false
    selectedList.forEach(it => {
      if ('' + item.key === it.key + '') {
        res = true
      }
    })
    return res
  }

  let input = ''
  return (
    <List
      style={{
        width: '100%',
        height: '100%',
        maxHeight: '400px',
        overflow: 'auto'
      }}
      header={
        <Input
          onChange={e => {
            const temp = []
            if (e.target.value === '') {
              repos.forEach(item => {
                temp.push({
                  label: item.name,
                  key: item._id
                })
              })
            } else {
              repos.forEach(item => {
                if (item.name.indexOf(e.target.value) !== -1) {
                  temp.push({
                    label: item.name,
                    key: item._id
                  })
                }
              })
            }
            setData(temp)
          }}
          onBlur={e => {
            input = e.target.value
          }}
          suffix={
            <SearchOutlined
              style={{ cursor: 'pointer' }}
              onClick={() => {
                const temp = []
                if (input === '') {
                  repos.forEach(item => {
                    temp.push({
                      label: item.name,
                      key: item._id
                    })
                  })
                } else {
                  repos.forEach(item => {
                    if (item.name.indexOf(input) !== -1) {
                      temp.push({
                        label: item.name,
                        key: item._id
                      })
                    }
                  })
                }
                setData(temp)
              }}
            />
          }
        />
      }
      bordered
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <Checkbox
            defaultChecked={itemSelected(item)}
            onChange={e => {
              let temp = [...selectedList]
              if (itemSelected(item)) {
                temp = temp.filter(it => {
                  return it.key !== item.key
                })
              } else {
                temp.push(item)
              }
              setSelectedRepos(temp)
            }}
          />{' '}
          {item.label}
        </List.Item>
      )}
    />
  )
}
