import axios from 'axios'
// import { load } from './mocks/helper'

const UseMock = true
if (process.env.NODE_ENV === 'development' && UseMock) {
  // load('./sample')
}

const ax = () => {
  return axios.create({
    headers: {
      Authorization: localStorage.getItem('hc-apm-token')
    }
  })
}

const largeScreen = '/gateway/api/apm/asset/largeScreens/'
const url = {
  assetIndex: 'lsAssetIndex',                   // 返回重要设备运营指标和质量指标
  assetInfo: 'lsAssetInfo',                     // 返回设备、类型和科室总数
  assetNum: 'lsAssetNum',                       // 返回设备维修状态，正常数量/在修数量
  assetRepairStatus: 'lsRepairStatus',          // 返回设备维修状态列表
  insPm: 'lsInsPm',                             // 返回养计检计划
  insPmList: 'lsInsPmList',                     // 返回养计检计划列表
  lifeSupportAsset: 'lsLifeSupportAsset',       // 返回生命支持类设备完好率
  userPerformance: 'lsUserPerformance'          // 返回人员绩效, fromTime：开始日期，toTime: 结束日期, 格式如：2017-04-12
}
Object.keys(url).forEach(key => url[key] = largeScreen + url[key])

export interface Data {
  assetIndex(page: Number, pageSize: Number): Promise<any>
  assetInfo(): Promise<any>
  assetNum(): Promise<any>
  assetRepairStatus(page: Number, pageSize: Number): Promise<any>
  insPm(fromTime: String, toTime: Number): Promise<any>
  insPmList(page: Number, pageSize: Number, fromTime: String, toTime: Number): Promise<any>
  lifeSupportAsset(): Promise<any>
  userPerformance(fromTime: String, toTime: Number): Promise<any>
}

const data: Data = {
  assetIndex(page = 0, pageSize = 10) {
    return ax().get(url.assetIndex, { params: { page, pageSize } })
  },
  assetInfo() {
    return ax().get(url.assetInfo)
  },
  assetNum() {
    return ax().get(url.assetNum)
  },
  assetRepairStatus(page = 0, pageSize = 10) {
    return ax().get(url.assetRepairStatus, { params: { page, pageSize } })
  },
  insPm(fromTime, toTime) {
    return ax().get(url.insPm, { params: { fromTime, toTime } })
  },
  insPmList(page = 0, pageSize = 10, fromTime, toTime) {
    return ax().get(url.insPmList, { params: { page, pageSize, fromTime, toTime } })
  },
  lifeSupportAsset() {
    return ax().get(url.lifeSupportAsset)
  },
  userPerformance(fromTime, toTime) {
    return ax().get(url.userPerformance, { params: { fromTime, toTime } })
  }
}

export default data
