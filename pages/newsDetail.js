import React from 'react'
import {
  List, Input, Button, message,
} from 'antd';
import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'
import api from '../utils/api'

const { TextArea } = Input;

class newsDetail extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        msg: ''
      }
    }
    handleSubmit = () => {
      if(!this.state.msg.trim()) return message.info('请输入留言内容')
      const user = localStorage.getItem('userinfo')
      if(!user) return message.error('请先登录')
      const userInfo = user && JSON.parse(user)
      const formData = {
        "blog_id": this.props.info.id,
        "content": this.state.msg,
        "user_id": userInfo.id
      }
      console.log(formData)
      fetch(api.createComment, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) 
      }).then(r => r.json()).then((res=>{
        if(res.code === 0){
          message.success('评论成功')
          setTimeout(()=>{
            window.location.reload()
          },1000)
        }
      }))
    }
    changeMsg = (e) => {
      const msg = e.target.value
      this.setState({
        msg
      })
    }
    render() {
      const props = this.props
      const { msg } = this.state
      return <Layout title='新闻详情' className="newsDetail_page">
        <h2>{props.info.title}</h2>
        <p>{props.info.content}</p>
        <div className="comment_list">
        <h3 className="h_title">评论：</h3>
        <List
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10, 
          }}
          locale = {{
            emptyText: '暂无数据'
          }}
          dataSource={props.info.comment}
          renderItem={info => (<List.Item>
            <span className="comment_name">{info.user.username}</span>
            <div className="comment_content">
              {info.content}
            </div>
        </List.Item>)}
        />
        </div>
        <h3 className="h_title">留言：</h3>
        <TextArea rows={4} value={msg} onChange={this.changeMsg} />
        <Button className="submit" onClick={this.handleSubmit}>提交</Button>
      </Layout>
    }
}

newsDetail.getInitialProps = async function(context) {
  const { id } = context.query
  const res = await fetch(`${api.getBlogInfo}/${id}`)
  const data = await res.json()
  // console.log('--====---', data)
  // console.log(`Show data fetched. Count: ${data.data.count}`)
  return {
    info: data.data
  }
}

export default newsDetail