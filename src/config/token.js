const jwt = require('jsonwebtoken');

const cert = 'DW_TOKEN' // 私钥
export function generateToken(data) {
  const now = Math.round(Date.now() / 1000);
  const token = jwt.sign({
    data,
    exp: now + 3600 * 24 // 过期时间24小时
  }, cert)
  return token;
}

// token 后台存的，vtoken 需要验证的token
export function verifyToken(vtoken) {
  try {
    const decoded = jwt.verify(vtoken, cert);
    const exp = decoded.exp
    // 已过期
    if(exp < Math.round(Date.now() / 1000)) {
      return false;
    }
    return true;
  } catch (error) {
    think.logger.error(`token 解密错误：${error}`);
    return false;
  }
}