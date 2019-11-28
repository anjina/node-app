// 生成验证码
const svgCaptcha = require('svg-captcha');
const Base = require('./base.js');

module.exports = class extends Base {
  async getAction() {
    const captcha = svgCaptcha.create({
      inverse: true,
      fontSize: 50,
      color: true,
      noise: 2,
      height: 50,
      width: 120,
    })
    const cookie = captcha.text;
    const res = this.ctx.res;
    await this.cache('captcha', cookie, {
      timeout: 1000 * 60 * 5 // 5分钟有效期
    });
    // 这里使用this去设置没生效，不知道为什么，只能获取原生res对象
    // res.setHeader('Content-Type', 'image/svg+xml');
    res.writeHead(200, {
      // 'Set-Cookie': `captcha=${cookie}`, 不使用cookie存验证码，后端设置缓存进行验证
      'Content-Type': 'image/svg+xml'
    });
    res.write(String(captcha.data));
    res.end();
  }
}

