//获取地址栏参数-从search读取
function getSearchValue(text) {
  let search = window.location.search.slice(1).split('&')
  let value = ''
  let len = search.length
  for (let i = 0; i < len; i++) {
    let left = text + '='
    if (search[i].indexOf(left) === 0) {
      let right = search[i].slice(left.length)
      if (right) {
        value = right
      }
    }
  }
  return value
}

//获取地址栏参数-从hash读取
function getHashValue(text) {
  let value = ''
  let hash = window.location.hash
  let index = hash.indexOf('?')
  if (index <= 0) {
    return value
  }
  let search = hash.slice(index + 1).split('&')
  let len = search.length
  for (let i = 0; i < len; i++) {
    let left = text + '='
    if (search[i].indexOf(left) === 0) {
      let right = search[i].slice(left.length)
      if (right) {
        value = right
      }
    }
  }
  return value
}

//获取地址栏参数
function getUrlValue(text) {
  let value = getSearchValue(text) || getHashValue(text)
  return value
}

function getEnv() {
  //默认为现网环境
  const online = {
    key: 'app',
    domain: 'https://app.jegotrip.com.cn',
    secretKey: 'online_jego_h5',
    secretVal: '93EFE107DDE6DE51',
    encryptType: '01'
  }
  let data = online

  //旧版环境参数为domain，新版为env，此处是为了兼容新旧版本
  let search = getUrlValue('env') || getUrlValue('domain')

  switch (search) {
    case 'dev': //开发环境
      data = {
        key: search,
        domain: 'http://172.20.62.75:7000',
        secretKey: 'test1',
        secretVal: '12345678',
        encryptType: '01'
      }
      break

    case 'bx': //并行环境
      data = {
        key: search,
        domain: 'http://47.56.213.140',
        secretKey: 'test1',
        secretVal: '12345678',
        encryptType: '01'
      }
      break

    case 'test': //集成环境
      data = {
        key: search,
        domain: 'https://test01.jegotrip.com.cn',
        secretKey: 'test1',
        secretVal: '12345678',
        encryptType: '01'
      }
      break

    case 'sztest': //深圳集成环境
      data = {
        key: search,
        domain: 'https://sztopenapi.jegotrip.com.cn',
        secretKey: 'test1',
        secretVal: '12345678',
        encryptType: '01'
      }
      break

    case 'stage': //stage环境
      data = {
        key: search,
        domain: 'https://svapp.jegotrip.com.cn',
        secretKey: 'stage_jego_h5',
        secretVal: '02D609E09BCA06BE',
        encryptType: '01'
      }
      break

    case 'szstage': //stage环境
      data = {
        key: search,
        domain: 'https://szsvapp.jegotrip.com.cn',
        secretKey: 'stage_jego_h5',
        secretVal: '02D609E09BCA06BE',
        encryptType: '01'
      }
      break
  }
  return data
}

export default getEnv()
