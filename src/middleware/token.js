const verifyToken = require('../config/token').verifyToken;

module.exports = options => {
  return (ctx, next) => {
    if(ctx.path === '/login' || ctx.path === '/register' || ctx.path.includes('/websocket')) {
      console.log(ctx.path, '跳过跳过跳过跳过跳过');
      return next();
    }
    console.log(ctx.path, '验证验证验证验证验证验证', ctx.method);
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