const verifyToken = require('../config/token').verifyToken;

module.exports = options => {
  return (ctx, next) => {
    // 白名单
    const allowPaths = ['/login', '/register', '/websocket', '/captcha'];
    if(allowPaths.some(path => ctx.path.includes(path))) {
      return next();
    }

    // 请求上报的token
    const token = ctx.header.token;
    // 无token ，无token时解密会报错
    if(!token) {
      ctx.status = 401;
      return false;
    }
    const isValid = verifyToken(token);
    // token失效了
    if(!isValid) {
      ctx.status = 403;
      return false;
    }
    return next();
  }
}