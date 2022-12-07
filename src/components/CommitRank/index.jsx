import React, { useEffect, useState } from 'react'
import { Avatar, Divider, List, Skeleton } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from './index.module.css'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then(res => res.json())
      .then(body => {
        setData([...data, ...body.results])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
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
          hasMore={data.length < 50}
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
                <List.Item className={styles.listItemContainer} key={item.email}>
                  <div>{index + 1}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Avatar src={item.picture.large} />
                    <div style={{ marginLeft: '1em' }}>{item.name.last}</div>
                  </div>

                  <div>{parseInt(Math.random() * 1000)}</div>
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
