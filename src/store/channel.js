//参数说明：
//key : 用来判断是哪个渠道？走哪种联合登录方式？需不需要对页面逻辑做特殊处理？
//channel : 上报BI日志时，传值到vProject
//branch : 报BI日志时，传值到vChannel
//storeId : 用来查询商品、订单等，对应后台"门店管理"栏目下的字段"ID"
//channelId : getJTPToken接口联合登录用到，对应后台"商户管理"栏目下的字段"编号"

import Method from '@/utils/Method'

let list = {
  1: {
    key: 'fujian',
    channel: '福建移动',
    branch: '福建移动1',
    storeId: 91812
  },
  '1a': {
    key: 'fujian',
    channel: '福建移动',
    branch: '福建移动2',
    storeId: 91812
  },
  '1b': {
    key: 'fujian',
    channel: '福建移动',
    branch: '福建移动3',
    storeId: 91812
  },
  '1c': {
    key: 'fujian',
    channel: '福建移动',
    branch: '福建移动4',
    storeId: 91812
  },
  '1d': {
    key: 'fujian',
    channel: '福建移动',
    branch: '福建移动5',
    storeId: 91812
  },

  2: {
    key: 'zhejiang',
    channel: '浙江移动',
    storeId: 91944
  },

  3: {
    key: 'guangdong',
    channel: '广东移动',
    branch: '广东移动1',
    storeId: 91813
  },
  '3a': {
    key: 'guangdong',
    channel: '广东移动',
    branch: '广东移动2',
    storeId: 91813
  },
  '3b': {
    key: 'guangdong',
    channel: '广东移动',
    branch: '广东移动3',
    storeId: 91813
  },
  '3c': {
    key: 'guangdong',
    channel: '广东移动',
    branch: '广东移动4',
    storeId: 91813
  },
  '3d': {
    key: 'guangdong',
    channel: '广东移动',
    branch: '广东移动5',
    storeId: 91813
  },
  '3e': {
    key: 'guangdong',
    channel: '广东移动',
    branch: '广东移动6',
    storeId: 91813
  },
  '3f': {
    key: 'guangdong',
    channel: '广东移动',
    branch: '广东移动7',
    storeId: 91813
  },

  4: {
    key: 'shanghai',
    channel: '上海移动',
    branch: '上海移动1',
    storeId: 91884
  },
  '4a': {
    key: 'shanghai',
    channel: '上海移动',
    branch: '上海移动2',
    storeId: 91884
  },
  '4b': {
    key: 'shanghai',
    channel: '上海移动',
    branch: '上海移动3',
    storeId: 91884
  },
  '4c': {
    key: 'shanghai',
    channel: '上海移动',
    branch: '上海移动4',
    storeId: 91884
  },
  '4d': {
    key: 'shanghai',
    channel: '上海移动',
    branch: '上海移动5',
    storeId: 91884
  },
  '4e': {
    key: 'shanghai',
    channel: '上海移动',
    branch: '上海移动6',
    storeId: 91884
  },
  '4f': {
    key: 'shanghai',
    channel: '上海移动',
    branch: '上海移动7',
    storeId: 91884
  },

  5: {
    key: 'group',
    channel: '中国移动集团掌厅',
    storeId: 91816
  },

  6: {
    key: 'guangxi',
    channel: 'guangxi',
    branch: '广西移动',
    storeId: 91885
  },
  7: {
    key: 'chongqing',
    channel: 'chongqing',
    branch: '重庆移动',
    storeId: 91887
  },
  8: {
    key: 'henan',
    channel: 'henan2',
    branch: '河南移动',
    storeId: 91888
  },
  9: {
    key: 'liaoning',
    channel: 'liaoning',
    branch: '辽宁移动',
    storeId: 91889
  },
  10: {
    key: 'anhui',
    channel: 'anhui',
    branch: '安徽移动',
    storeId: 91895
  },
  11: {
    key: 'guangdongln',
    channel: 'guangdongln',
    branch: '广东移动8',
    storeId: 91813
  },
  12: {
    key: 'sichuan',
    channel: 'sichuan',
    branch: '四川移动',
    storeId: 91897
  },
  14: {
    key: 'guangdongup',
    channel: 'guangdongup',
    branch: '广东移动非UP会员',
    storeId: 91905
  },
  15: {
    key: 'guangdongatv',
    channel: 'guangdong',
    branch: '广东移动3',
    storeId: 91909
  },
  16: {
    key: 'beijing',
    channel: 'beijing',
    branch: '北京移动',
    storeId: 91924,
    channelId: '9120210001'
  },
  18: {
    key: 'jiangsu',
    channel: 'jiangsu',
    branch: '江苏移动',
    storeId: 91923,
    channelId: '9120110001'
  },
  19: {
    key: 'shandong',
    channel: 'shandong',
    branch: '山东移动',
    storeId: 91932,
    channelId: '9120820001'
  },
  35: {
    key: 'yunnan35',
    channel: 'yunnan',
    branch: '云南移动',
    storeId: 92054
  },
  46: {
    key: 'hxq',
    channel: 'hxq',
    branch: '移动和小区',
    storeId: 92023
  },
  47: {
    key: 'chongqing',
    channel: 'chongqing',
    branch: '重庆移动',
    storeId: 92039
  },
  49: {
    key: 'zhejiang49',
    channel: 'zhejiangh5',
    branch: '浙江移动H5',
    storeId: 92055
  },
  51: {
    key: 'beijing51',
    channel: 'beijing',
    branch: '北京移动app',
    storeId: 92059,
    channelId: '9129320001'
  },
  53: {
    key: 'beijing53',
    channel: 'beijing',
    branch: '北京移动微厅',
    storeId: 92064,
    channelId: '9129820001'
  },
  54: {
    key: 'jiangsu54',
    // branch : '江苏移动渠道后台',
    storeId: 92051,
    channelId: '9120140001'
  },
  55: {
    key: 'cm55',
    // branch : '中移销售分公司',
    storeId: 92067,
    channelId: '9130120001'
  },
  56: {
    key: 'cm56',
    // branch : '中移在线公司',
    storeId: 92068,
    channelId: '9130220001'
  },
  57: {
    key: 'shandong57',
    // branch : '山东移动活动',
    storeId: 92076,
    channelId: '9131020001'
  },
  58: {
    key: 'qiyebu58',
    // branch : '企业部合作',
    storeId: 92078,
    channelId: '9131220001'
  },
  59: {
    key: 'shandong59',
    // branch : '山东移动内购',
    storeId: 92079,
    channelId: '9131420001'
  },
  60: {
    key: 'jiangsu60',
    // branch : '江苏移动内购',
    storeId: 92080,
    channelId: '9131520001'
  },
  61: {
    key: 'guangdong61',
    // branch : '广东移动内购',
    storeId: 92081,
    channelId: '9131620001'
  },
  62: {
    key: 'beijing62',
    // branch : '北京移动内购',
    storeId: 92082,
    channelId: '9131720001'
  },
  63: {
    key: 'zhejiang63',
    // branch : '浙江移动内购',
    storeId: 92083,
    channelId: '9131820001'
  },
  64: {
    key: 'yunnan64',
    // branch : '云南移动内购',
    storeId: 92084,
    channelId: '9131920001'
  },
  65: {
    key: 'chongqing65',
    // branch : '重庆移动内购',
    storeId: 92085,
    channelId: '9132020001'
  },
  66: {
    key: 'fujian66',
    // branch : '福建移动内购',
    storeId: 92086,
    channelId: '9132120001'
  },
  67: {
    key: 'ol67',
    // branch : '在线公司内购',
    storeId: 92087,
    channelId: '9132220001'
  },
  68: {
    key: 'cm68',
    // branch : '中移销售内购',
    storeId: 92088,
    channelId: '9132320001'
  },
  69: {
    key: 'shanxi69',
    // branch : '陝西内购',
    storeId: 92089,
    channelId: '9132520001'
  },
  70: {
    key: 'hebei70',
    // branch : '河北内购',
    storeId: 92090,
    channelId: '9132620001'
  },
  71: {
    key: 'anhui71',
    // branch : '安徽内购',
    storeId: 92091,
    channelId: '9132720001'
  },
  72: {
    key: 'hunan72',
    // branch : '湖南移动内购',
    storeId: 92098,
    channelId: '9133620001'
  },
  74: {
    key: 'jiangxi74',
    // branch : '江西移动商城',
    storeId: 92103,
    channelId: '9134120001'
  },
  75: {
    key: 'yunchaojie75',
    // branch : '云潮街',
    storeId: 92105,
    channelId: '9134320001'
  }
}

let base = {
  key: 'base',
  channel: '标准版',
  storeId: 91815
}
let channel = base

let storeId = Number(Method.getUrlValue('storeid'))

if (storeId) {
  channel = {
    key: 'newStoreidChannel',
    storeId: storeId
  }
} else {
  let source = Method.getUrlValue('source')
  if (list[source]) {
    channel = {
      ...list[source],
      source: source
    }
  }
}

export default channel
