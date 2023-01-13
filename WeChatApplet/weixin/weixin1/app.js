// app.js
App({
  //启动时先做一些事情
  onLaunch() {
    console.log('onLaunch =-= 初始化')
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  //全局公共方法、属性
  globalData: {
    userInfo: null
  }
})
