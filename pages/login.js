import React, { Component, Fragment } from 'react'
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import fetch from 'isomorphic-unfetch'
import api from '../utils/api'
import 'antd/dist/antd.less'
import '../assets/styles/login.less'

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      // console.log(values)
      const formData = {
        "username": values.username,
        "password": values.password
      }
      fetch(api.login, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) 
      }).then(r => r.json()).then((res=>{
        if(res.code === 0){
          location.href = '/'
          localStorage.setItem('userinfo', JSON.stringify(res.data))
        }
      }))
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login_page">
        <h1>登录</h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住密码</Checkbox>
            )}
            {/* <a className="login-form-forgot" href="">Forgot password</a> */}
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm