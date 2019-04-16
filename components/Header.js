import Link from './Link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
    <div className="c_header">
      <nav className="c_nav">
        <Link activeClassName='active' href="/">
          <a style={linkStyle}>首页</a>
        </Link>
        <Link activeClassName='active' href="/news">
          <a style={linkStyle}>新闻</a>
        </Link>
      </nav>
    </div>
)

export default Header