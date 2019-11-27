const Base = require('./base.js');
const generateToken = require('../config/token').generateToken
module.exports = class extends Base {
  // 注册
  async postAction() {
    const { phoneNum, password } = this.post();
    const userModel = this.model('user');

    try {
      // 查询是否已有用户
      const originData = await userModel.where({
        phoneNum
      }).find()

      if(think.isEmpty(originData)) {
        const newId = await userModel.add(
          {
            phoneNum,
            password,
          }
        );
        const token = generateToken(phoneNum);
        await this.session('token', token);
        return this.success({
          id: newId,
          token
        })
      } else {
        this.status = 201;
        return this.success();
      }
    } catch (error) {
      return this.fail(error);
    }
  }
};
