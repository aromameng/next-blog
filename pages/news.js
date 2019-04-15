import Layout from '../components/MyLayout.js'
import {
  List
} from 'antd';
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import api from '../utils/api'

const News = (props) => (
  <Layout title='新闻列表'>
      {/* {props.list.map((info) => (
        <li key={info.id}>
          <Link as={`/p/${info.id}`} href={`/newsDetail?id=${info.id}`}>
            <a>{info.title}</a>
          </Link>
        </li>
      ))} */}
      <List
        header={null}
        footer={null}
        bordered
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10, 
        }}
        dataSource={props.list}
        renderItem={info => (<List.Item>
          <Link as={`/p/${info.id}`} href={`/newsDetail?id=${info.id}`}>
            <a>{info.title}</a>
          </Link>
      </List.Item>)}
      />
  </Layout>
)

News.getInitialProps = async function() {
  const res = await fetch(api.getBlogList + '?offset=0&limit=100')
  const data = await res.json()
  // console.log('-----',data)
  // console.log(`Show data fetched. Count: ${data.data.count}`)
  return {
    list: data.data.rows
  }
}

export default News