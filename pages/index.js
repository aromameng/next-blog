import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import api from '../utils/api'


const Index = (props) => (
  <Layout title='首页'>
      {props.list.map((info) => (
        <li key={info.id}>
          <Link as={`/p/${info.id}`} href={`/newsDetail?id=${info.id}`}>
            <a>{info.title}</a>
          </Link>
        </li>
      ))}
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch(api.getBlogList + '?offset=0&limit=10')
  const data = await res.json()
  // console.log('-----',data)
  // console.log(`Show data fetched. Count: ${data.data.count}`)
  return {
    list: data.data.rows
  }
}

export default Index