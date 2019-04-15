import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'
import api from '../utils/api'

const newsDetail = (props) => (
    <Layout title='新闻详情'>
      <h1>{props.info.title}</h1>
      <p>{props.info.content}</p>
    </Layout>
)

newsDetail.getInitialProps = async function(context) {
  const { id } = context.query
  const res = await fetch(`${api.getBlogInfo}/${id}`)
  const data = await res.json()
  console.log('--====---', data)
  // console.log(`Show data fetched. Count: ${data.data.count}`)
  return {
    info: data.data
  }
}

export default newsDetail