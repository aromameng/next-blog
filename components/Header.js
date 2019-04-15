import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
    <div className="c_header">
        <Link href="/">
          <a style={linkStyle}>首页</a>
        </Link>
        <Link href="/news">
          <a style={linkStyle}>新闻</a>
        </Link>
    </div>
)

export default Header