import React from 'react'
import Layout from '../components/MyLayout.js'
import {
  Form, Icon, Input, Button, message,
} from 'antd';
import fetch from 'isomorphic-unfetch'
import api from '../utils/api'

const { TextArea } = Input;

class addNew extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      const user = localStorage.getItem('userinfo')
      const userInfo = user && JSON.parse(user)
      if(!user) return message.error('请先登录')
      const formData = {
        "title": values.title,
        "summary": values.summary,
        "content": values.content,
        "tags": values.tags,
        "user_id": userInfo.id
      }
      console.log(formData)
      fetch(api.addBlog, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) 
      }).then(r => r.json()).then((res=>{
        if(res.code === 0){
          message.success('增加成功')
          setTimeout(()=>{
            location.href = '/news'
          },1000)
        }
      }))
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return <Layout title='增加新闻'>
      <div className="addnews_page">
        <Form onSubmit={this.handleSubmit} className="news-form">
          <Form.Item label="标题">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入标题!' }],
            })(
              <Input placeholder="标题" />
            )}
          </Form.Item>
          <Form.Item label="简介">
            {getFieldDecorator('summary')(
              <Input type="text" placeholder="简介" />
            )}
          </Form.Item>
          <Form.Item label="内容">
            {getFieldDecorator('content', {
              rules: [{ required: true, message: '请输入内容!' }],
            })(
              <TextArea placeholder="内容" />
            )}
          </Form.Item>
          <Form.Item label="标签">
            {getFieldDecorator('tags')(
              <Input type="text" placeholder="标签" />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  }
}

// addNew.getInitialProps = async function(context) {
//   return {}
// }

const addNewForm = Form.create({ name: 'add_new' })(addNew)

export default addNewForm