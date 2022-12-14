import React, { useEffect, useState } from 'react'
import { Avatar, Divider, List, Skeleton } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from './index.module.css'
import { useAppContext } from '../../context/appContext'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const { isLoading, detail } = useAppContext()
  const loadMoreData = () => {
    if (isLoading || loading) {
      return
    }
    setLoading(true)
    if (detail?.contributors) setData([...data, ...detail.contributors.slice(data.length, data.length + 10)])
    setLoading(false)
  }
  useEffect(() => {
    loadMoreData()
  }, [])
  return (
    <div style={{ height: '450px', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ fontWeight: 'bolder', color: '#464646', fontSize: '18px' }}>Commit Rank</h1>
      <div className={styles.details} id="scrollableDiv">
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < (detail?.contributors?.length || 0)}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1
              }}
              active
            />
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            split={false}
            header={
              <List.Item className={styles.listItemContainer} style={{ borderBottom: '1px solid #efefef' }}>
                <div>No.</div>
                <div>Name</div>
                <div>Commit</div>
              </List.Item>
            }
            renderItem={(item, index) => {
              return (
                <List.Item className={styles.listItemContainer} key={item.created_at}>
                  <div>{index + 1}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Avatar src={item.avatar_url} />
                    <div style={{ marginLeft: '1em' }}>{item.name}</div>
                  </div>

                  <div>{item.contributions}</div>
                </List.Item>
              )
            }}
          />
        </InfiniteScroll>
      </div>
    </div>
  )
}
export default App
