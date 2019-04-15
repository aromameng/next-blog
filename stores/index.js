import { action, observable } from 'mobx'
import { useStaticRendering } from 'mobx-react'

const isServer = !process.browser
useStaticRendering(isServer)

class Store {
  @observable lastUpdate = 0
  @observable light = false
  // @observable userInfo = {}

  constructor(isServer, initialData = {}) {
    this.lastUpdate =
      initialData.lastUpdate != null ? initialData.lastUpdate : Date.now()
    this.light = !!initialData.light
  }

  @action start = () => {
    this.timer = setInterval(() => {
      this.lastUpdate = Date.now()
      this.light = true
    }, 1000)
  }

  stop = () => clearInterval(this.timer)

  // @action setData = (key, data) => {
  //   let keys = key.split('.')
  //   if (keys.length > 1) {
  //       for (let i in this) {
  //           if (i === keys[0]) {
  //               this[i][keys[1]] = data
  //           }
  //       }
  //   } else {
  //       this[keys[0]] = data
  //   }
  // }
}

let store = null

export function initializeStore(initialData) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return new Store(isServer, initialData)
  }
  if (store === null) {
    store = new Store(isServer, initialData)
  }
  return store
}