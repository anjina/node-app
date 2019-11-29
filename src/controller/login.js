const Base = require('./base.js');
const generateToken = require('../config/token').generateToken
module.exports = class extends Base {
  async getAction() {
    try {
      const code = (Date.now() + '').slice(-6);
      return this.success({
        code
      });
    } catch (error) {
      return this.fail(error);
    }
  }

  async postAction() {
    const userModel = this.model('user');
    try {
      const { phoneNum, byCode } = this.post();
      // 验证码登录
      if(byCode) {
        const token = generateToken(phoneNum);
        const data = await userModel.where({ phoneNum }).find();
        // 无账号，顺便注册
        if(think.isEmpty(data)) {
          const newId = await userModel.add({ phoneNum });
          return this.success({ id: newId, token });
        }
        // think.config('token', token);
        return this.success(Object.assign(data, { token }));
      } else {
        // 手机密码登录
        const { phoneNum, password, imgCaptcha } = this.post();
        const data = await userModel.where({ phoneNum }).find();
        if(think.isEmpty(data)) {
          return this.fail('该手机号不存在');
        }
        if(data.password !== password) {
          return this.fail('密码错误');
        }
        const captcha = await this.cache('captcha');
        if(!captcha || (captcha.toLowerCase() !== imgCaptcha.toLowerCase())) {
          return this.fail('验证码错误');
        } else {
          const token = generateToken(phoneNum);
          // think.config('token', token);
          return this.success(Object.assign(data, { token }))
        }
      }
    } catch (error) {
      return this.fail(error);
    }
  }
};
