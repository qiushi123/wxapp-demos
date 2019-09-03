// 云函数入口文件

const cloud = require('wx-server-sdk')

const requestpromise = require('request-promise');

var WXBizDataCrypt = require('./RdWXBizDataCrypt') // 用于手机号解密

cloud.init()

// 云函数入口函数

exports.main = async (event, context) => {

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  const wxContext = cloud.getWXContext()

  const AccessToken_options = {
    method: 'GET',
    url: 'https://api.weixin.qq.com/sns/jscode2session',

    qs: {
      appid: wxContext.APPID,
      secret: wxContext.UNIONID, // 微信开发后台可生成，唯有微信认证过的国内主体才可有
      grant_type: 'authorization_code',
      js_code: event.sessionCode // 小程序中获取过来的
    },
    json: true
  };
  const resultValue = await requestpromise(AccessToken_options);
  const pc = new WXBizDataCrypt(appid, resultValue.session_key) // -解密第一步
  const data = pc.decryptData(event.encryptedData, event.iv) // 解密第二步
  return {
    data
  }
}