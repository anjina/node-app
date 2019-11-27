const jwt = require('jsonwebtoken')

const cert = 'DW_TOKEN' // 私钥
export function generateToken(data) {
  const now = Math.round(Date.now() / 1000);
  const token = jwt.sign({
    data,
    exp: now + 3600 * 24 // 过期时间24小时
  }, cert)
  return token;
}