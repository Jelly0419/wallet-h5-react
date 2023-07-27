import channel from './channel.js'

//get login data
function getLoginData() {
  let data = {}
  let save = window.localStorage.getItem('jegotripUserLoginData')
  if (save) {
    try {
      data = JSON.parse(window.decodeURIComponent(window.escape(window.atob(save))))
    } catch (e) {}
  }
  return data
}

//存储全局数据
const store = {
  user: getLoginData(),
  app: channel
}

export default store
