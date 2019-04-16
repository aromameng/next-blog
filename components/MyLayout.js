import Header from './Header'
import 'antd/dist/antd.less'
import '../assets/styles/reset.less'

const Layout = (props) => (
  <div className="container">
    <Header title={props.title} />
    <div className={`page_main ${props.className || ''}`}>
      <h1>{props.title || ''}</h1>
      {props.children}
    </div>
  </div>
)

export default Layout