import App, { Container } from 'next/app'
import React from 'react'
import { initializeStore } from '../stores'
import { Provider } from 'mobx-react'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

class MyMobxApp extends App {
  static async getInitialProps(appContext) {
    // Get or Create the store with `undefined` as initialState
    // This allows you to set a custom default initialState
    const mobxStore = initializeStore()
    // Provide the store to getInitialProps of pages
    appContext.ctx.mobxStore = mobxStore

    let appProps = await App.getInitialProps(appContext)

    return {
      ...appProps,
      initialMobxState: mobxStore
    }
  }

  constructor(props) {
    super(props)
    const isServer = !process.browser
    this.mobxStore = isServer
      ? props.initialMobxState
      : initializeStore(props.initialMobxState)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Provider store={this.mobxStore}>
          <LocaleProvider locale={zhCN}>
            <Component {...pageProps} />
          </LocaleProvider>
        </Provider>
      </Container>
    )
  }
}
export default MyMobxApp